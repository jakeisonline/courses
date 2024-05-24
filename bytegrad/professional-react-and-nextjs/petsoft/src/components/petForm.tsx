"use client"

import usePetContext from "@/hooks/usePetContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { TPet } from "@/lib/types"
import { addPet } from "@/actions/doAddPet"

type PetFormProps = {
  action: "add" | "edit"
  onFormSubmission: () => void
}

export default function PetForm({ action, onFormSubmission }: PetFormProps) {
  const { selectedPet } = usePetContext()
  const editPet: TPet | undefined = action === "edit" ? selectedPet : undefined

  return (
    <form action={addPet} className="flex flex-col space-y-3">
      <div className="space-y-4">
        <FieldWrapper>
          <LabelledInput
            id="name"
            name="name"
            type="text"
            label="Name"
            value={editPet?.name}
            required={true}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="ownerName"
            name="ownerName"
            type="text"
            label="Owner Name"
            value={editPet?.ownerName}
            required={true}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="imageUrl"
            name="imageUrl"
            type="text"
            label="Image URL"
            value={editPet?.imageUrl}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="age"
            name="age"
            type="number"
            label="Age"
            value={editPet?.age.toString()}
            required={true}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledTextarea
            id="notes"
            name="notes"
            label="Notes"
            value={editPet?.notes}
            required={true}
          />
        </FieldWrapper>
      </div>
      <Button type="submit" className="self-end">
        Save
      </Button>
    </form>
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
