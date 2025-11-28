import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useMemo, useState } from "react"
import API from "../api/main"

function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function passwordStrength(password: string) {
  let score = 0
  if (password.length >= 8) score++
  if (/[0-9]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 1) return { label: "Weak", value: 33 }
  if (score <= 3) return { label: "Medium", value: 66 }
  return { label: "Strong", value: 100 }
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const emailValid = useMemo(() => emailIsValid(email), [email])
  const pwStrength = useMemo(() => passwordStrength(password), [password])
  const pwMin = password.length >= 8
  const passwordsMatch = password === confirm && confirm.length > 0
  const nameValid = name.trim().length > 0
  const formValid = nameValid && emailValid && pwMin && passwordsMatch

  useEffect(() => {
    if (serverError) setServerError(null)
  }, [name, email, password, confirm])

  async function handleSubmit(e: React.FormEvent) {
    console.log("Loaded API:", `${API}/auth/signup`)
    e.preventDefault()
    if (!formValid) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      })
      const txt = await res.text()
      let data = null
      try {
        data = JSON.parse(txt)
      } catch {}
      if (!res.ok) {
        setServerError(data?.error || data?.message || txt || "Signup failed.")
        setLoading(false)
        return
      }
      try {
        localStorage.setItem("sessionUser", JSON.stringify(data.user))
      } catch {}
      location.replace("/")
    } catch (err: any) {
      setServerError(err?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="text-muted-foreground text-sm">Fill the form to continue</p>
        </div>

        {serverError && (
          <div className="rounded-md border border-red-400/30 bg-red-50 px-4 py-2 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <Field data-invalid={!nameValid}>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!nameValid}
            aria-describedby="name-error"
          />
          {!nameValid && (
            <p id="name-error" className="text-sm text-red-600 mt-1">
              Please enter your name.
            </p>
          )}
        </Field>

        <Field data-invalid={email.length > 0 && !emailValid}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={email.length > 0 && !emailValid}
            aria-describedby="email-error"
          />
          <FieldDescription>We&apos;ll use this only for your account.</FieldDescription>
          {email.length > 0 && !emailValid && (
            <p id="email-error" className="text-sm text-red-600 mt-1">
              Invalid email format.
            </p>
          )}
        </Field>

        <Field data-invalid={password.length > 0 && !pwMin}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={password.length > 0 && !pwMin}
            aria-describedby="password-desc"
          />
          <div className="mt-2 flex items-center gap-3">
            <div className="w-full">
              <div className="h-2 w-full rounded bg-muted/40">
                <div
                  role="presentation"
                  style={{ width: `${pwStrength.value}%` }}
                  className={cn(
                    "h-2 rounded",
                    pwStrength.value < 50
                      ? "bg-red-500"
                      : pwStrength.value < 100
                      ? "bg-amber-500"
                      : "bg-green-600"
                  )}
                />
              </div>
              <div id="password-desc" className="mt-1 text-xs">
                <span className="font-medium">{pwStrength.label}</span>
                <span className="ml-2 text-muted-foreground">• min 8 chars</span>
              </div>
            </div>
            <div className="text-sm w-20 text-right">
              {password.length === 0
                ? null
                : pwMin
                ? <span className="text-green-600">OK</span>
                : <span className="text-red-600">Too short</span>}
            </div>
          </div>
          {password.length > 0 && !pwMin && (
            <p className="text-sm text-red-600 mt-1">Password must be at least 8 characters.</p>
          )}
        </Field>

        <Field data-invalid={confirm.length > 0 && !passwordsMatch}>
          <FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
          <Input
            id="confirm"
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={confirm.length > 0 && !passwordsMatch}
            aria-describedby="confirm-error"
          />
          {confirm.length > 0 && !passwordsMatch && (
            <p id="confirm-error" className="text-sm text-red-600 mt-1">
              Passwords do not match.
            </p>
          )}
          {confirm.length > 0 && passwordsMatch && (
            <p id="confirm-error" className="text-sm text-green-600 mt-1">
              Passwords match.
            </p>
          )}
        </Field>

        <Field>
          <Button type="submit" disabled={!formValid || loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </Field>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="underline">Sign in</a>
        </p>
      </FieldGroup>
    </form>
  )
}
