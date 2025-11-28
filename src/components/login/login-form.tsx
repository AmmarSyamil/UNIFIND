import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const emailValid = useMemo(() => emailIsValid(email), [email])
  const pwValid = password.length >= 8
  const formValid = emailValid && pwValid

  let API =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.PUBLIC_BACKEND_URL) ||
    "http://localhost:3000"

  if (API.includes("0.0.0.0")) API = API.replace("0.0.0.0", "localhost")

  async function handleLogin(e?: React.MouseEvent) {
    if (e) e.preventDefault()
    if (!formValid) return

    setLoading(true)
    setServerError(null)

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const txt = await res.text()
      let data = null
      try {
        data = JSON.parse(txt)
      } catch {}

      if (!res.ok) {
        const errMsg =
          data?.error || data?.message || txt || "Login failed"
        setServerError(errMsg)
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleLogin()
            }}
          >
            <FieldGroup>
              {serverError && (
                <div className="rounded-md border border-red-400/30 bg-red-50 px-4 py-2 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <Field data-invalid={email.length > 0 && !emailValid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (serverError) setServerError(null)
                  }}
                  aria-invalid={!emailValid}
                />
                {email.length > 0 && !emailValid && (
                  <p className="text-sm text-red-600 mt-1">
                    Invalid email format.
                  </p>
                )}
              </Field>

              <Field data-invalid={password.length > 0 && !pwValid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (serverError) setServerError(null)
                  }}
                  aria-invalid={!pwValid}
                />

                {password.length > 0 && !pwValid && (
                  <p className="text-sm text-red-600 mt-1">
                    Password must be at least 8 characters.
                  </p>
                )}
              </Field>

              <Field>
                <Button
                  type="button"
                  onClick={handleLogin}
                  disabled={!formValid || loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Button variant="outline" type="button">
                  Login with Google
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
