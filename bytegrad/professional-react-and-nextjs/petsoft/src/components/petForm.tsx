"use client"

import usePetContext from "@/hooks/usePetContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { TPet } from "@/lib/types"

type PetFormProps = {
  action: "add" | "edit"
  onFormSubmission: () => void
}

export default function PetForm({ action, onFormSubmission }: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext()
  const editPet: TPet | undefined = action === "edit" ? selectedPet : undefined

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPet: Omit<TPet, "id"> = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      age: Number(formData.get("age")),
      notes: formData.get("notes") as string,
    }

    if (action === "edit" && selectedPet) {
      handleEditPet({ id: selectedPet.id, ...newPet })
    } else {
      // @ts-ignore: id is missing, but it will be added in handleAddPet
      handleAddPet(newPet)
    }

    onFormSubmission()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <div className="space-y-4">
        <FieldWrapper>
          <LabelledInput
            id="name"
            name="name"
            type="text"
            label="Name"
            value={editPet?.name}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="ownerName"
            name="ownerName"
            type="text"
            label="Owner Name"
            value={editPet?.ownerName}
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
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledTextarea
            id="notes"
            name="notes"
            label="Notes"
            value={editPet?.notes}
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
}: {
  id: string
  name: string
  type: string
  label: string
  value?: string
}) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} defaultValue={value} required />
    </>
  )
}

function LabelledTextarea({
  id,
  name,
  label,
  value,
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
      <Textarea id={id} name={name} rows={3} defaultValue={value} required />
    </>
  )
}

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>
}
