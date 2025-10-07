"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Rocket, LogIn, UserPlus, Search, Layers, Users, Target, Award, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Structured Learning Paths",
      description: "Follow a clear, phased approach from foundational knowledge to advanced application.",
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Real-World Deliverables",
      description: "Explore real-world problems and learn the tools required to solve them simultaneously through self-directed learning.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Expert-Led Orchestration",
      description: "Receive guidance and feedback from experienced orchestrators at every stage.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Performance Scoring",
      description: "Track your progress and skill development through a comprehensive scoring system.",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Submit Your Enrollment Request",
      description: "Start by filling out the enrollment form with your details. Our team will review your application.",
    },
    {
      step: 2,
      title: "Complete Onboarding",
      description: "Once approved, you\'ll go through our onboarding process to get familiar with the program and tools.",
    },
    {
      step: 3,
      title: "Engage in Program Phases",
      description: "Dive into the 4-phase program, complete deliverables, and collaborate with your peers and orchestrators.",
    },
    {
      step: 4,
      title: "Achieve ZEROS Graduate Status",
      description: "After successful completion, you will move on to the next phase of training on accounts.",
    },
  ];

  const faqItems = [
    {
      question: "What is the ZEROS Program?",
      answer: "The ZEROS Program is a high-efficiency digital product designed to develop elite problem-solving skills through a structured, four-phase curriculum with 16 key deliverables.",
    },
    {
      question: "Who is this program for?",
      answer: "This program is designed for individuals with high intent who are deeply interested in and comfortable with self-directed learning. It's for those who prefer to learn at their own pace and take ownership of their skill development.",
    },
    {
      question: "What are the prerequisites for enrollment?",
      answer: "There are no strict prerequisites in terms of academic background, but a strong sense of curiosity, a commitment to rigorous work, and a passion for problem-solving are essential for success.",
    },
    {
      question: "How long does the program take to complete?",
      answer: "The program is self-paced but follows a structured timeline. Most participants complete the program within 3 months, depending on their individual pace and commitment.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-sm border-b shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center justify-center gap-2">
            <img src="/mu-sigma-logo.png" alt="Mu Sigma" width={100} height={32} />
            <span className="text-lg font-bold tracking-tighter">ZEROS Launchpad</span>
          </Link>
          <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
            <Link href="#features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="ghost">How It Works</Button>
            </Link>
            <Link href="/playbook">
              <Button variant="ghost">Playbook</Button>
            </Link>
            <Link href="/onboarding/track">
              <Button variant="ghost">
                <Search className="mr-2 h-4 w-4" /> Track Status
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
            <Link href="/onboarding/request">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Request Enrollment
              </Button>
            </Link>
          </nav>
           <div className="ml-auto md:hidden">
            <Link href="/login">
                <Button>Login</Button>
            </Link>
           </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-20 pb-24 md:pt-32 md:pb-40 text-center fade-in-up" style={{background: "radial-gradient(ellipse at bottom, hsl(var(--primary)/0.1), transparent 60%)"}}>
          <div className="container px-4 md:px-6 z-10 relative">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
                Master the Art of Problem Solving
              </h1>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-6">
                The ZEROS Program is a high-efficiency digital product for building elite, real-world problem-solving skills through a systematic and rigorous curriculum.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link href="/onboarding/request">
                  <Button size="lg" className="h-12 text-lg">
                    Request for Enrollment
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/playbook">
                  <Button size="lg" variant="outline" className="h-12 text-lg">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore the Playbook
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Program Pillars</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">A curriculum built on four pillars for comprehensive skill development.</p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-2">
                  <div className="flex justify-center items-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Journey to Mastery</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">A simple, four-step process from applicant to graduate.</p>
            </div>
            {/* Desktop Timeline */}
            <div className="relative mt-12 max-w-5xl mx-auto hidden md:block">
              <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2"></div>
              {howItWorks.map((item, index) => (
                <div key={index} className="relative grid grid-cols-2 items-center my-8">
                  <div className={`pr-8 text-right ${index % 2 === 1 ? 'invisible' : ''}`}>
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg ring-8 ring-background z-10">
                    {item.step}
                  </div>
                  <div className={`pl-8 ${index % 2 === 0 ? 'invisible' : ''}`}>
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile Timeline */}
            <div className="mt-12 space-y-8 md:hidden">
              {howItWorks.map((item) => (
                <div key={item.step} className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mr-4 shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-16 md:py-24 bg-gray-50">
           <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto mt-12">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                   <AccordionItem value={`item-${index+1}`} key={index}>
                    <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground">
           <div className="container px-4 md:px-6 text-center">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Begin?</h2>
             <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">Take the first step towards mastering problem-solving. Request your enrollment today and unlock your potential.</p>
              <div className="mt-8">
                <Link href="/onboarding/request">
                  <Button size="lg" variant="secondary" className="h-12 text-lg bg-background text-primary hover:bg-background/90">
                    Request for Enrollment
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
           </div>
        </section>
      </main>
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Mu Sigma University ZEROS Program. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
