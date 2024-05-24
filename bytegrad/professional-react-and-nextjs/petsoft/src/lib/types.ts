export type TPet = {
  id: string
  name: string
  ownerName: string
  imageUrl: string
  age: number
  notes: string
  updatedAt?: Date
  createdAt?: Date
}

export type TErrorMutatePet = {
  message: string
}

export type TPromisePet = {
  error: TErrorMutatePet | undefined
  response: TPet | undefined
}
