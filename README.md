# Tier Event Showcase

A responsive and elegant web application that allows logged-in users to view a list of show events based on their user tier (Free, Silver, Gold, Platinum). Users can only see events available to their tier or any lower tier.

## 🚀 Features

- **Authentication**: Secure login and signup with Clerk.dev
- **Tier-Based Access**: Events filtered by user membership tier
- **Real-time Updates**: Instant tier upgrades and event access
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Loading States**: Smooth user experience with loading indicators
- **Error Handling**: Comprehensive error handling and user feedback
- **Type Safety**: Full TypeScript support with Drizzle ORM

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL) with Drizzle ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn
- A Clerk.dev account
- A Supabase account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tier-event-showcase
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Set Up Clerk.dev

1. Go to [Clerk.dev](https://clerk.dev) and create an account
2. Create a new application
3. Copy your publishable key and secret key
4. Add them to your `.env.local` file

### 5. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings > API to get your URL and keys
4. Add them to your `.env.local` file

### 6. Database Setup with Drizzle

#### Option A: Using Drizzle Kit (Recommended)

1. Generate and push the schema:

```bash
npm run db:generate
npm run db:push
```

2. Seed the database with sample data:

```bash
npm run db:seed
```

#### Option B: Manual SQL Setup

1. Run the SQL script in Supabase SQL Editor (use `supabase-setup.sql`)

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema (Drizzle ORM)

The application uses Drizzle ORM for type-safe database operations:

```typescript
// src/lib/schema.ts
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date", { withTimezone: true }).notNull(),
  imageUrl: text("image_url"),
  tier: tierEnum("tier").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
```

## 🎯 User Tiers

- **Free**: Access to basic community events
- **Silver**: Enhanced events and early access
- **Gold**: Premium events and exclusive content
- **Platinum**: VIP access to all events

## 🔐 Authentication Flow

1. Users sign up/sign in using Clerk.dev
2. User tier is stored in Clerk metadata
3. Events are filtered based on user tier using Drizzle ORM
4. Users can upgrade their tier using the upgrade button

## 🎨 UI Components

- **EventCard**: Displays individual events with tier-based access control
- **LoadingSpinner**: Shows loading states during data fetching
- **TierUpgradeButton**: Allows users to upgrade their membership tier

## 🗄️ Database Operations

### Using Drizzle ORM

```typescript
// Fetch events for a specific tier
const result = await db
  .select()
  .from(events)
  .where(inArray(events.tier, availableTiers))
  .orderBy(asc(events.eventDate));

// Insert new event
await db.insert(events).values({
  title: "New Event",
  description: "Event description",
  eventDate: new Date(),
  tier: "free",
});
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Development

### Project Structure

```
src/
├── app/
│   ├── events/
│   │   └── page.tsx          # Protected events page
│   ├── test/
│   │   └── page.tsx          # Database test page
│   ├── api/events/
│   │   └── route.ts          # API endpoint
│   ├── layout.tsx            # Root layout with Clerk provider
│   └── page.tsx              # Landing page
├── components/
│   ├── EventCard.tsx         # Event display component
│   ├── LoadingSpinner.tsx    # Loading indicator
│   └── TierUpgradeButton.tsx # Tier upgrade functionality
└── lib/
    ├── db.ts                 # Drizzle database client
    ├── schema.ts             # Database schema
    └── seed.ts               # Database seeding
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with sample data

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**

   - Ensure `.env.local` is in the root directory
   - Restart the development server after adding variables

2. **Clerk Authentication Issues**

   - Verify your Clerk keys are correct
   - Check that your Clerk application is properly configured

3. **Database Connection Issues**

   - Verify your Supabase URL and keys
   - Ensure the database schema is created using Drizzle or SQL script
   - Run `npm run db:seed` to populate sample data

4. **TypeScript Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that all import paths are correct

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Clerk.dev](https://clerk.dev) for authentication
- [Supabase](https://supabase.com) for database
- [Drizzle ORM](https://orm.drizzle.team) for type-safe database operations
- [Next.js](https://nextjs.org) for the framework
- [Tailwind CSS](https://tailwindcss.com) for styling
