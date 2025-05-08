import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About GorillaTix</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted platform for discovering and booking tickets to the best events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2023, GorillaTix was born from a simple idea: make event ticketing simple, secure, and
              accessible to everyone. We noticed how complicated and frustrating buying tickets could be, with hidden
              fees, confusing interfaces, and limited options.
            </p>
            <p>
              Our team of event enthusiasts and tech innovators came together to create a platform that puts customers
              first. We've built GorillaTix to be transparent, user-friendly, and packed with events you'll love.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="GorillaTix team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>

        <Separator className="my-16" />

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To connect people with unforgettable experiences through a seamless ticketing platform that serves both
            event organizers and attendees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Simplicity</h3>
              </div>
              <p className="text-center text-muted-foreground">
                We believe buying tickets should be easy. Our platform is designed to be intuitive and straightforward,
                from browsing events to receiving your tickets.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Security</h3>
              </div>
              <p className="text-center text-muted-foreground">
                Your security is our priority. We use advanced encryption and fraud prevention measures to ensure your
                transactions and personal information are always protected.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <circle cx="12" cy="10" r="2" />
                    <line x1="8" x2="8" y1="2" y2="4" />
                    <line x1="16" x2="16" y1="2" y2="4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Diversity</h3>
              </div>
              <p className="text-center text-muted-foreground">
                We curate a diverse range of events to ensure there's something for everyone, from concerts and sports
                to theater, comedy, and cultural experiences.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16" />

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Meet the passionate individuals behind GorillaTix who work tirelessly to bring you the best ticketing
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            {
              name: "Alex Johnson",
              role: "CEO & Founder",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Sarah Chen",
              role: "CTO",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Michael Rodriguez",
              role: "Head of Operations",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Priya Patel",
              role: "Customer Experience",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-8 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            We're always looking for talented individuals who are passionate about events and technology.
          </p>
          <Button asChild size="lg">
            <Link href="/careers">View Open Positions</Link>
          </Button>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">Have questions or feedback? We'd love to hear from you!</p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
