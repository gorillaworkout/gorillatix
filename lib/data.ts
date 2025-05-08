// This file contains mock data functions that would normally fetch from a database

// Mock events data
const events = [
  {
    id: "1",
    slug: "summer-music-festival",
    title: "Summer Music Festival 2023",
    date: "2023-07-15",
    time: "7:00 PM",
    location: "Central Park, New York",
    venue: "Central Park Great Lawn",
    address: "Central Park, New York, NY 10024",
    imageUrl: "/placeholder.svg?height=400&width=800",
    description:
      "Join us for the biggest music festival of the summer featuring top artists from around the world. Experience amazing performances across multiple stages, delicious food vendors, and a vibrant atmosphere.",
    price: 49.99,
    category: "Music",
    ticketsAvailable: 150,
    organizer: "NYC Events Co.",
    organizerDescription: "NYC Events Co. has been organizing premium events in New York City for over 10 years.",
  },
  {
    id: "2",
    slug: "tech-conference-2023",
    title: "Tech Conference 2023",
    date: "2023-08-10",
    time: "9:00 AM",
    location: "Convention Center, San Francisco",
    venue: "San Francisco Convention Center",
    address: "747 Howard St, San Francisco, CA 94103",
    imageUrl: "/placeholder.svg?height=400&width=800",
    description:
      "The premier tech conference bringing together industry leaders, innovators, and developers. Featuring keynote speeches, workshops, and networking opportunities.",
    price: 149.99,
    category: "Conference",
    ticketsAvailable: 80,
    organizer: "TechEvents Global",
    organizerDescription: "TechEvents Global specializes in technology conferences and networking events worldwide.",
  },
  {
    id: "3",
    slug: "comedy-night",
    title: "Comedy Night",
    date: "2023-06-25",
    time: "8:00 PM",
    location: "Laugh Factory, Los Angeles",
    venue: "The Laugh Factory",
    address: "8001 Sunset Blvd, Los Angeles, CA 90046",
    imageUrl: "/placeholder.svg?height=400&width=800",
    description:
      "A night of non-stop laughter featuring the best stand-up comedians in the country. Come enjoy drinks and entertainment in a relaxed atmosphere.",
    price: 24.99,
    category: "Comedy",
    ticketsAvailable: 20,
    organizer: "LA Comedy Productions",
    organizerDescription: "LA Comedy Productions brings the funniest comedians to venues across Los Angeles.",
  },
  {
    id: "4",
    slug: "basketball-championship",
    title: "Basketball Championship",
    date: "2023-09-05",
    time: "6:30 PM",
    location: "Madison Square Garden, New York",
    venue: "Madison Square Garden",
    address: "4 Pennsylvania Plaza, New York, NY 10001",
    imageUrl: "/placeholder.svg?height=400&width=800",
    description:
      "The ultimate basketball showdown featuring the top teams competing for the championship title. Experience the thrill of live sports at its finest.",
    price: 59.99,
    category: "Sports",
    ticketsAvailable: 200,
    organizer: "Sports Events International",
    organizerDescription: "Sports Events International organizes premium sporting events across the United States.",
  },
  {
    id: "5",
    slug: "art-exhibition",
    title: "Modern Art Exhibition",
    date: "2023-07-20",
    time: "10:00 AM",
    location: "Modern Art Museum, Chicago",
    venue: "Chicago Modern Art Museum",
    address: "220 E Chicago Ave, Chicago, IL 60611",
    imageUrl: "/placeholder.svg?height=400&width=800",
    description:
      "Explore contemporary art from renowned artists around the world. This exhibition features paintings, sculptures, and interactive installations that challenge conventional perspectives.",
    price: 35.0,
    category: "Art",
    ticketsAvailable: 80,
    organizer: "Chicago Arts Foundation",
    organizerDescription:
      "The Chicago Arts Foundation promotes and showcases artistic talent through exhibitions and events.",
  },
  {
    id: "6",
    slug: "food-and-wine-festival",
    title: "Food & Wine Festival",
    date: "2023-08-25",
    time: "12:00 PM",
    location: "Waterfront Park, Seattle",
    venue: "Seattle Waterfront Park",
    address: "1401 Alaskan Way, Seattle, WA 98101",
    imageUrl: "/placeholder.svg?height=400&width=800",
    description:
      "Indulge in culinary delights from top chefs and sample premium wines from local and international vineyards. A feast for all the senses!",
    price: 75.0,
    category: "Food",
    ticketsAvailable: 100,
    organizer: "Pacific Northwest Culinary Events",
    organizerDescription:
      "Pacific Northwest Culinary Events celebrates the region's food culture through festivals and tastings.",
  },
  {
    id: "7",
    slug: "electronic-music-night",
    title: "Electronic Music Night",
    date: "2023-07-30",
    time: "10:00 PM",
    location: "Club Nebula, Miami",
    venue: "Club Nebula",
    address: "1235 Washington Ave, Miami Beach, FL 33139",
    imageUrl: "/placeholder.svg?height=400&width=800",
    description:
      "Dance the night away with world-class DJs spinning the latest electronic music. Featuring state-of-the-art sound systems and immersive light shows.",
    price: 45.0,
    category: "Music",
    ticketsAvailable: 200,
    organizer: "Miami Nightlife Productions",
    organizerDescription: "Miami Nightlife Productions creates unforgettable electronic music events in South Florida.",
  },
  {
    id: "8",
    slug: "broadway-musical",
    title: "Broadway Musical: The Phantom",
    date: "2023-08-15",
    time: "7:30 PM",
    location: "Broadway Theater, New York",
    venue: "Broadway Theater",
    address: "1681 Broadway, New York, NY 10019",
    imageUrl: "/placeholder.svg?height=400&width=800",
    description:
      "Experience the magic of Broadway with this award-winning musical production. Featuring stunning performances, elaborate costumes, and unforgettable music.",
    price: 120.0,
    category: "Theater",
    ticketsAvailable: 50,
    organizer: "Broadway Productions Inc.",
    organizerDescription: "Broadway Productions Inc. brings world-class theatrical performances to New York City.",
  },
]

// Function to get all events
export async function getEvents() {
  // In a real app, this would fetch from a database
  return events
}

// Function to get a single event by slug
export async function getEventBySlug(slug: string) {
  // In a real app, this would fetch from a database
  return events.find((event) => event.slug === slug) || null
}

// Function to get a single event by ID
export async function getEventById(id: string) {
  // In a real app, this would fetch from a database
  return events.find((event) => event.id === id) || null
}
