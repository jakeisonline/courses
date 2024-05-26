"use client"

import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import doAuth from "@/actions/doAuth"
import doRegister from "@/actions/doRegister"

type AuthFormProps = {
  actionType: "login" | "signup"
}

export default function AuthForm({ actionType }: AuthFormProps) {
  return (
    <div className="mt-4">
      <form
        action={actionType === "login" ? doAuth : doRegister}
        className="flex flex-col gap-y-5"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <Button type="submit" className="">
          {actionType === "login" ? "Log in" : "Sign up"}
        </Button>
      </form>
    </div>
  )
}
