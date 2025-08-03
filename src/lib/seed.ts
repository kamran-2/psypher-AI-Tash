import { supabase } from './db'

const sampleEvents = [
    // Free tier events
    {
        title: 'Community Meetup',
        description: 'Join us for a casual community meetup where you can network with fellow enthusiasts and share your experiences.',
        event_date: '2024-02-15T18:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
        tier: 'free' as const,
    },
    {
        title: 'Introduction to Web Development',
        description: 'Learn the basics of web development in this beginner-friendly workshop. No prior experience required!',
        event_date: '2024-02-20T14:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
        tier: 'free' as const,
    },

    // Silver tier events
    {
        title: 'Advanced JavaScript Workshop',
        description: 'Deep dive into modern JavaScript features including ES6+, async/await, and functional programming concepts.',
        event_date: '2024-02-25T10:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
        tier: 'silver' as const,
    },
    {
        title: 'UI/UX Design Principles',
        description: 'Master the fundamentals of user interface and user experience design with hands-on exercises and real-world examples.',
        event_date: '2024-03-01T15:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        tier: 'silver' as const,
    },

    // Gold tier events
    {
        title: 'Full-Stack Development Bootcamp',
        description: 'Intensive 3-day bootcamp covering frontend, backend, and database development with modern technologies.',
        event_date: '2024-03-10T09:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
        tier: 'gold' as const,
    },
    {
        title: 'Cloud Architecture Summit',
        description: 'Learn about cloud-native architecture, microservices, and deployment strategies from industry experts.',
        event_date: '2024-03-15T11:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        tier: 'gold' as const,
    },

    // Platinum tier events
    {
        title: 'Executive Technology Leadership Forum',
        description: 'Exclusive event for technology leaders to discuss industry trends, innovation strategies, and future technologies.',
        event_date: '2024-03-20T08:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        tier: 'platinum' as const,
    },
    {
        title: 'VIP Innovation Workshop',
        description: 'Private workshop with industry pioneers focusing on cutting-edge technologies and breakthrough innovations.',
        event_date: '2024-03-25T13:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
        tier: 'platinum' as const,
    },
]

export async function seedDatabase() {
    try {
        console.log('Seeding database...')

        const { data, error } = await supabase
            .from('events')
            .insert(sampleEvents)

        if (error) {
            throw error
        }

        console.log('Database seeded successfully!')
    } catch (error) {
        console.error('Error seeding database:', error)
        throw error
    }
}

// Run seed if this file is executed directly
if (require.main === module) {
    seedDatabase()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error('Seeding failed:', error)
            process.exit(1)
        })
} 