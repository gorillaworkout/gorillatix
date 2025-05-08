"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { EventCard } from "@/components/event-card"
import { SearchForm } from "@/components/search-form"
import { getEvents, searchEvents, getEventsByCategory } from "@/lib/firestore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

function EventsLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border bg-card">
          <Skeleton className="aspect-[16/9] w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EventsList() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const queryParam = searchParams.get("query")

  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [category, setCategory] = useState(categoryParam || "all")
  const [searchQuery, setSearchQuery] = useState(queryParam || "")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        let result = []

        if (searchQuery) {
          result = await searchEvents(searchQuery)
        } else if (category && category !== "all") {
          result = await getEventsByCategory(category)
        } else {
          result = await getEvents()
        }

        setEvents(result)
        setFilteredEvents(result)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [category, searchQuery])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Music", label: "Music" },
    { value: "Sports", label: "Sports" },
    { value: "Theater", label: "Theater" },
    { value: "Comedy", label: "Comedy" },
    { value: "Conference", label: "Conference" },
    { value: "Art", label: "Art & Culture" },
    { value: "Food", label: "Food & Drink" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <SearchForm onSearch={handleSearch} initialQuery={searchQuery} />
          </div>
          <div className="w-full md:w-64">
            <Label htmlFor="category-filter" className="mb-2 block">
              Filter by Category
            </Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <EventsLoading />
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default function EventsPage() {
  return (
    <Suspense fallback={<EventsLoading />}>
      <EventsList />
    </Suspense>
  )
}
