import AppFooter from "@/components/appFooter"
import AppHeader from "@/components/appHeader"
import BackgroundPattern from "@/components/backgroundPattern"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-6">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  )
}
