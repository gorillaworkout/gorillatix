"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { signInWithGoogle } from "@/lib/firebase-auth"
import { useAuth } from "@/components/auth-provider"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user, loading, refreshAuthState } = useAuth()

  // If already authenticated, redirect to profile
  useEffect(() => {
    if (!loading && user) {
      router.push("/profile")
    }
  }, [loading, user, router])

  async function handleGoogleSignIn() {
    setIsLoading(true)

    try {
      // Real authentication with Firebase
      await signInWithGoogle()

      toast({
        title: "Signed up successfully",
        description: "Welcome to GorillaTix! Your account has been created.",
      })

      // Force refresh auth state
      await refreshAuthState()

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/profile")
      }, 500)
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      })
      setIsLoading(false)
    }
  }

  // If still checking auth state, show loading
  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex h-screen max-w-screen-md items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Sign up with your Google account to get started</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-4 mt-2">
            <div className="relative h-24 w-24">
              <Image
                src="/favicon-96x96.png"
                alt="GorillaTix Logo"
                fill
                sizes="96px"
                priority
                className="object-contain"
              />
            </div>
          </div>
          <Button onClick={handleGoogleSignIn} className="w-full mt-4" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign up with Google
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
