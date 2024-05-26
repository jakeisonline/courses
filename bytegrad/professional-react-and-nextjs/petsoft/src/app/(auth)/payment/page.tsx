import H1 from "@/components/h1"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex flex-col space-y-6">
      <H1>Access to PetSoft requires payment</H1>
      <Button>Buy lifetimes access for $299</Button>
    </main>
  )
}
