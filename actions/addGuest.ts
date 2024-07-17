import { guests } from "site/db/schema.ts";
import type { AppContext } from "site/apps/deco/records.ts";

type GuestInsert = typeof guests.$inferInsert;
type GuestsKeys = keyof GuestInsert;
type GuestValue<K extends keyof GuestInsert> = GuestInsert[K];

/**
 * Checa se `key` é uma chave válida do tipo guest.
 */
const isGuestPropKey = (key: string): key is keyof GuestInsert => {
    return key in ({} as GuestInsert);
};

/**
 * Checa se `value` é do mesmo tipo de guests[key]
 */
const isGuestPropType = <K extends GuestsKeys>(
    key: K,
    value: unknown,
): value is GuestValue<K> => {
    const expectedType = typeof guests.$inferInsert[key];
    return typeof value === expectedType || value === null ||
        value === undefined;
};

interface Props {
    email?: string;
    name?: string;
    attending?: string;
    extra?: string;
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

    // Mapear props diretamente para newGuest
    Object.entries(props).forEach(([key, value]) => {
        if (isGuestPropKey(key) && isGuestPropType(key, value)) {
            newGuest[key] = value as any;
        }
    });

    // Insere newGuest no banco de dados
    await drizzle.insert(guests).values(newGuest as typeof guests.$inferInsert);

    const guestsData = await drizzle.select({
        email: guests.email,
        name: guests.name,
    }).from(guests);

    return { guests: guestsData };
}
