"use client"

import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import doAuth from "@/actions/doAuth"
import doRegister from "@/actions/doRegister"
import AuthFormButton from "./authFormButton"
import { useFormState } from "react-dom"

type AuthFormProps = {
  actionType: "login" | "signup"
}

export default function AuthForm({ actionType }: AuthFormProps) {
  const [registerError, dispatchRegister] = useFormState(doRegister, undefined)
  const [authError, dispatchAuth] = useFormState(doAuth, undefined)

  return (
    <div className="mt-4">
      <form
        action={actionType === "login" ? dispatchAuth : dispatchRegister}
        className="flex flex-col gap-y-5"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <AuthFormButton actionType={actionType} />

        {registerError && (
          <p className="mt-4 text-sm text-red-500">{registerError.message}</p>
        )}

        {authError && (
          <p className="mt-4 text-sm text-red-500">{authError.message}</p>
        )}
      </form>
    </div>
  )
}
