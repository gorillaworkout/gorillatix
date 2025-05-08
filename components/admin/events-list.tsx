"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Edit, MoreHorizontal, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { formatDate } from "@/lib/utils"

// Mock data for events
const events = [
  {
    id: "1",
    title: "Summer Music Festival",
    date: "2023-07-15",
    location: "Central Park, New York",
    category: "Music",
    status: "Active",
    ticketsSold: 350,
    ticketsAvailable: 150,
  },
  {
    id: "2",
    title: "Tech Conference 2023",
    date: "2023-08-10",
    location: "Convention Center, San Francisco",
    category: "Conference",
    status: "Active",
    ticketsSold: 420,
    ticketsAvailable: 80,
  },
  {
    id: "3",
    title: "Comedy Night",
    date: "2023-06-25",
    location: "Laugh Factory, Los Angeles",
    category: "Comedy",
    status: "Active",
    ticketsSold: 180,
    ticketsAvailable: 20,
  },
  {
    id: "4",
    title: "Basketball Championship",
    date: "2023-09-05",
    location: "Madison Square Garden, New York",
    category: "Sports",
    status: "Upcoming",
    ticketsSold: 800,
    ticketsAvailable: 200,
  },
  {
    id: "5",
    title: "Art Exhibition",
    date: "2023-07-20",
    location: "Modern Art Museum, Chicago",
    category: "Art",
    status: "Active",
    ticketsSold: 120,
    ticketsAvailable: 80,
  },
]

export function AdminEventsList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setSelectedEventId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would call your API to delete the event
    console.log(`Deleting event with ID: ${selectedEventId}`)
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tickets Sold</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                  {formatDate(event.date)}
                </div>
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <Badge variant="outline">{event.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={event.status === "Active" ? "default" : "secondary"}>{event.status}</Badge>
              </TableCell>
              <TableCell>{event.ticketsSold}</TableCell>
              <TableCell>{event.ticketsAvailable}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/events/${event.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event and all associated tickets and
              transactions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
