import AuthForm from "@/components/authForm"
import H1 from "@/components/h1"

export default function LoginPage() {
  return (
    <main>
      <H1 className="text-center">Login</H1>
      <AuthForm />

      <p className="mt-4 text-zinc-500">
        No account yet?{" "}
        <a href="/signup" className="text-blue-500">
          Sign up
        </a>
      </p>
    </main>
  )
}
