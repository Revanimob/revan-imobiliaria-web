/**
 * Revan Maintenance Page - JavaScript Interactions
 * Provides dynamic updates and enhanced user experience
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize page features
  initializePageAnimations()
  updateStatusTime()
  setupButtonInteractions()
  trackPageAnalytics()
})

/**
 * Initialize animations on page load
 */
function initializePageAnimations() {
  console.log("[v0] Maintenance page animations initialized")

  // Observe elements for intersection animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
      }
    })
  }, observerOptions)

  // Observe animated elements
  document.querySelectorAll('[class*="slide-in"]').forEach((el) => {
    observer.observe(el)
  })
}

/**
 * Update status time dynamically
 */
function updateStatusTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")

  console.log("[v0] Current time:", `${hours}:${minutes}`)
}

/**
 * Setup interactive button features
 */
function setupButtonInteractions() {
  const whatsappButton = document.querySelector(".whatsapp-button")

  if (whatsappButton) {
    // Track hover state
    whatsappButton.addEventListener("mouseenter", () => {
      console.log("[v0] User hovering over WhatsApp button")
    })

    // Track clicks for analytics
    whatsappButton.addEventListener("click", (e) => {
      console.log("[v0] WhatsApp button clicked - redirecting to contact")
      // Track user engagement
      trackEvent("contact_initiated", {
        method: "whatsapp",
        timestamp: new Date().toISOString(),
      })
    })
  }
}

/**
 * Track page analytics events
 */
function trackPageAnalytics() {
  // Log page view
  console.log("[v0] Maintenance page loaded", {
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent.substring(0, 50),
  })

  // Monitor performance
  window.addEventListener("load", () => {
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      console.log("[v0] Page load time:", `${loadTime}ms`)
    }
  })
}

/**
 * Generic event tracking function
 */
function trackEvent(eventName, data = {}) {
  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...data,
  }

  console.log("[v0] Event tracked:", eventData)

  // You can send this to your analytics service here
  // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(eventData) });
}

/**
 * Add keyboard shortcuts (accessibility feature)
 */
document.addEventListener("keydown", (event) => {
  // Press W to directly open WhatsApp
  if (event.key.toLowerCase() === "w" && event.ctrlKey) {
    event.preventDefault()
    const whatsappButton = document.querySelector(".whatsapp-button")
    if (whatsappButton) {
      whatsappButton.click()
    }
  }
})
