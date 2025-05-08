import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  type Timestamp,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"

// Event types
export interface Event {
  id: string
  slug: string
  title: string
  description: string
  date: string
  time: string
  location: string
  venue: string
  address: string
  imageUrl: string
  price: number
  category: string
  ticketsAvailable: number
  organizer: string
  organizerDescription: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface EventInput {
  slug: string
  title: string
  description: string
  date: string
  time: string
  location: string
  venue: string
  address: string
  imageUrl: string
  price: number
  category: string
  ticketsAvailable: number
  organizer: string
  organizerDescription: string
}

// Get all events
export async function getEvents() {
  const eventsCollection = collection(db, "events")
  const eventsSnapshot = await getDocs(eventsCollection)

  return eventsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[]
}

// Get event by slug
export async function getEventBySlug(slug: string) {
  const eventsCollection = collection(db, "events")
  const q = query(eventsCollection, where("slug", "==", slug), limit(1))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const doc = querySnapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
  } as Event
}

// Get event by ID
export async function getEventById(id: string) {
  const eventDoc = doc(db, "events", id)
  const eventSnapshot = await getDoc(eventDoc)

  if (!eventSnapshot.exists()) {
    return null
  }

  return {
    id: eventSnapshot.id,
    ...eventSnapshot.data(),
  } as Event
}

// Create a new event
export async function createEvent(eventData: EventInput) {
  const eventsCollection = collection(db, "events")

  const newEvent = {
    ...eventData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const docRef = await addDoc(eventsCollection, newEvent)
  return docRef.id
}

// Update an event
export async function updateEvent(id: string, eventData: Partial<EventInput>) {
  const eventDoc = doc(db, "events", id)

  const updatedEvent = {
    ...eventData,
    updatedAt: serverTimestamp(),
  }

  await updateDoc(eventDoc, updatedEvent)
  return id
}

// Delete an event
export async function deleteEvent(id: string) {
  const eventDoc = doc(db, "events", id)
  await deleteDoc(eventDoc)
  return id
}

// Get events by category
export async function getEventsByCategory(category: string) {
  const eventsCollection = collection(db, "events")
  const q = query(eventsCollection, where("category", "==", category))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[]
}

// Search events
export async function searchEvents(searchTerm: string) {
  // Note: Firestore doesn't support full-text search natively
  // For a production app, you might want to use Algolia or similar
  // This is a simple implementation that searches titles only
  const eventsCollection = collection(db, "events")
  const querySnapshot = await getDocs(eventsCollection)

  const searchTermLower = searchTerm.toLowerCase()

  return querySnapshot.docs
    .map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Event,
    )
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchTermLower) ||
        event.description.toLowerCase().includes(searchTermLower) ||
        event.location.toLowerCase().includes(searchTermLower),
    )
}

// Get upcoming events
export async function getUpcomingEvents(limit = 10) {
  const eventsCollection = collection(db, "events")
  const today = new Date().toISOString().split("T")[0] // Format: YYYY-MM-DD

  const q = query(eventsCollection, where("date", ">=", today), orderBy("date", "asc"), limit(limit))

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[]
}

// Order types
export interface Order {
  id: string
  userId: string
  eventId: string
  quantity: number
  totalPrice: number
  status: "pending" | "completed" | "cancelled"
  paymentId?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface OrderInput {
  userId: string
  eventId: string
  quantity: number
  totalPrice: number
  status: "pending" | "completed" | "cancelled"
  paymentId?: string
}

// Create a new order
export async function createOrder(orderData: OrderInput) {
  const ordersCollection = collection(db, "orders")

  const newOrder = {
    ...orderData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const docRef = await addDoc(ordersCollection, newOrder)
  return docRef.id
}

// Get orders by user ID
export async function getOrdersByUserId(userId: string) {
  const ordersCollection = collection(db, "orders")
  const q = query(ordersCollection, where("userId", "==", userId), orderBy("createdAt", "desc"))

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[]
}

// Update order status
export async function updateOrderStatus(id: string, status: "pending" | "completed" | "cancelled") {
  const orderDoc = doc(db, "orders", id)

  await updateDoc(orderDoc, {
    status,
    updatedAt: serverTimestamp(),
  })

  return id
}
