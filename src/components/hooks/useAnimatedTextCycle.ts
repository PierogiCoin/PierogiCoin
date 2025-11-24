"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type TextOptions = readonly string[]

// Custom function to split text into character spans
const splitTextIntoChars = (element: HTMLElement, text: string): HTMLElement[] => {
  element.innerHTML = ""
  const chars: HTMLElement[] = []

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const span = document.createElement("span")
    span.style.display = "inline-block"
    span.style.whiteSpace = char === " " ? "pre" : "normal"
    span.textContent = char
    element.appendChild(span)
    chars.push(span)
  }

  return chars
}

export const useAnimatedTextCycle = (
  textRef: React.RefObject<HTMLSpanElement>,
  options: TextOptions,
  config: { durationPerPhrase?: number; initialDelay?: number } = {},
) => {
  const { durationPerPhrase = 3500, initialDelay = 0 } = config
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element || options.length === 0) return

    gsap.set(element, { opacity: 1 })
    element.textContent = ""

    timeline.current = gsap.timeline({
      repeat: -1,
      delay: initialDelay,
    })

    const phraseAnimationTime = durationPerPhrase / 1000
    const fadeInDuration = 0.8
    const fadeOutDuration = 0.4
    const visibleDuration = phraseAnimationTime - fadeInDuration - fadeOutDuration

    options.forEach((text) => {
      const singlePhraseTl = gsap.timeline()

      singlePhraseTl
        .call(() => {
          const chars = splitTextIntoChars(element, text)
          gsap.set(chars, { yPercent: 100, opacity: 0 })
          gsap.to(chars, {
            yPercent: 0,
            opacity: 1,
            duration: fadeInDuration,
            stagger: 0.05,
            ease: "power2.out",
          })
        })
        .to(element, { duration: Math.max(0.1, visibleDuration) })
        .call(() => {
          const chars = Array.from(element.children) as HTMLElement[]
          gsap.to(chars, {
            yPercent: -100,
            opacity: 0,
            duration: fadeOutDuration,
            stagger: 0.03,
            ease: "power2.in",
          })
        })

      timeline.current?.add(singlePhraseTl)
    })

    return () => {
      timeline.current?.kill()
      if (element) {
        gsap.set(element, { clearProps: "all" })
        element.innerHTML = ""
      }
    }
  }, [options, durationPerPhrase, initialDelay, textRef])
}
