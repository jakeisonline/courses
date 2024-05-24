"use client"

import usePetContext from "@/hooks/usePetContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { TPet } from "@/lib/types"
import { addPet } from "@/actions/doAddPet"
import { editPet } from "@/actions/doEditPet"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

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
        if (actionType === "add") {
          await handleAddPet(formData)
          onFormSubmission()
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet?.id, formData)
          onFormSubmission()
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
      <SubmitButton label="Save" pendingLabel="Saving..." />
    </form>
  )
}

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string
  pendingLabel?: string
}) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="self-end" disabled={pending}>
      {pending ? pendingLabel : label}
      {pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
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
