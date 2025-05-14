"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Shield, Award, Activity } from "lucide-react";
import Image from "next/image";
import MainApp from "@/components/main-app";

export default function HeroPage() {
  const [showApp, setShowApp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (showApp) {
    return <MainApp />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-teal-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                  fill="currentColor"
                />
                <path
                  d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
                  fill="currentColor"
                />
                <path
                  d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                  fill="currentColor"
                />
                <path
                  d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
                  fill="currentColor"
                />
                <path
                  d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
              DentalDiagnose
            </h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-teal-500 font-medium"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-teal-500 font-medium"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-teal-500 font-medium"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-teal-500 font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <button
            onClick={() => setShowApp(true)}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div
            className={`container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                AI-Powered Dental Analysis
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
                  Advanced Orthodontic Diagnosis
                </span>{" "}
                at Your Fingertips
              </h1>
              <p className="text-lg text-gray-600 md:text-xl max-w-lg">
                Upload dental images and get instant AI-powered analysis to
                identify potential issues before they become serious problems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowApp(true)}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium"
                >
                  Try It Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="#how-it-works"
                  className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium"
                >
                  Learn More
                </a>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                    DR
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium">
                    JM
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-xs font-medium text-white">
                    KL
                  </div>
                </div>
                <p>Trusted by 2,000+ dental professionals</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image
                    src="/tooth.jpg"
                    alt="Dental scan visualization"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Analysis Complete</p>
                    <p className="text-xs text-gray-500">98% accuracy rate</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Instant Results</p>
                    <p className="text-xs text-gray-500">Under 5 seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Advanced Features for Precise Diagnosis
              </h2>
              <p className="text-gray-600">
                Our AI-powered platform offers cutting-edge technology to detect
                and analyze orthodontic issues with high accuracy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-white to-teal-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Analysis</h3>
                <p className="text-gray-600">
                  Your dental images are encrypted and processed securely. We
                  never share your data with third parties.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-sky-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6">
                  <Activity className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time Results</h3>
                <p className="text-gray-600">
                  Get instant analysis of your dental images with detailed
                  reports and recommendations.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-cyan-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Validated</h3>
                <p className="text-gray-600">
                  Our AI model is trained and validated by leading orthodontists
                  with decades of experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-br from-teal-500 to-cyan-600 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-teal-100">
                Our platform makes it easy to get professional-grade analysis of
                your dental images in just a few steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload Image",
                  description:
                    "Take a clear photo of your teeth or upload an existing dental X-ray",
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  description:
                    "Our advanced AI model analyzes the image for potential issues",
                },
                {
                  step: "3",
                  title: "Get Results",
                  description:
                    "Receive a comprehensive report with potential conditions and recommendations",
                },
                {
                  step: "4",
                  title: "Consult Professional",
                  description:
                    "Share your results with your dentist for professional confirmation",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl h-full">
                    <div className="w-12 h-12 bg-white text-teal-600 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-teal-100">{item.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-gray-600">
                Hear from dental professionals and patients who use our platform
                for early detection and prevention.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Orthodontist",
                  quote:
                    "This platform has revolutionized my practice. I can now pre-screen patients and prioritize cases more effectively.",
                },
                {
                  name: "Michael Chen",
                  role: "Patient",
                  quote:
                    "I was able to detect a potential issue before my regular checkup. My dentist was impressed with the accuracy!",
                },
                {
                  name: "Dr. Robert Williams",
                  role: "Dental Clinic Director",
                  quote:
                    "We've implemented this technology across our entire practice. It's improved our diagnostic capabilities significantly.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-12 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Transform Your Dental Care?
                </h2>
                <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of dental professionals and patients who trust
                  our AI-powered platform for early detection and prevention.
                </p>
                <button
                  onClick={() => setShowApp(true)}
                  className="bg-white text-teal-600 px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-lg"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">DentalDiagnose</h3>
              </div>
              <p className="text-gray-400">
                Advanced AI-powered dental analysis for early detection and
                prevention of orthodontic issues.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                  >
                    Data Processing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-gray-400 space-y-2">
                <p>123 Dental Avenue</p>
                <p>Dehradun, 248001</p>
                <p>Email: info@dentaldiagnose.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} DentalDiagnose. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
