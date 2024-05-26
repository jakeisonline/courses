"use server"

import { getUserSession } from "@/lib/serverUtils"
import { redirect } from "next/navigation"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function createCheckoutSession() {
  const userSession = await getUserSession()
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: userSession.user.email,
    line_items: [
      {
        price: "price_1PKlDsP5Sz3rt1LfWxCwUSy9",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment/?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment/?cancelled=true`,
  })

  redirect(checkoutSession.url)
}
