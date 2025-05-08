import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getEventBySlug } from "@/lib/data" // We'll keep using mock data for now
import { formatDate } from "@/lib/utils"

interface EventPageProps {
  params: {
    slug: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{event.category}</Badge>
              {event.ticketsAvailable > 0 ? (
                <Badge variant="outline" className="text-xs">
                  {event.ticketsAvailable} tickets left
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  Sold Out
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">{event.title}</h1>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden mb-8">
            <div className="relative w-full aspect-video">
              <Image
                src={event.imageUrl || `/placeholder.svg?height=400&width=800`}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <div className="prose max-w-none dark:prose-invert">
                <p>{event.description}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <p className="mb-2">{event.venue}</p>
              <p className="text-muted-foreground">{event.address}</p>
              <div className="mt-4 rounded-lg overflow-hidden h-[300px] bg-muted">
                {/* Map would go here in a real implementation */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Interactive Map
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Organizer</h2>
              <p className="font-medium">{event.organizer}</p>
              <p className="text-muted-foreground mt-1">{event.organizerDescription}</p>
              <Button variant="outline" className="mt-4">
                Contact Organizer
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-bold mb-4">Tickets</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Price:</span>
                  <span className="font-bold">${event.price.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Availability:</span>
                  <span>{event.ticketsAvailable > 0 ? `${event.ticketsAvailable} tickets left` : "Sold Out"}</span>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">Tickets will be sent to your email</span>
                </div>

                <Button className="w-full" size="lg" disabled={event.ticketsAvailable <= 0} asChild>
                  <Link href={`/checkout?eventId=${event.id}`}>
                    {event.ticketsAvailable > 0 ? "Buy Tickets" : "Sold Out"}
                  </Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-2">Secure checkout powered by Stripe</p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 mt-6">
              <h3 className="text-lg font-bold mb-4">Share This Event</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <span className="sr-only">Share on Facebook</span>F
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <span className="sr-only">Share on Twitter</span>T
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <span className="sr-only">Share on LinkedIn</span>L
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <span className="sr-only">Share via Email</span>E
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
