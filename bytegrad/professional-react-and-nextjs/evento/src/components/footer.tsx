import Link from "next/link"

export default function Footer() {
  const routes = [
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy", path: "/privacy" },
  ]
  return (
    <footer className="mt-auto flex items-center justify-between h-16 border-t border-white/10 px-3 sm:px-9 text-small text-white/25">
      <small>&copy; 2050 ByteGrad. All rights reserved.</small>
      <ul className="flex gap-x-3 sm:gap-x-8">
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
