import { InferModel } from 'drizzle-orm';
import { int, mysqlEnum, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';
 
// declaring enum in database
export const countries = mysqlTable('countries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
}, (countries) => ({
  nameIndex: uniqueIndex('name_idx').on(countries.name),
}));
type Country = InferModel<typeof countries, "select">;
type NewCountry = InferModel<typeof countries, "insert">;
 
// export const cities = mysqlTable('cities', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 256 }),
//   countryId: int('country_id').references(() => countries.id),
//   popularity: mysqlEnum('popularity', ['unknown', 'known', 'popular']),
// });