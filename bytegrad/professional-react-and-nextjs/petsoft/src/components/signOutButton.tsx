"use client"

import doSignOut from "@/actions/doSignOut"
import { Button } from "./ui/button"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"

type SignOutButtonProps = {
  children: React.ReactNode
}

export default function SignOutButton({ children }: SignOutButtonProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      disabled={isPending}
      onClick={async () =>
        await startTransition(async () => {
          doSignOut()
        })
      }
    >
      {children}
      {isPending && <Loader2 className="ml-2 mr-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}
