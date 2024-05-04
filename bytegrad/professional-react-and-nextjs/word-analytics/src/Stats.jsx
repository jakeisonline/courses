export default function Stats({ stats }) {
  return (
    <section className="stats">
      <Stat number={stats.words} label="Words" />
      <Stat number={stats.characters} label="Characters" />
      <Stat number={stats.instagram} label="Instagram" />
      <Stat number={stats.facebook} label="Facebook" />
    </section>
  )
}

function Stat({ number = 0, label }) {
  return (
    <section className="stat">
      <span
        className={`stat__number ${number < 0 ? "stat__number--limit" : ""}`}
      >
        {number}
      </span>
      <h2 className="second-heading">{label}</h2>
    </section>
  )
}
