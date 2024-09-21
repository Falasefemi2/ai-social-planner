/* eslint-disable react/no-unescaped-entities */

import Link from "next/link"
import { Calendar, Home, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/mode-toggle"
import TypingAnimation from "@/components/magicui/typing-animation"
import { BorderBeam } from "@/components/magicui/border-beam"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { DashboardIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "./db"
import { User } from "./db/schema"
import { sql } from "drizzle-orm"




export default async function HomPage() {
  const user = await currentUser();
  const { userId } = auth();

  if (user && userId) {
    try {
      const newUser = await db.insert(User).values({
        id: userId,
        email: user.emailAddresses[0]?.emailAddress || "", // Use the first email address
        profileImageUrl: user.imageUrl || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .onConflictDoUpdate({
          target: User.id,
          set: {
            email: sql`${user.emailAddresses[0]?.emailAddress || null}`, // Handle null email
            profileImageUrl: sql`${user.imageUrl}`,
            firstName: sql`${user.firstName}`,
            lastName: sql`${user.lastName}`,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          },
        })
        .returning();

      console.log("User created or updated:", newUser[0]);
    } catch (error) {
      console.error("Error creating user in database:", error);
    }
  }



  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span className="inline-block font-bold">AI Social Planner</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>
                      <Image src="/logo.svg" alt="logo" width={64} height={64} />
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-4">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                      <Home className="h-5 w-5" />
                      Home
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                      <DashboardIcon className="h-5 w-5" />
                      Dashboard
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <ModeToggle />
              <div className="gap-4"></div>
              <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton />
              </SignedIn>
              <div className="gap-4"></div>
              <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
              </SignedOut>
            </nav>
          </div>
        </div>
      </header>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-14 flex-col border-r bg-muted/40 sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Calendar className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">AI Social Planner</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <DashboardIcon className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

      </aside>
      <main className="flex-1 sm:pl-14">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <TypingAnimation
                  text="AI Social Planner"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                />
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Revolutionize your social life with AI-powered event planning and friend coordination.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/dashboard">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="relative">
                <Card className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
                  <BorderBeam size={250} duration={12} delay={9} />
                  <CardHeader>
                    <CardTitle>Smart Scheduling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Our AI analyzes everyone's availability and preferences to suggest the
                      perfect time for your gatherings.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <Card className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
                  <BorderBeam size={250} duration={12} delay={9} />
                  <CardHeader>
                    <CardTitle>Personalized Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Get tailored suggestions for activities, restaurants, and venues based on your group's interests.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <Card className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
                  <BorderBeam size={250} duration={12} delay={9} />
                  <CardHeader>
                    <CardTitle>Seamless Coordination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Effortlessly manage RSVPs, reminders, and last-minute changes with our intuitive platform.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative">
                <Card className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
                  <BorderBeam size={250} duration={12} delay={9} />
                  <CardHeader>
                    <CardTitle>Sarah K.</CardTitle>
                    <CardDescription>Marketing Manager</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>"AI Social Planner has transformed how I organize events with friends. It's like having a personal assistant who knows everyone's schedules and preferences!"</p>
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <Card className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
                  <BorderBeam size={250} duration={12} delay={9} />
                  <CardHeader>
                    <CardTitle>Alex M.</CardTitle>
                    <CardDescription>Software Engineer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>"I love how easy it is to plan group activities now. The AI suggestions are spot-on, and it's saved us so much time on coordination."</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Revolutionize Your Social Life?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of users who are already enjoying stress-free event planning with AI Social Planner.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Input type="email" placeholder="Enter your email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2023 AI Social Planner. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}