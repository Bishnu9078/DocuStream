"use client"

import Image from "next/image"
import { Search, Bell, ChevronDown, Play, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

// Sample movie data with actual images
const movies = [
  {
    id: 1,
    title: "Stranger Things",
    genre: "Sci-Fi & Fantasy",
    image: "/images/stranger-things.png",
    moods: ["scary", "happy"],
  },
  {
    id: 2,
    title: "The Crown",
    genre: "Drama",
    image: "/images/the-crown.png",
    moods: ["sad", "romantic"],
  },
  {
    id: 3,
    title: "Squid Game",
    genre: "Thriller",
    image: "/images/squid-game.png",
    moods: ["scary", "sad"],
  },
  {
    id: 4,
    title: "Money Heist",
    genre: "Crime",
    image: "/images/money-heist.png",
    moods: ["happy", "scary"],
  },
  {
    id: 5,
    title: "Bridgerton",
    genre: "Romance",
    image: "/images/bridgerton.png",
    moods: ["romantic"],
  },
  {
    id: 6,
    title: "The Witcher",
    genre: "Fantasy",
    image: "/images/witcher.png",
    moods: ["scary", "happy"],
  },
  {
    id: 7,
    title: "Queen's Gambit",
    genre: "Drama",
    image: "/images/queens-gambit.png",
    moods: ["sad", "happy"],
  },
  {
    id: 8,
    title: "Love, Death & Robots",
    genre: "Animation",
    image: "/images/love-death-robots.png",
    moods: ["scary", "happy", "sad"],
  },
  {
    id: 9,
    title: "The Notebook",
    genre: "Romance",
    image: "/images/notebook.png",
    moods: ["romantic", "sad"],
  },
  {
    id: 10,
    title: "Friends",
    genre: "Comedy",
    image: "/images/friends.png",
    moods: ["happy"],
  },
  {
    id: 11,
    title: "Haunting of Hill House",
    genre: "Horror",
    image: "/images/hill-house.png",
    moods: ["scary"],
  },
  {
    id: 12,
    title: "The Fault in Our Stars",
    genre: "Drama",
    image: "/images/fault-in-stars.png",
    moods: ["sad", "romantic"],
  },
]

export default function Home() {
  const [selectedMood, setSelectedMood] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I can help you find movies. Try asking me to 'find action movies' or 'show romantic comedies'.",
    },
  ])

  // Filter movies based on selected mood
  const filteredMovies = selectedMood ? movies.filter((movie) => movie.moods.includes(selectedMood)) : movies

  // Handle chat input
  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Add user message
    const newMessages = [...chatMessages, { role: "user", content: chatInput }]

    setChatMessages(newMessages)

    // Process query and generate response
    setTimeout(() => {
      let response = "I'm not sure what you're looking for. Try asking for a specific genre or mood."
      const query = chatInput.toLowerCase()

      if (query.includes("action")) {
        response = "Here are some action movies you might enjoy: Money Heist, The Witcher"
      } else if (query.includes("romantic") || query.includes("romance")) {
        response = "For romance, I recommend: Bridgerton, The Notebook"
      } else if (query.includes("scary") || query.includes("horror")) {
        response = "If you're looking for something scary, try: Stranger Things, Haunting of Hill House"
      } else if (query.includes("sad") || query.includes("drama")) {
        response = "For emotional content: The Crown, The Fault in Our Stars"
      } else if (query.includes("comedy") || query.includes("funny")) {
        response = "For a good laugh: Friends"
      } else if (query.includes("short")) {
        response = "For shorter content: Love, Death & Robots (anthology series with episodes under 20 minutes)"
      }

      setChatMessages([...newMessages, { role: "assistant", content: response }])
    }, 500)

    setChatInput("")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full bg-black/90 px-4 py-3 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/netflix-logo.png"
              alt="Netflix"
              width={120}
              height={40}
              className="h-8 w-24 object-contain"
            />

            <nav className="ml-8 hidden md:flex">
              <ul className="flex space-x-6 text-sm">
                <li className="font-medium">Home</li>
                <li className="text-gray-300 hover:text-white">TV Shows</li>
                <li className="text-gray-300 hover:text-white">Movies</li>
                <li className="text-gray-300 hover:text-white">New & Popular</li>
                <li className="text-gray-300 hover:text-white">My List</li>
              </ul>
            </nav>
          </div>

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Titles, people, genres"
                className="h-9 w-[180px] rounded bg-black/60 pl-8 text-sm text-white placeholder:text-gray-400 focus-visible:ring-white/20 md:w-[260px]"
              />
            </div>

            <Bell className="h-5 w-5 text-gray-300" />

            <div className="flex items-center">
              <Avatar className="h-8 w-8 border-none">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-red-600">U</AvatarFallback>
              </Avatar>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-300" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black"></div>
        <Image src="/images/netflix-hero.png" alt="Featured Content" fill className="object-cover" priority />

        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <h1 className="mb-4 max-w-2xl text-4xl font-bold md:text-6xl">Stranger Things</h1>
          <p className="mb-6 max-w-md text-lg text-gray-300">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying
            supernatural forces, and one strange little girl.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-white px-6 text-black hover:bg-white/90">▶ Play</Button>
            <Button variant="outline" className="border-gray-400 px-6 text-white hover:bg-white/10">
              ℹ️ More Info
            </Button>
          </div>
        </div>
      </section>

      {/* AI Mood Suggestions */}
      <section className="px-4 py-8 md:px-8">
        <h2 className="mb-6 text-2xl font-medium">AI Mood Suggestions</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => setSelectedMood(selectedMood === "happy" ? "" : "happy")}
            className={`rounded-full px-6 py-6 text-xl ${selectedMood === "happy" ? "bg-yellow-500" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            😊 Happy
          </Button>
          <Button
            onClick={() => setSelectedMood(selectedMood === "sad" ? "" : "sad")}
            className={`rounded-full px-6 py-6 text-xl ${selectedMood === "sad" ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            😢 Sad
          </Button>
          <Button
            onClick={() => setSelectedMood(selectedMood === "scary" ? "" : "scary")}
            className={`rounded-full px-6 py-6 text-xl ${selectedMood === "scary" ? "bg-purple-500" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            😱 Scary
          </Button>
          <Button
            onClick={() => setSelectedMood(selectedMood === "romantic" ? "" : "romantic")}
            className={`rounded-full px-6 py-6 text-xl ${selectedMood === "romantic" ? "bg-pink-500" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            ❤️ Romantic
          </Button>
        </div>
      </section>

      {/* Trending Movies Grid */}
      <section className="px-4 py-8 md:px-8">
        <h2 className="mb-6 text-2xl font-medium">
          {selectedMood
            ? `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Movies & Shows`
            : "Trending Movies & Shows"}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-md bg-gray-900 transition-all hover:scale-105"
            >
              <div className="aspect-[2/3] w-full">
                <Image
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-300">{movie.genre}</p>
                <Button className="mt-2 w-full bg-white text-black hover:bg-white/90">
                  <Play className="mr-1 h-4 w-4" /> Play
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Rows */}
      <section className="px-4 py-8 md:px-8">
        <h2 className="mb-4 text-xl font-medium">Popular on Netflix</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {movies.slice(0, 6).map((movie) => (
            <div
              key={`popular-${movie.id}`}
              className="aspect-video overflow-hidden rounded bg-gray-800 transition-transform hover:scale-105"
            >
              <Image
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                width={320}
                height={180}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 md:px-8">
        <h2 className="mb-4 text-xl font-medium">Watch Again</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {movies.slice(6, 12).map((movie) => (
            <div
              key={`watch-again-${movie.id}`}
              className="aspect-video overflow-hidden rounded bg-gray-800 transition-transform hover:scale-105"
            >
              <Image
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                width={320}
                height={180}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* AI Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <Button
            onClick={() => setChatOpen(true)}
            className="h-14 w-14 rounded-full bg-red-600 p-0 shadow-lg hover:bg-red-700"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <div className="flex w-80 flex-col overflow-hidden rounded-lg bg-gray-900 shadow-xl md:w-96">
            <div className="flex items-center justify-between bg-red-600 px-4 py-3">
              <h3 className="font-medium">Netflix AI Assistant</h3>
              <Button
                onClick={() => setChatOpen(false)}
                variant="ghost"
                className="h-8 w-8 rounded-full p-0 text-white hover:bg-red-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: "300px" }}>
              {chatMessages.map((message, index) => (
                <div key={index} className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.role === "user" ? "bg-red-600 text-white" : "bg-gray-800 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} className="border-t border-gray-800 p-3">
              <div className="flex">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for movie suggestions..."
                  className="flex-1 bg-gray-800 text-white placeholder:text-gray-400"
                />
                <Button type="submit" className="ml-2 bg-red-600 hover:bg-red-700">
                  Send
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-800 px-4 py-8 text-sm text-gray-500 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              FAQ
            </a>
            <a href="#" className="hover:text-gray-300">
              Help Center
            </a>
            <a href="#" className="hover:text-gray-300">
              Account
            </a>
            <a href="#" className="hover:text-gray-300">
              Media Center
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <a href="#" className="hover:text-gray-300">
              Terms of Use
            </a>
            <a href="#" className="hover:text-gray-300">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-300">
              Cookie Preferences
            </a>
            <a href="#" className="hover:text-gray-300">
              Corporate Information
            </a>
            <a href="#" className="hover:text-gray-300">
              Contact Us
            </a>
            <a href="#" className="hover:text-gray-300">
              Speed Test
            </a>
            <a href="#" className="hover:text-gray-300">
              Legal Notices
            </a>
            <a href="#" className="hover:text-gray-300">
              Only on Netflix
            </a>
          </div>
          <p className="mt-8">© 2023 Netflix, Inc.</p>
        </div>
      </footer>
    </div>
  )
}
