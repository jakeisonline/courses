export default function Title({ locked }) {
  return (
    <h1 className="title">
      {!locked ? "Fancy Counter" : "You're at the limit"}
    </h1>
  )
}
