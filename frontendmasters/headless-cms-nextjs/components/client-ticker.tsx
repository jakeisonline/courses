import { getClientTicker } from "@/content/queries";
import Clients from "./clients";

export default async function ClientTicker() {
  const data = await getClientTicker()
  return <Clients content={data.assetCollection.items} />
}
