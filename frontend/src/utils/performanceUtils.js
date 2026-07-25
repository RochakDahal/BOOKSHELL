// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Memoize function for expensive calculations
export const memoize = (fn) => {
  const cache = {}
  return function(...args) {
    const key = JSON.stringify(args)
    if (cache[key] === undefined) {
      cache[key] = fn.apply(this, args)
    }
    return cache[key]
  }
}

// Lazy load images
export const lazyLoadImage = (imgElement) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
          }
          observer.unobserve(img)
        }
      })
    })
    observer.observe(imgElement)
  } else {
    // Fallback for older browsers
    if (imgElement.dataset.src) {
      imgElement.src = imgElement.dataset.src
      imgElement.removeAttribute('data-src')
    }
  }
}