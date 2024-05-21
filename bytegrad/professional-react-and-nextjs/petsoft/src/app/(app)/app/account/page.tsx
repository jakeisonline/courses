import ContentBlock from "@/components/contentBlock"
import H1 from "@/components/h1"
import { Content } from "next/font/google"

export default function AccountPage() {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px]">
        <p>Logged in as you.</p>
      </ContentBlock>
    </main>
  )
}
