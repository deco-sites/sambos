import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guests = sqliteTable("guests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  attending: text("attending"),
  // extra guests someone could be rsvp'ing for. It will be an array of names.
  extra: text("extra"),
  isExtra: integer("isExtra").default(0), // Usa um inteiro para representar booleano (0 = false, 1 = true)
  confirmerEmail: text("confirmerEmail"), // Armazena o email de quem confirmou o extra
});
