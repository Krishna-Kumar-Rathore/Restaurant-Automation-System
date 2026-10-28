import React from 'react'
import { FiArrowUpRight, FiGlobe, FiInstagram, FiLinkedin, FiMail, FiMessageCircle, FiPhone } from 'react-icons/fi'

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">
            Freelance work
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Have a project in mind?
          </h2>
          <p className="mt-3 max-w-xl text-gray-400">
            I build thoughtful digital experiences for businesses. Get in touch and let&apos;s
            discuss how I can help bring your idea to life.
          </p>
          <a
            href="mailto:krishnakr2835@gmail.com?subject=Freelance%20project%20enquiry"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Let&apos;s work together
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="md:justify-self-end">
          <h3 className="text-lg font-semibold text-white">Krishna Kumar Rathore</h3>
          <p className="mt-1 text-sm text-gray-400">Available for freelance enquiries</p>

          <div className="mt-5 space-y-3">
            <a
              href="tel:+919039922835"
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <FiPhone aria-hidden="true" className="text-primary-400" />
              <span>+91 90399 22835</span>
            </a>
            <a
              href="https://wa.me/919039922835"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <FiMessageCircle aria-hidden="true" className="text-primary-400" />
              <span>Message me on WhatsApp</span>
              <FiArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="mailto:krishnakr2835@gmail.com"
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <FiMail aria-hidden="true" className="text-primary-400" />
              <span>krishnakr2835@gmail.com</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://cosmic-portfolio-eight.vercel.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Krishna's portfolio"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm transition-colors hover:border-primary-400 hover:text-white"
            >
              <FiGlobe aria-hidden="true" />
              Portfolio
              <FiArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/krishna-kumar-rathore/"
              target="_blank"
              rel="noreferrer"
              aria-label="Connect with Krishna on LinkedIn"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm transition-colors hover:border-primary-400 hover:text-white"
            >
              <FiLinkedin aria-hidden="true" />
              LinkedIn
              <FiArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/krishna_rathore2835/?__pwa=1#"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Krishna on Instagram"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm transition-colors hover:border-primary-400 hover:text-white"
            >
              <FiInstagram aria-hidden="true" />
              Instagram
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Krishna Kumar Rathore. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export default Footer
