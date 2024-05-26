import AppFooter from "@/components/appFooter"
import AppHeader from "@/components/appHeader"
import BackgroundPattern from "@/components/backgroundPattern"
import PetContextProvider from "@/contexts/petContextProvider"
import SearchContextProvider from "@/contexts/searchContextProvider"
import { TPet } from "@/lib/types"
import prisma from "@/lib/db"
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/lib/auth"
import { getPetsByUserId } from "@/lib/serverUtils"

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const userSession = await auth()
  const pets = await getPetsByUserId(userSession.user.id)

  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-6">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  )
}
