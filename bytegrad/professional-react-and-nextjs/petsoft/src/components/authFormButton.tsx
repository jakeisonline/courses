"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

type AuthFormButtonProps = {
  actionType: "login" | "signup"
}

export default function AuthFormButton({ actionType }: AuthFormButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="" disabled={pending}>
      {actionType === "login" ? "Log in" : "Sign up"}
      {pending && <Loader2 className="ml-2 mr-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}
