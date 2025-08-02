-- Create the events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT,
    tier TEXT NOT NULL CHECK (tier IN ('free', 'silver', 'gold', 'platinum')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_events_tier ON events(tier);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create RLS policy (optional - for additional security)
-- This policy allows all authenticated users to read events
CREATE POLICY "Allow authenticated users to read events" ON events
    FOR SELECT USING (auth.role() = 'authenticated');

-- Seed the table with sample events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
-- Free tier events
(
    'Community Meetup',
    'Join us for a casual community meetup where you can network with fellow enthusiasts and share your experiences.',
    '2024-02-15 18:00:00+00',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    'free'
),
(
    'Introduction to Web Development',
    'Learn the basics of web development in this beginner-friendly workshop. No prior experience required!',
    '2024-02-20 14:00:00+00',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    'free'
),

-- Silver tier events
(
    'Advanced JavaScript Workshop',
    'Deep dive into modern JavaScript features including ES6+, async/await, and functional programming concepts.',
    '2024-02-25 10:00:00+00',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    'silver'
),
(
    'UI/UX Design Principles',
    'Master the fundamentals of user interface and user experience design with hands-on exercises and real-world examples.',
    '2024-03-01 15:00:00+00',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    'silver'
),

-- Gold tier events
(
    'Full-Stack Development Bootcamp',
    'Intensive 3-day bootcamp covering frontend, backend, and database development with modern technologies.',
    '2024-03-10 09:00:00+00',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    'gold'
),
(
    'Cloud Architecture Summit',
    'Learn about cloud-native architecture, microservices, and deployment strategies from industry experts.',
    '2024-03-15 11:00:00+00',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    'gold'
),

-- Platinum tier events
(
    'Executive Technology Leadership Forum',
    'Exclusive event for technology leaders to discuss industry trends, innovation strategies, and future technologies.',
    '2024-03-20 08:00:00+00',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    'platinum'
),
(
    'VIP Innovation Workshop',
    'Private workshop with industry pioneers focusing on cutting-edge technologies and breakthrough innovations.',
    '2024-03-25 13:00:00+00',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    'platinum'
); 