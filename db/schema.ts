import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guests = sqliteTable("guests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  attending: text("attending"),
  // extra guests someone could be rsvp'ing for. It will be an array of names.
  extra: text("extra"),
});
