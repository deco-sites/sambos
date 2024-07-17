import type { AppContext } from "site/apps/deco/records.ts";
import { guests } from "site/db/schema.ts";

export default async function loadGuests(
  _: any,
  _req: Request,
  { invoke }: AppContext,
) {
  // Client do ORM drizzle
  const drizzle = await invoke.records.loaders.drizzle();

  // Seleciona todos os perfils do banco de dados, trazendo somenente email e nome.
  const guestsData = await drizzle.select({
    email: guests.email,
    name: guests.name,
  }).from(guests);

  return { guests: guestsData };
}
