"use client"

import usePetContext from "@/hooks/usePetContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { TMutatingPet, TPet } from "@/lib/types"
import React from "react"

type PetFormProps = {
  actionType: "add" | "edit"
  onFormSubmission: () => void
}

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext()
  const currentPet: TPet | undefined =
    actionType === "edit" ? selectedPet : undefined

  return (
    <form
      action={async (formData) => {
        onFormSubmission()
        const petData: TMutatingPet = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl: formData.get("imageUrl") as string,
          age: Number(formData.get("age")) as number,
          notes: formData.get("notes") as string,
        }

        if (actionType === "add") {
          await handleAddPet(petData)
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData)
        }
      }}
      className="flex flex-col space-y-3"
    >
      <div className="space-y-4">
        <FieldWrapper>
          <LabelledInput
            id="name"
            name="name"
            type="text"
            label="Name"
            value={currentPet?.name}
            required={true}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="ownerName"
            name="ownerName"
            type="text"
            label="Owner Name"
            value={currentPet?.ownerName}
            required={true}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="imageUrl"
            name="imageUrl"
            type="text"
            label="Image URL"
            value={currentPet?.imageUrl}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="age"
            name="age"
            type="number"
            label="Age"
            value={currentPet?.age.toString()}
            required={true}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledTextarea
            id="notes"
            name="notes"
            label="Notes"
            value={currentPet?.notes}
            required={true}
          />
        </FieldWrapper>
      </div>
      <SubmitButton>Save</SubmitButton>
    </form>
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <Button type="submit" className="self-end">
      {children}
    </Button>
  )
}

function LabelledInput({
  id,
  name,
  type,
  label,
  value,
  required = false,
}: {
  id: string
  name: string
  type: string
  label: string
  value?: string
  required?: boolean
}) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        required={required ? true : false}
      />
    </>
  )
}

function LabelledTextarea({
  id,
  name,
  label,
  value,
  required = false,
}: {
  id: string
  name: string
  label: string
  value?: string
  required?: boolean
}) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={name}
        rows={3}
        defaultValue={value}
        required={required ? true : false}
      />
    </>
  )
}

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>
}
