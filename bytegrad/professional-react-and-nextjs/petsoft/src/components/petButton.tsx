import { Button } from "./ui/button"
import { PlusIcon } from "@radix-ui/react-icons"

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
  if (action === "add")
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    )
  if (action === "edit" || action === "checkout")
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    )
  return <Button>Adopt</Button>
}
