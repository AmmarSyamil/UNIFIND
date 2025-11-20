"use client";

import { useState, useEffect } from "react";
import Question from "./question";
import ResultCard from "./result";
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function Main() {
  const TOTAL_ITERS = 10;
  const QUESTIONS_PER_ITER = 8;

  const [currentIter, setCurrentIter] = useState(1);
  const [data, setData] = useState(null); // current iteration form data
  const [cached, setCached] = useState({}); // iter -> data array
  const [resultData, setResultData] = useState(null); // frozen result data or majors list
  const [isResult, setIsResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // fetch questions for current iteration unless cached
    async function loadIterWithRetry(iter) {
      if (cached[iter]) {
        setData(cached[iter]);
        return;
      }

      setLoading(true);
      setErrorMsg(null);

      const maxAttempts = 3;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const res = await fetch(`http://localhost:3000/pre?iter=${iter}`);
          const json = await res.json();

          // If backend returned a structured error, throw to trigger retry
          if (json && json.error) throw new Error(json.message || json.error || "AI error");

          // The backend returns either { questions: [...] } or { text: '...json...' }
          let questions = [];
          if (Array.isArray(json.questions)) {
            questions = json.questions;
          } else if (typeof json.text === "string") {
            try {
              const parsed = JSON.parse(json.text);
              if (Array.isArray(parsed.questions)) questions = parsed.questions;
            } catch (e) {
              console.warn("Could not parse AI text as JSON", e);
            }
          }

          if (!questions || questions.length === 0) {
            throw new Error("No questions returned from AI");
          }

          const list = questions.slice(0, QUESTIONS_PER_ITER).map((q, i) => ({
            title: `Q${(iter - 1) * QUESTIONS_PER_ITER + i + 1}`,
            description: q,
            nilai: 3,
            imageUrl: `https://placekitten.com/20${i}/20${i}`,
          }));

          setCached((c) => {
            const next = { ...c, [iter]: list };
            persistToStorage(next, iter);
            return next;
          });
          setData(list);
          setLoading(false);
          setErrorMsg(null);
          return;
        } catch (err) {
          console.warn(`loadIter attempt ${attempt} failed:`, err.message || err);
          if (attempt === maxAttempts) {
            setErrorMsg(`Failed to load questions. ${err.message || err}`);
            setLoading(false);
            return;
          }
          // exponential backoff before next attempt
          const backoff = Math.min(500 * Math.pow(2, attempt - 1), 5000);
          await new Promise((r) => setTimeout(r, backoff));
          continue;
        }
      }
    }

    loadIterWithRetry(currentIter);
  }, [currentIter]);

  // Load cached progress from localStorage on mount
  useEffect(() => {
    // Detect a reload (including hard refresh) and clear saved progress in that case.
    // Also listen for Ctrl+Shift+R or Ctrl+F5 keypress to clear before the reload happens.
    function clearSaved() {
      try {
        localStorage.removeItem("unifind_survey_v1");
        setCached({});
        setCurrentIter(1);
      } catch (e) {
        console.warn("Failed to clear saved survey", e);
      }
    }

    function onKey(e) {
      // Ctrl+Shift+R or Ctrl+F5
      try {
        if ((e.ctrlKey && e.shiftKey && e.key && e.key.toLowerCase() === "r") || (e.ctrlKey && e.key === "F5")) {
          clearSaved();
        }
      } catch (err) {
        /* ignore */
      }
    }

    // Check navigation type — modern API
    let isReload = false;
    try {
      const nav = performance.getEntriesByType && performance.getEntriesByType("navigation") && performance.getEntriesByType("navigation")[0];
      if (nav && nav.type === "reload") isReload = true;
      // fallback for older browsers
      if (!isReload && performance && performance.navigation && performance.navigation.type === 1) isReload = true;
    } catch (e) {
      /* ignore */
    }

    if (isReload) {
      clearSaved();
      return;
    }

    window.addEventListener("keydown", onKey);
    try {
      const raw = localStorage.getItem("unifind_survey_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.cached) setCached(parsed.cached || {});
        if (parsed?.currentIter) setCurrentIter(parsed.currentIter || 1);
      }
    } catch (e) {
      console.warn("Failed to restore survey from localStorage", e);
    }

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function persistToStorage(nextCached = cached, nextIter = currentIter) {
    try {
      localStorage.setItem(
        "unifind_survey_v1",
        JSON.stringify({ cached: nextCached, currentIter: nextIter })
      );
    } catch (e) {
      console.warn("Failed to persist survey to storage", e);
    }
  }

  const handleResultChange = (index, newValue) => {
    if (!data) return;
    const updated = [...data];
    updated[index].nilai = newValue;
    setData(updated);
    // update cache immediately
    setCached((c) => {
      const next = { ...c, [currentIter]: updated };
      persistToStorage(next, currentIter);
      return next;
    });
  };

  // Move to next iteration (save current), or submit if last
  async function handleNext(event) {
    event?.preventDefault();
    // ensure current data saved in cache (already updated in handleResultChange)

    if (currentIter < TOTAL_ITERS) {
      const next = currentIter + 1;
      setCurrentIter(next);
      persistToStorage(cached, next);
      return;
    }

    // Last iteration: submit all accumulated answers
    // Flatten cached data in order 1..TOTAL_ITERS
    const allData = [];
    for (let i = 1; i <= TOTAL_ITERS; i++) {
      const iterData = cached[i] ? [...cached[i]] : [];
      // if current iter equals i, prefer current `data` state
      if (i === currentIter) {
        iterData.length = 0;
        Array.prototype.push.apply(iterData, data || []);
      }
      allData.push(...iterData);
    }

    const answers = allData.map((d) => d.nilai ?? 0);
    const questions = allData.map((d) => d.description ?? "");

    try {
      setSubmitting(true);
      setErrorMsg(null);
      const r = await fetch("http://localhost:3000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, questions }),
      });

      const text = await r.text();
      let res;
      try {
        res = JSON.parse(text);
      } catch (e) {
        res = { __rawText: text, __status: r.status };
      }

      // Interpret response
      let majors = null;
      if (res && Array.isArray(res.top_majors)) majors = res.top_majors;
      else if (res && res.top_majors && Array.isArray(res.top_majors.top_majors)) majors = res.top_majors.top_majors;
      else if (Array.isArray(res)) majors = res;
      else if (res && typeof res.text === "string") {
        try {
          const parsed = JSON.parse(res.text);
          if (Array.isArray(parsed.top_majors)) majors = parsed.top_majors;
        } catch (e) {}
      }

      if (majors && majors.length) {
        const list = majors.map((m, i) => ({
          title: m.major ?? `Major ${i + 1}`,
          description: m.reason ?? (typeof m === "string" ? m : ""),
          imageUrl: `https://placekitten.com/20${i}/20${i}`,
        }));
        setResultData(list);
        setIsResult(true);
        // clear saved progress
        try { localStorage.removeItem("unifind_survey_v1"); } catch (e) {}
      } else if (res && res.__rawText) {
        setResultData([{ title: "Server response", description: res.__rawText, imageUrl: `https://placekitten.com/200/200` }]);
        setIsResult(true);
      } else {
        setResultData(allData);
        setIsResult(true);
      }
    } catch (err) {
      console.error("Failed to submit answers:", err);
      setErrorMsg(String(err?.message ?? err));
    } finally {
      setSubmitting(false);
    }
  }

  function handlePrev() {
    if (currentIter > 1) setCurrentIter((c) => c - 1);
  }

  function handleBack() {
    setIsResult(false);
  }

  // Helpers: counts and completion checks
  function answeredCountForIter(iter) {
    const arr = iter === currentIter ? data || [] : cached[iter] || [];
    return arr.filter((d) => typeof d.nilai === "number").length;
  }

  function isIterComplete(iter) {
    const arr = iter === currentIter ? data || [] : cached[iter] || [];
    if (!arr || arr.length === 0) return false;
    return arr.every((d) => typeof d.nilai === "number" && d.nilai >= 0 && d.nilai <= 5);
  }

  function totalAnswered() {
    let total = 0;
    for (let i = 1; i <= TOTAL_ITERS; i++) {
      total += answeredCountForIter(i);
    }
    return total;
  }

  const currentAnswered = answeredCountForIter(currentIter);
  const currentComplete = isIterComplete(currentIter);
  const overallComplete = (() => {
    for (let i = 1; i <= TOTAL_ITERS; i++) {
      if (!isIterComplete(i)) return false;
    }
    return true;
  })();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-3xl border border-muted rounded-2xl p-8 shadow-lg bg-card">
        {!isResult ? (
          // ------------------- FORM VIEW -------------------
          <form onSubmit={(e) => e.preventDefault()}>
            <FieldSet className="space-y-8">
              <div className="text-center">
                <FieldLegend className="text-2xl font-semibold mb-2">
                  Survey Form
                </FieldLegend>
                <FieldDescription className="text-muted-foreground">
                  Silakan isi penilaian anda di bawah ini.
                </FieldDescription>
                <div className="text-sm text-muted-foreground mt-2">Iteration {currentIter} / {TOTAL_ITERS} — Answered {currentAnswered}/{QUESTIONS_PER_ITER}</div>
                <div className="w-full bg-muted h-2 rounded overflow-hidden mt-2">
                  <div
                    className="bg-primary h-2"
                    style={{ width: `${Math.round((totalAnswered() / (TOTAL_ITERS * QUESTIONS_PER_ITER)) * 100)}%` }}
                  />
                </div>
                {errorMsg && (
                  <div className="text-sm text-destructive mt-2">
                    {errorMsg}
                    <div className="mt-2">
                      <Button variant="ghost" onClick={() => { setErrorMsg(null); setLoading(true); /* retry */ setCurrentIter((c) => c); }}>
                        Retry
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <FieldGroup className="space-y-6">
                {loading ? (
                  <p className="text-center text-muted-foreground py-8">Memuat pertanyaan...</p>
                ) : data ? (
                  data.map((item, index) => (
                    <Question
                      key={index}
                      title={item.title}
                      description={item.description}
                      nilai={item.nilai}
                      onResultChange={(value) => handleResultChange(index, value)}
                    />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">Memuat pertanyaan...</p>
                )}
              </FieldGroup>

              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={handlePrev} disabled={currentIter === 1 || loading || submitting} className="flex-1">
                  Previous
                </Button>

                {currentIter < TOTAL_ITERS ? (
                  <Button variant="default" onClick={handleNext} className="flex-1" disabled={!currentComplete || loading || submitting}>
                    Next
                  </Button>
                ) : (
                  <div className="flex-1">
                    <Button variant="outline" onClick={handleNext} className="w-full" disabled={!currentComplete || loading || submitting}>
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                    {!overallComplete && (
                      <div className="text-xs text-muted-foreground mt-2">You haven't completed all iterations. Submitting will send the answers you've provided so far.</div>
                    )}
                  </div>
                )}
              </div>
            </FieldSet>
          </form>
        ) : (
          // ------------------- RESULT VIEW -------------------
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">Hasil Survey</h2>
              <p className="text-muted-foreground">Berikut adalah hasil yang telah Anda isi.</p>
            </div>

            {resultData?.map((item, index) => (
              <ResultCard
                key={index}
                imageUrl={item.imageUrl}
                title={item.title}
                description={`Nilai: ${item.nilai ?? ""} — ${item.description}`}
                onClick={() => console.log("Clicked:", item.title)}
              />
            ))}

            <div className="text-center pt-4">
              <Button variant="outline" onClick={handleBack} className="w-full py-5 text-base font-medium">
                Kembali ke Form
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
