import AppFooter from "@/components/appFooter"
import AppHeader from "@/components/appHeader"
import BackgroundPattern from "@/components/backgroundPattern"
import PetContextProvider from "@/contexts/petContextProvider"
import SearchContextProvider from "@/contexts/searchContextProvider"
import { TPet } from "@/lib/types"
import prisma from "@/lib/db"

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  // const response = await fetch(
  //   "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
  // )
  // if (!response.ok) {
  //   throw new Error("Failed to fetch pets")
  // }

  // const pets: TPet[] = await response.json()

  const pets: TPet[] = await prisma.pet.findMany()

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
    </>
  )
}
