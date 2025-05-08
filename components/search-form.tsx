"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFormProps {
  onSearch?: (query: string) => void
  initialQuery?: string
}

export function SearchForm({ onSearch, initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (onSearch) {
      onSearch(query)
    } else {
      // If no onSearch prop is provided, navigate to events page with query
      router.push(`/events?query=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex w-full items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events..."
          className="pl-9 pr-16"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" size="sm" className="absolute right-1 top-1 bottom-1 h-auto">
          Search
        </Button>
      </div>
    </form>
  )
}
