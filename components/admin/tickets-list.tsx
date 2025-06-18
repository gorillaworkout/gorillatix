"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatRupiah } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Ticket = {
  customerName: string;
  eventId: string;
  eventName: string;
  orderId: string;
  purchaseDate: Timestamp;
  quantity: number;
  status: string;
  totalPrice: number;
  userId: string;
  venue: string;
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Map eventName to total tickets sold
  const [eventStats, setEventStats] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchTickets() {
      try {
        const snapshot = await getDocs(collection(db, "tickets"));
        const data: Ticket[] = snapshot.docs.map((doc) => doc.data() as Ticket);

        // Calculate total tickets per event
        const stats: Record<string, number> = {};
        for (const ticket of data) {
          if (ticket.eventName) {
            stats[ticket.eventName] = (stats[ticket.eventName] || 0) + ticket.quantity;
          }
        }

        setTickets(data);
        setEventStats(stats);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const eventNames = Object.keys(eventStats).sort();

  const filteredTickets =
    selectedEvent === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.eventName === selectedEvent);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">All Tickets</h1>

      <div className="max-w-xs">
        <Select onValueChange={setSelectedEvent} defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Filter by event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {eventNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name} ({eventStats[name]} tickets)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredTickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="overflow-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchase Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket, index) => (
                <TableRow key={ticket.orderId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{ticket.customerName}</TableCell>
                  <TableCell>{ticket.eventName}</TableCell>
                  <TableCell>{ticket.orderId}</TableCell>
                  <TableCell>{ticket.venue}</TableCell>
                  <TableCell>{ticket.quantity}</TableCell>
                  <TableCell>{formatRupiah(ticket.totalPrice)}</TableCell>
                  <TableCell>
                    <Badge>{ticket.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {ticket.purchaseDate &&
                    typeof ticket.purchaseDate.toDate === "function"
                      ? ticket.purchaseDate.toDate().toLocaleString("id-ID")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
