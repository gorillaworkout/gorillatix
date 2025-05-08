import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

interface EventCardProps {
  event: {
    id: string
    slug: string
    title: string
    date: string
    location: string
    imageUrl: string
    price: number
    category: string
    ticketsAvailable: number
  }
}

export function EventCard({ event }: EventCardProps) {
  const { id, slug, title, date, location, imageUrl, price, category, ticketsAvailable } = event

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] relative">
        <Image
          src={imageUrl || `/placeholder.svg?height=225&width=400`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-2 right-2">{category}</Badge>
      </div>
      <CardHeader className="p-4">
        <Link href={`/event/${slug}`} className="hover:underline">
          <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-1 h-4 w-4" />
          <span>{formatDate(date)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="font-semibold">${price.toFixed(2)}</div>
          {ticketsAvailable > 0 ? (
            <Badge variant="outline" className="text-xs">
              {ticketsAvailable} tickets left
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              Sold Out
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/event/${slug}`}>{ticketsAvailable > 0 ? "Buy Tickets" : "View Details"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
