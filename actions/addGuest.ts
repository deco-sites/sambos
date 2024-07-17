import { guests } from "site/db/schema.ts";
import type { AppContext } from "site/apps/deco/records.ts";

type GuestsInsert = typeof guests.$inferInsert;

const validGuestKeys = [
  "name",
  "email",
  "attending",
  "extra",
  "id",
  "isExtra",
  "confirmerEmail",
] as const;

const isGuestPropKey = (key: string): key is keyof GuestsInsert => {
  return validGuestKeys.includes(key as keyof GuestsInsert);
};

const isGuestPropType = (key: string, value: any): boolean => {
  if (key === "extra") {
    return Array.isArray(value) &&
      value.every((item) => typeof item === "string");
  } else if (
    key === "name" || key === "email" || key === "attending"
  ) {
    return typeof value === "string";
  }
  return false;
};

interface Props {
  name: string;
  email: string;
  attending: string;
  extra?: string[];
}

export default async function addGuest(
  props: Props,
  _req: Request,
  { invoke }: AppContext,
) {
  // Client do ORM drizzle
  const drizzle = await invoke.records.loaders.drizzle();

  console.log("addGuest", { props });

  const newGuest: Partial<typeof guests.$inferInsert> = {};

  Object.entries(props).forEach(([key, value]) => {
    console.log(
      { key, value },
      isGuestPropKey(key),
      isGuestPropType(key, value),
    );
    if (isGuestPropKey(key) && isGuestPropType(key, value)) {
      console.log("entraou aqui?", key, value, Array.isArray(value));
      if (key === "extra" && Array.isArray(value)) {
        newGuest.extra = JSON.stringify(value);
      } else {
        newGuest[key as keyof GuestsInsert] = value as any;
      }
    }
  });

  console.log("newGuest", { newGuest });

  if (!newGuest.name) {
    throw new Error("Name is required");
  }

  if (!newGuest.email) {
    throw new Error("Email is required");
  }

  if (!newGuest.attending) {
    throw new Error("Attending is required");
  }

  // Adiciona o convidado principal
  await drizzle.insert(guests).values({
    ...newGuest,
    isExtra: 0, // Convidado principal
  } as GuestsInsert);

  // Adiciona convidados extras
  if (props.extra && Array.isArray(props.extra)) {
    for (const extra of props.extra) {
      if (typeof extra === "string" && extra.trim()) {
        await drizzle.insert(guests).values({
          name: extra,
          confirmerEmail: props.email,
          attending: newGuest.attending,
          isExtra: 1, // Marca como convidado extra
        });
      }
    }
  }

  const guestsData = await drizzle.select({
    email: guests.email,
    name: guests.name,
  }).from(guests);

  return { guests: guestsData };
}
