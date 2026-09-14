import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import './FAQ.css'

const faqs = [
  {
    q: 'Why choose Harron over hiring a full-time senior designer?',
    a: 'A seasoned senior designer commands $130,000+ plus equity and benefits—and you may not always have a 40-hour pipeline every single week. With Harron, you get direct, senior-level output with zero overhead, faster velocity, and total flexibility.',
  },
  {
    q: 'How fast will my website be designed and launched?',
    a: 'Most high-conversion landing page sprints take between 5 to 7 business days. Comprehensive multi-page platforms and design system overhauls generally require 14 to 21 business days.',
  },
  {
    q: 'What technology stack do you design and develop with?',
    a: 'We architect all visual layouts and design systems in Figma. For engineering, we specialize in high-performance Framer builds and custom React web applications with 100/100 Core Web Vitals and frictionless CMS editing.',
  },
  {
    q: 'What if the designs do not meet our initial expectations?',
    a: 'We offer unlimited revisions until you are 100% thrilled with the finished product. We conduct thorough discovery beforehand to ensure our creative trajectory is in lockstep with your brand vision.',
  },
  {
    q: 'How do we collaborate and communicate during the build?',
    a: 'We set up a private Slack Connect channel for real-time questions, paired with asynchronous Loom video walkthroughs for milestone reviews. No endless, unproductive meetings—just relentless progress.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <div className="faq-wrapper">
      <section className="faq-section" id="faq">
        <ScrollReveal>
          <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <div className="section-eyebrow">
                <span>●</span> Clear Answers
              </div>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
          </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggle(index)}>
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">+</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-answer">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </ScrollReveal>
    </section>
  </div>
)
}

export default FAQ
