"use client";

import { AnimatedDemo } from "@/components/animated-demo";
import { DemoShowcase } from "@/components/demo-showcase";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OrderButton from "@/components/ui/order-button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Image,
  MessageSquare,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: MessageSquare,
      title: "Multiple Platforms",
      description:
        "Create fake chats for Instagram, WhatsApp, Telegram, and Facebook",
    },
    {
      icon: Users,
      title: "Celebrity Chats",
      description:
        "Generate fake conversations with celebrities and famous personalities",
    },
    {
      icon: Image,
      title: "Customizable",
      description:
        "Customize profile pictures, names, time stamps and messages",
    },
    {
      icon: Download,
      title: "Easy Download",
      description: "Download your fake chat screenshots instantly",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      content:
        "This tool is amazing for creating engaging social media content!",
      avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike Chen",
      role: "Digital Artist",
      content:
        "The best fake chat generator I've ever used. So many customization options!",
      avatar: "https://v0.dev//placeholder.svg?height=40&width=40",
    },
    {
      name: "Emma Davis",
      role: "Social Media Manager",
      content: "Perfect for creating engaging marketing materials and mockups.",
      avatar: "https://v0.dev//placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 py-24 mx-auto text-center relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <motion.h1
            className="text-4xl sm:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Fake Chat Screenshots
            <br />
            <span className="text-primary">In Seconds</span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Generate realistic chat screenshots for Instagram, WhatsApp,
            Telegram, and Facebook. Perfect for pranks, content creation, or
            just having fun!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/create">
              <Button size="lg" className="rounded-full">
                Start Creating <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Demo Section */}
        <section className="container px-4 mx-auto">
          {/* <h2 className="text-3xl font-bold text-center mb-12">
            See How It Works
          </h2> */}
          <DemoShowcase />
        </section>

        {/* Features Section */}
        <section className="container px-4 pt-24 pb-14 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Create Chat Screenshots in Minutes
              </h2>
              <OrderButton />
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="pt-4">
                <Link href="/create">
                  <Button size="lg">
                    Start Creating <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:order-last order-first">
              <AnimatedDemo />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container px-4 py-24 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4 italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container px-4 text-center text-muted-foreground">
          © 2024 ChatSnap. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
