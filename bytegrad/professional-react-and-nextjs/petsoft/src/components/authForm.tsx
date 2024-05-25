"use client"

import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function AuthForm() {
  return (
    <div className="mt-4">
      <form className="flex flex-col gap-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" className="">
          Go!
        </Button>
      </form>
    </div>
  )
}
