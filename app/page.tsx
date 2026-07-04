"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ShoppingBag, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { HeroLoginForm } from '@/components/auth/HeroLoginForm';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  placeholderLabel: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, placeholderLabel }) => (
  <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
    <div className="relative h-48 bg-gradient-to-br from-[#82DB7E]/20 via-[#82DB7E]/10 to-transparent flex items-center justify-center">
      <span className="text-xs text-muted-foreground font-medium px-4 py-2 bg-background/80 backdrop-blur-sm rounded-md border border-border">
        {placeholderLabel}
      </span>
    </div>
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-[#82DB7E]/10 rounded-lg text-[#82DB7E]">
          {icon}
        </div>
        <h3 className="font-raleway font-bold text-lg">{title}</h3>
      </div>
      <p className="text-muted-foreground font-worksans text-sm leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

interface ProductStepProps {
  number: string;
  title: string;
  description: string;
}

const ProductStep: React.FC<ProductStepProps> = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="relative w-64 h-[500px] bg-gradient-to-br from-background via-muted/30 to-background border-4 border-border rounded-[2.5rem] shadow-xl flex items-center justify-center">
      <span className="text-xs text-muted-foreground font-medium px-4 py-2 bg-background/80 backdrop-blur-sm rounded-md border border-border">
        SCREENSHOT: yrdly-app
      </span>
    </div>
    <div className="space-y-2">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#82DB7E] text-background font-bold text-lg">
        {number}
      </div>
      <h3 className="font-raleway font-bold text-xl">{title}</h3>
      <p className="text-muted-foreground font-worksans text-sm max-w-xs">{description}</p>
    </div>
  </div>
);

const YrdlyHomepage: React.FC = () => {
  const [email, setEmail] = useState('');

  const faqs = [
    {
      question: 'How do I create a listing on Yrdly?',
      answer: 'Simply open the app, tap the "+" button, snap a photo of your item, add a quick description and price, and post! Your neighbours will see it instantly.'
    },
    {
      question: 'Is it safe to buy from neighbours?',
      answer: 'Yes! All Yrdly users are verified by estate/street address. You can see profiles, ratings, and meet face-to-face in your own neighbourhood for safe exchanges.'
    },
    {
      question: 'How do I find local events and owambe?',
      answer: 'Check the Events tab to see what\'s happening nearby — from birthday parties to estate meetings. RSVP directly and get reminders so you never miss out.'
    },
    {
      question: 'Can I save items to view later?',
      answer: 'Absolutely! Tap the heart icon on any listing to save it. Find all your saved items in your profile whenever you\'re ready to buy.'
    },
    {
      question: 'How do I contact support?',
      answer: 'Reach us anytime at support@yrdly.ng or through the in-app help center. We\'re here to keep your neighbourhood connected and running smoothly.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-worksans">
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-jersey text-foreground leading-tight">
                  Your Neighbourhood, Connected.
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-worksans leading-relaxed max-w-xl">
                  Stay in the loop with your neighbours, buy and sell safely on your street, and discover local owambe and events just steps away.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.yrdly.ng" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#82DB7E] hover:bg-[#82DB7E]/90 text-background font-raleway font-bold text-lg px-8 w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-border font-raleway font-semibold text-lg">
                  Learn More
                </Button>
              </div>

              <div className="w-full max-w-md">
                <HeroLoginForm />
              </div>
            </div>

            <div className="relative h-[500px] bg-gradient-to-br from-[#82DB7E]/30 via-[#82DB7E]/10 to-transparent rounded-3xl border-2 border-border shadow-2xl flex items-center justify-center">
              <span className="text-sm text-muted-foreground font-medium px-6 py-3 bg-background/80 backdrop-blur-sm rounded-lg border border-border">
                REAL PHOTO — estate/street scene
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Hub */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-jersey text-foreground mb-4">
              See What's Happening In Your Estate
            </h2>
            <p className="text-lg text-muted-foreground font-worksans max-w-2xl mx-auto">
              From owambe to marketplace deals, your neighbourhood is buzzing with activity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar size={24} />}
              title="Local Owambe & Events"
              description="Never miss a party, estate meeting, or community gathering. See what's happening this weekend and RSVP with one tap."
              placeholderLabel="REAL PHOTO — to be inserted"
            />
            <FeatureCard
              icon={<ShoppingBag size={24} />}
              title="Neighbourhood Market"
              description="Buy and sell with people down the road. From furniture to fashion, find deals from trusted neighbours — no shipping, no wahala."
              placeholderLabel="REAL PHOTO — to be inserted"
            />
            <FeatureCard
              icon={<Users size={24} />}
              title="Verified Neighbours Only"
              description="Every user is verified by estate and street address. Connect with real people in your community, safely and securely."
              placeholderLabel="REAL PHOTO — to be inserted"
            />
          </div>
        </div>
      </section>

      {/* Product Tour */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-jersey text-foreground mb-4">
              Your Estate, In Your Pocket
            </h2>
            <p className="text-lg text-muted-foreground font-worksans max-w-2xl mx-auto">
              Everything you need to stay connected with your neighbourhood, right at your fingertips
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <ProductStep
              number="1"
              title="Swift Listings"
              description="Snap, price, post. List anything in seconds and reach neighbours who are actually nearby and ready to buy."
            />
            <ProductStep
              number="2"
              title="Effortless Discovery"
              description="Browse what's for sale on your street. Filter by category, save your favorites, and chat directly with sellers."
            />
            <ProductStep
              number="3"
              title="Estate & Local Events"
              description="Stay in the know. From birthday parties to estate clean-ups, see what's happening and join in."
            />
          </div>
        </div>
      </section>

      {/* Community Pulse Newsletter */}
      <section className="py-16 lg:py-20 bg-[#82DB7E]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#82DB7E] text-background mb-4">
              <Mail size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-jersey text-foreground">
              Join Our Community Pulse
            </h2>
            <p className="text-lg text-muted-foreground font-worksans max-w-2xl mx-auto">
              Get weekly updates on what's happening in Lagos estates. No spam. Just community trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-border font-worksans"
              />
              <Button className="bg-[#82DB7E] hover:bg-[#82DB7E]/90 text-background font-raleway font-semibold px-8">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-worksans">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-jersey text-foreground mb-4">
              Questions? We Got You
            </h2>
            <p className="text-lg text-muted-foreground font-worksans">
              Everything you need to know about Yrdly
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="font-raleway font-semibold text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-worksans leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default YrdlyHomepage;
