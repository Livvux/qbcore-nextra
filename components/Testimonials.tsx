'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Server Owner',
      server: 'Los Santos RP',
      avatar: '👨‍💼',
      rating: 5,
      text: 'QBCore transformed our server completely. The modular design made it so easy to customize everything to our needs. Our player count has doubled since the switch!',
      highlight: 'Player count doubled',
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      server: 'Liberty City Life',
      avatar: '👩‍💻',
      rating: 5,
      text: 'As a developer, I love how clean and well-documented QBCore is. The API is intuitive and the community support is incredible. Best framework decision we ever made.',
      highlight: 'Clean and well-documented',
    },
    {
      name: 'Marcus Johnson',
      role: 'Community Manager',
      server: 'Vice City Stories',
      avatar: '👨‍🎮',
      rating: 5,
      text: 'The stability and performance improvements were immediate. No more server crashes, and the new features keep our players engaged. QBCore just works.',
      highlight: 'Zero server crashes',
    },
    {
      name: 'Emma Thompson',
      role: 'Script Developer',
      server: 'San Andreas United',
      avatar: '👩‍🔧',
      rating: 5,
      text: 'Migrating from ESX was seamless. The documentation made it easy, and the performance gains were noticeable from day one. Highly recommended!',
      highlight: 'Seamless migration',
    },
    {
      name: 'David Park',
      role: 'Server Admin',
      server: 'Night City RP',
      avatar: '👨‍💼',
      rating: 5,
      text: 'The built-in security features and anti-cheat protection have saved us countless hours. QBCore handles the heavy lifting so we can focus on our community.',
      highlight: 'Built-in security',
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Community Leader',
      server: 'Desert Springs RP',
      avatar: '👩‍🎨',
      rating: 5,
      text: 'Our players love the smooth inventory system and job mechanics. The user experience is so much better now. Thank you QBCore team!',
      highlight: 'Better user experience',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const getVisibleTestimonials = () => {
    const startIndex = currentSlide * 3
    return testimonials.slice(startIndex, startIndex + 3)
  }

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 py-24 dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            What the Community
            <span className="text-gradient block">Says About QBCore</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Don&apos;t just take our word for it. Here&apos;s what server owners, developers, and
            community leaders are saying about their QBCore experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mx-auto max-w-7xl">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={`${currentSlide}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="h-12 w-12 text-blue-500" />
                  </div>

                  {/* Rating */}
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="relative z-10 mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Highlight Badge */}
                  <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    ✨ {testimonial.highlight}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {testimonial.server}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-blue-500/20"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                index === currentSlide
                  ? 'bg-blue-500'
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h3 className="mb-4 text-2xl font-bold">Join These Success Stories</h3>
            <p className="mx-auto mb-6 max-w-2xl text-blue-100">
              Ready to transform your FiveM server? Join thousands of successful servers that have
              made the switch to QBCore.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/docs/installation/windows"
                className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Start Your Success Story
              </a>
              <a
                href="/community"
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-white hover:text-blue-600"
              >
                Join Community
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
