'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Rocket, Mail, ExternalLink } from 'lucide-react'

interface PricingOption {
  id: string
  label: string
  price: number
}

const TECH_STACKS = [
  { id: 'nextjs', label: 'Next.js (Premium)', priceMultiplier: 1.5, icon: Rocket },
  { id: 'wordpress', label: 'WordPress (Budżet)', priceMultiplier: 1.0, icon: Layers },
]

const PAGE_TYPES: PricingOption[] = [
  { id: 'landing', label: 'Landing Page (One Pager)', price: 1500 },
  { id: 'website', label: 'Strona Firmowa (Multi-page)', price: 3000 },
  { id: 'ecommerce', label: 'Sklep Internetowy (E-commerce)', price: 5000 },
  { id: 'webapp', label: 'Aplikacja Webowa (Custom)', price: 8000 },
]

const FEATURES: PricingOption[] = [
  { id: 'cms', label: 'System CMS (Edycja treści)', price: 1000 },
  { id: 'seo', label: 'Zaawansowane SEO', price: 800 },
  { id: 'design', label: 'Indywidualny Design (UI/UX)', price: 1500 },
  { id: 'copywriting', label: 'Copywriting (Treści)', price: 500 },
  { id: 'analytics', label: 'Analityka (GA4/GTM)', price: 300 },
  { id: 'multilang', label: 'Wielojęzyczność', price: 1200 },
]

export function StandardCalculator() {
  const [selectedTech, setSelectedTech] = useState<string>('nextjs')
  const [selectedType, setSelectedType] = useState<string>(PAGE_TYPES[0].id)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [pageCount, setPageCount] = useState<number>(1)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    let price = 0

    // Base price
    const typeOption = PAGE_TYPES.find(t => t.id === selectedType)
    if (typeOption) {
      price += typeOption.price
    }

    // Features
    selectedFeatures.forEach(featId => {
      const feat = FEATURES.find(f => f.id === featId)
      if (feat) {
        price += feat.price
      }
    })

    // Page count logic
    if (selectedType === 'website' || selectedType === 'ecommerce') {
      if (pageCount > 5) {
        price += (pageCount - 5) * 200
      }
    }

    // Tech Multiplier
    const tech = TECH_STACKS.find(t => t.id === selectedTech)
    if (tech) {
      price = Math.round(price * tech.priceMultiplier)
    }

    setTotalPrice(price)
  }, [selectedType, selectedFeatures, pageCount, selectedTech])

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId) ? prev.filter(id => id !== featureId) : [...prev, featureId]
    )
  }

  const handleAction = () => {
    if (selectedTech === 'nextjs') {
      setShowContactForm(true)
    } else {
      window.open('https://wordpress-partner.example.com', '_blank')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/40 border-white/10 backdrop-blur-md text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Standardowy Kalkulator
        </CardTitle>
        <CardDescription className="text-gray-400">
          Wybierz technologię i parametry, aby otrzymać wycenę.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tech Stack Selection */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Technologia</Label>
          <div className="grid grid-cols-2 gap-4">
            {TECH_STACKS.map(tech => (
              <div
                key={tech.id}
                onClick={() => setSelectedTech(tech.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedTech(tech.id)
                  }
                }}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 flex flex-col items-center text-center gap-2
                  ${
                    selectedTech === tech.id
                      ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'border-white/10 hover:border-white/30 bg-black/20'
                  }`}
              >
                <tech.icon
                  className={`w-6 h-6 ${selectedTech === tech.id ? 'text-purple-400' : 'text-gray-400'}`}
                />
                <span className="font-medium">{tech.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Type */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Rodzaj Projektu</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAGE_TYPES.map(type => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedType(type.id)
                  }
                }}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 flex flex-col justify-between
                  ${
                    selectedType === type.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/30 bg-black/20'
                  }`}
              >
                <span className="font-medium">{type.label}</span>
                <span className="text-sm text-gray-400 mt-2">baza: {type.price} PLN</span>
              </div>
            ))}
          </div>
        </div>

        {/* Page Count Slider */}
        {(selectedType === 'website' || selectedType === 'ecommerce') && (
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <Label>Liczba podstron: {pageCount}</Label>
              <span className="text-xs text-gray-400">(Powyżej 5 str. +200 PLN/szt)</span>
            </div>
            <Slider
              value={[pageCount]}
              min={1}
              max={20}
              step={1}
              onValueChange={val => setPageCount(val[0])}
              className="py-4"
            />
          </div>
        )}

        {/* Features */}
        <div className="space-y-3 pt-4">
          <Label className="text-lg font-semibold">Dodatkowe Funkcje</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map(feature => (
              <div
                key={feature.id}
                className="flex items-center space-x-3 p-3 rounded-md border border-white/5 bg-black/20 hover:bg-black/30 transition-colors"
              >
                <Checkbox
                  id={feature.id}
                  checked={selectedFeatures.includes(feature.id)}
                  onCheckedChange={() => toggleFeature(feature.id)}
                  className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={feature.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {feature.label}
                  </label>
                  <p className="text-xs text-gray-500">+ {feature.price} PLN</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form for Next.js */}
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 space-y-4 mt-4">
                <h4 className="font-semibold text-purple-300">Wyślij zapytanie ofertowe</h4>
                <Input placeholder="Twój email" className="bg-black/50 border-white/10" />
                <Input
                  placeholder="Telefon (opcjonalnie)"
                  className="bg-black/50 border-white/10"
                />
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Wyślij zgłoszenie
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-6 gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-400">Szacunkowy koszt</p>
          <motion.div
            key={totalPrice}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-white"
          >
            {totalPrice.toLocaleString()} PLN
          </motion.div>
        </div>

        {!showContactForm && (
          <Button
            onClick={handleAction}
            className={`w-full sm:w-auto text-white border-0 ${
              selectedTech === 'nextjs'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {selectedTech === 'nextjs' ? (
              <>
                <Mail className="w-4 h-4 mr-2" /> Zamów wycenę
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" /> Przejdź do oferty
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
