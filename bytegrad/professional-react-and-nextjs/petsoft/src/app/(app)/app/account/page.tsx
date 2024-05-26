import ContentBlock from "@/components/contentBlock"
import H1 from "@/components/h1"
import SignOutButton from "@/components/signOutButton"
import { auth } from "@/lib/auth"

export default async function AccountPage() {
  const userSession = await auth()

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-3">
        <p>Logged in as {userSession?.user?.email}</p>
        <SignOutButton>Sign out</SignOutButton>
      </ContentBlock>
    </main>
  )
}
