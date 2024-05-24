"use client"

import { Button } from "./ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import PetForm from "./petForm"
import { useState } from "react"

type PetButtonProps = {
  action: "add" | "edit" | "checkout"
  onClick?: () => void
  children?: React.ReactNode
}

export default function PetButton({
  action,
  onClick,
  children,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  if (action === "checkout")
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    )

  if (action === "add" || action === "edit") {
    return (
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {action === "add" ? (
            <Button size="icon">
              <PlusIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant="secondary" onClick={onClick}>
              {children}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "add" ? "Add a new pet" : "Edit pet details"}
            </DialogTitle>
          </DialogHeader>
          <PetForm
            action={action}
            onFormSubmission={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    )
  }
}
