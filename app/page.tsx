"use client";

import { EventCard } from "@/components/event-card";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEvents } from "@/context/event-context";
import { SkeletonCard } from "@/components/skeleton-card";
// import { useEffect } from "react";

export default function Home() {
  // Get events from context
  const { events, loading } = useEvents();
const sortedEvents = events
  ? (() => {
      const now = new Date();

      const activeEvents = [];
      const upcomingEvents = [];

      for (const event of events) {
        const sellingStart = new Date(
          typeof event.startSellingDate === "string"
            ? event.startSellingDate + "T00:00:00"
            : event.startSellingDate
        );

        const eventDate = new Date(
          typeof event.date === "string"
            ? event.date + "T23:59:59"
            : event.date
        );

        if (sellingStart <= now && eventDate >= now) {
          activeEvents.push(event);
        } else if (sellingStart > now) {
          upcomingEvents.push(event);
        }
      }

      // Sort active events by startSellingDate ascending (optional)
      activeEvents.sort((a, b) => new Date(a.startSellingDate).getTime() - new Date(b.startSellingDate).getTime());

      // Sort upcoming events by startSellingDate ascending
      upcomingEvents.sort((a, b) => new Date(a.startSellingDate).getTime() - new Date(b.startSellingDate).getTime());

      return [...activeEvents, ...upcomingEvents];
    })()
  : [];

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
          {loading || !events
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : sortedEvents
                .slice(0, 4)
                .map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </section>

      <section className="py-12">
        <div className="rounded-lg bg-muted p-8 md:p-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Organize Your Own Event
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              Are you an event organizer? Partner with GorillaTix to sell
              tickets for your events.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
