import Image from "next/image"
import PetPlaceholderImage from "@/public/pet-placeholder.png"

export default function PetList() {
  return (
    <ul className="border-b border-black/10 bg-white">
      <li className="py-4">
        <button className="flex h-[70px] w-full cursor-pointer items-center gap-4 px-5 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]">
          <Image
            src={PetPlaceholderImage}
            alt="Placeholder image of Benjamin"
            className="rounded-full object-cover"
          />
          <p className="font-semibold">Benjamin</p>
        </button>
      </li>
    </ul>
  )
}
