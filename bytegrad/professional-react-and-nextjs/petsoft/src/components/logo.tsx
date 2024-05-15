import Image from "next/image"
import LogoImage from "@/public/logo.svg"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/">
      <Image src={LogoImage} alt="PetSoft Logo" />
    </Link>
  )
}
