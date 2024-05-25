import AuthForm from "@/components/authForm"
import H1 from "@/components/h1"

export default function LoginPage() {
  return (
    <main>
      <H1 className="text-center">Sign Up</H1>
      <AuthForm action="signup" />

      <p className="mt-4 text-zinc-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Log in
        </a>
      </p>
    </main>
  )
}
