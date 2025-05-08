import { EventCard } from "@/components/event-card"
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { getEvents } from "@/lib/data"
import Link from "next/link"

export default async function Home() {
  // Get events from mock data
  const events = await getEvents()

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
          <Button asChild variant="outline">
            <Link href="/events">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="rounded-lg bg-muted p-8 md:p-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Organize Your Own Event</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Are you an event organizer? Partner with GorillaTix to sell tickets for your events.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
