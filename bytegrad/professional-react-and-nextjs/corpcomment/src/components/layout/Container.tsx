import React from "react"

type ContainerProps = {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <main className="container">{children}</main>
}
