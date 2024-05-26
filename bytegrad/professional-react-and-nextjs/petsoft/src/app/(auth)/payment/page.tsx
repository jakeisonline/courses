"use client"

import { createCheckoutSession } from "@/actions/doPayment"
import H1 from "@/components/h1"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: PageProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <main className="flex flex-col space-y-6">
      {!searchParams.success && (
        <>
          <H1>Access to PetSoft requires payment</H1>
          <Button
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
                createCheckoutSession()
              })
            }}
          >
            Buy lifetimes access for $299
            {isPending && (
              <Loader2 className="ml-2 mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </>
      )}

      {searchParams.success && (
        <>
          <H1>😍 Your support means a lot! 😍</H1>
          <Button>Access your new PetSoft account</Button>
        </>
      )}
    </main>
  )
}
