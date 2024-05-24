"use client"

import usePetContext from "@/hooks/usePetContext"
import PetImage from "./petImage"
import PetButton from "./petButton"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"

export default function PetDetails() {
  const { selectedPet, handleCheckoutPet } = usePetContext()
  const [isPending, startTransition] = useTransition()

  return (
    <section className="flex h-full w-full flex-col">
      {!selectedPet && <EmptyState />}
      {selectedPet && (
        <>
          <NameBar>
            <PetImage
              alt="Selected pet image"
              height={75}
              width={75}
              src={selectedPet?.imageUrl}
            />
            <PetTitle petName={selectedPet?.name} />
            <div className="ml-auto flex gap-3">
              <PetButton action="edit">Edit</PetButton>
              <PetButton
                action="checkout"
                onClick={async () => {
                  startTransition(async () => {
                    await handleCheckoutPet(selectedPet.id)
                  })
                }}
              >
                {isPending ? "Checking out..." : "Checkout"}
                {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </PetButton>
            </div>
          </NameBar>
          <PetMetaInfoPanel>
            <PetMetaInfoItem
              label="Owner Name"
              value={selectedPet?.ownerName}
            />
            <PetMetaInfoItem label="Pet Age" value={selectedPet?.age} />
          </PetMetaInfoPanel>
          <PetNotes petNote={selectedPet?.notes} />
        </>
      )}
    </section>
  )
}

type NameBarProps = {
  children: React.ReactNode
}

function NameBar({ children }: NameBarProps) {
  return (
    <div className="flex items-center border-b border-light px-8 py-5">
      {children}
    </div>
  )
}

function EmptyState() {
  return (
    <p className="flex h-full items-center justify-center text-2xl font-medium">
      No pet selected
    </p>
  )
}

type PetTitleProps = {
  petName: string | undefined
}

function PetTitle({ petName }: PetTitleProps) {
  return <h2 className="ml-5 text-3xl font-semibold leading-7">{petName}</h2>
}

type PetMetaInfoPanelProps = {
  children: React.ReactNode
}

function PetMetaInfoPanel({ children }: PetMetaInfoPanelProps) {
  return (
    <div className="flex justify-around px-5 py-10 text-center">{children}</div>
  )
}

type PetMetaInfoItemProps = {
  label: string
  value: number | string | undefined
}

function PetMetaInfoItem({ label, value }: PetMetaInfoItemProps) {
  return (
    <div>
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">
        {label}
      </h3>
      <p className="mt-1 text-lg text-zinc-800">{value}</p>
    </div>
  )
}

type PetNotesProps = {
  petNote: string | undefined
}

function PetNotes({ petNote }: PetNotesProps) {
  return (
    <section className="mx-8 mb-9 flex-1 rounded-md border border-light bg-white px-7 py-5">
      {petNote}
    </section>
  )
}
