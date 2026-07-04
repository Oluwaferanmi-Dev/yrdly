"use client";

import React, { useState } from 'react';
import { Calendar, ShoppingBag, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
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
                <Button size="lg" className="bg-[#82DB7E] hover:bg-[#82DB7E]/90 text-background font-raleway font-bold text-lg px-8">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-border font-raleway font-semibold text-lg">
                  Learn More
                </Button>
              </div>

              <Card className="max-w-md border-border shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-raleway font-bold text-lg">Welcome back!</h3>
                  <p className="text-sm text-muted-foreground">Sign in to see what's happening in your estate</p>
                  <Button variant="outline" className="w-full border-border font-raleway font-medium">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>
                </CardContent>
              </Card>
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
