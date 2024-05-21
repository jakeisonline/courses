"use client"

import usePetContext from "@/hooks/usePetContext"
import Image from "next/image"
import PetImage from "./petImage"

export default function PetDetails() {
  const { selectedPet } = usePetContext()
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
    <div className="border-light flex items-center border-b px-8 py-5">
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
    <section className="border-light mx-8 mb-9 flex-1 rounded-md border bg-white px-7 py-5">
      {petNote}
    </section>
  )
}
