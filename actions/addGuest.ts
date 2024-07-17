import { guests } from "site/db/schema.ts";
import type { AppContext } from "site/apps/deco/records.ts";

type GuestsInsert = typeof guests.$inferInsert;

const validGuestKeys = ["name", "email", "attending", "extra", "id"] as const;

const isGuestPropKey = (key: string): key is keyof GuestsInsert => {
  return validGuestKeys.includes(key as keyof GuestsInsert);
};

const isGuestPropType = (key: string, value: any): boolean => {
  if (
    key === "name" || key === "email" || key === "attending" ||
    key === "extra"
  ) {
    return typeof value === "string";
  }
  return false;
};

export default async function addGuest(
  props: { [key: string]: any },
  _req: Request,
  { invoke }: AppContext,
) {
  // Client do ORM drizzle
  const drizzle = await invoke.records.loaders.drizzle();

  console.log("addGuest", { props });

  const newGuest: Partial<typeof guests.$inferInsert> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (isGuestPropKey(key) && isGuestPropType(key, value)) {
      newGuest[key as keyof GuestsInsert] = value as any;
    }
  });

  console.log("newGuest", { newGuest });

  if (!newGuest.name) {
    throw new Error("Name is required");
  }

  await drizzle.insert(guests).values(newGuest as GuestsInsert);

  const guestsData = await drizzle.select({
    email: guests.email,
    name: guests.name,
  }).from(guests);

  return { guests: guestsData };
}
