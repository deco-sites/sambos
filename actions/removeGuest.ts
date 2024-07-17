import { eq } from "drizzle-orm";
import type { AppContext } from "site/apps/deco/records.ts";
import { guests } from "site/db/schema.ts";

type GuestInsert = typeof guests.$inferInsert;
type GuestsKeys = keyof GuestInsert;
type GuestValue<K extends keyof GuestInsert> = GuestInsert[K];

/**
 * Checa se `key` é uma chave válida do tipo profile.
 */
const isGuestPropKey = (
  key: string,
): key is GuestsKeys => key in guests.$inferInsert;

/**
 * Checa se `value` é do mesmo tipo de guests[key]
 */
const isguestPropType = (
  key: GuestsKeys,
  value: unknown,
): value is GuestValue<typeof key> =>
  typeof value === typeof guests.$inferInsert[key];

interface Props {
  email?: string;
}

export default async function removeGuest(
  { email }: Props,
  _req: Request,
  { invoke }: AppContext,
) {
  // Client do ORM drizzle
  const drizzle = await invoke.records.loaders.drizzle();

  // Se o mode for create e o request possuir body, então cria um guest novo
  if (email) {
    await drizzle.delete(guests).where(eq(guests.email, email));
  }

  // Seleciona todos os perfils do banco de dados, trazendo somenente email e nome.
  const guestsData = await drizzle.select({
    email: guests.email,
    name: guests.name,
  }).from(guests);
  return { guests: guestsData };
}
