"use client"

import usePetContext from "@/hooks/usePetContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { TPet } from "@/lib/types"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { petFormSchema } from "@/lib/validations"

type PetFormProps = {
  actionType: "add" | "edit"
  onFormSubmission: () => void
}

type InputFieldProps = {
  id: string
  validation: any // todo: type this
  name: string
  label: string
  errors?: any
}

type TextareaFieldProps = Omit<InputFieldProps, "type">

type TPetForm = z.infer<typeof petFormSchema>

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext()

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: selectedPet,
  })

  const currentPet: TPet | undefined =
    actionType === "edit" ? selectedPet : undefined

  return (
    <form
      action={async () => {
        const result = await trigger()
        if (!result) {
          return
        }

        onFormSubmission()

        const petData = getValues()

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
            validation={{
              ...register("name"),
            }}
            name="name"
            label="Name"
            errors={errors}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="ownerName"
            validation={{
              ...register("ownerName"),
            }}
            name="ownerName"
            label="Owner Name"
            errors={errors}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="imageUrl"
            validation={{
              ...register("imageUrl"),
            }}
            name="imageUrl"
            label="Image URL"
            errors={errors}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledInput
            id="age"
            validation={{
              ...register("age"),
            }}
            name="age"
            label="Age"
            errors={errors}
          />
        </FieldWrapper>
        <FieldWrapper>
          <LabelledTextarea
            id="notes"
            validation={{
              ...register("notes"),
            }}
            name="notes"
            label="Notes"
            errors={errors}
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
  validation,
  name,
  label,
  errors,
}: InputFieldProps) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...validation} />
      {errors[name] && <FieldErrors>{errors[name].message}</FieldErrors>}
    </>
  )
}

function LabelledTextarea({
  id,
  validation,
  name,
  label,
  errors,
}: TextareaFieldProps) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={name} {...validation} rows={3} />
      {errors[name] && <FieldErrors>{errors[name].message}</FieldErrors>}
    </>
  )
}

function FieldErrors({ children }: { children: React.ReactNode }) {
  return <p className="text-red-500">{children}</p>
}

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>
}
