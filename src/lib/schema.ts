import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'

// Create enum for tier types
export const tierEnum = pgEnum('tier', ['free', 'silver', 'gold', 'platinum'])

// Events table schema
export const events = pgTable('events', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    eventDate: timestamp('event_date', { withTimezone: true }).notNull(),
    imageUrl: text('image_url'),
    tier: tierEnum('tier').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// Type inference
export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert
export type UserTier = 'free' | 'silver' | 'gold' | 'platinum' 