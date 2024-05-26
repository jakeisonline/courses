"use client"

import doSignOut from "@/actions/doSignOut"
import { Button } from "./ui/button"

type SignOutButtonProps = {
  children: React.ReactNode
}

export default function SignOutButton({ children }: SignOutButtonProps) {
  return <Button onClick={async () => await doSignOut()}>{children}</Button>
}
