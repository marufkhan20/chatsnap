"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Download,
  LogOut,
  MoreVertical,
  Pencil,
  Plus,
  Settings,
  Trash,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("chats");

  // Mock data for created chats
  const chats = [
    {
      id: 1,
      name: "Chat with Elon",
      platform: "Twitter",
      date: "2024-01-27",
      thumbnail: "https://v0.dev/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Instagram DM",
      platform: "Instagram",
      date: "2024-01-26",
      thumbnail: "https://v0.dev/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="text-2xl font-bold">ChatSnap</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <img
                    src="https://v0.dev/placeholder.svg?height=32&width=32"
                    alt="User"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-8">
            <TabsList>
              <TabsTrigger value="chats">My Chats</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <Link href="/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Chat
              </Button>
            </Link>
          </div>

          <TabsContent value="chats">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chats.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {chat.name}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={chat.thumbnail || "/placeholder.svg"}
                        alt={chat.name}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                        <span>{chat.platform}</span>
                        <span>{chat.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john@example.com"
                        // file="app/dashboard/page.tsx"
                      />
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Change Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Preferences</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
