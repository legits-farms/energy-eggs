// Live rates from the EEdashboard backend. The static data in ../data/rates
// renders instantly as a fallback; once the API responds, the published rates
// replace it — so edits made in the dashboard's Rate Cards module show up here.
import { useEffect, useState } from 'react'
import {
  BIRD_RATE_CARDS,
  BIRD_RATE_NOTES,
  EGG_RATES,
  PROCESSING_CHARGES,
  type BirdRateRow,
} from '../data/rates'

const API_URL: string = import.meta.env.VITE_EE_API_URL || 'https://ee-dashboard-server.vercel.app'

type ApiRateCard = {
  key: string
  kind: string
  name: string
  meta: { perKg?: string; columns?: string[]; notes?: string[] }
  rows: (string | number)[][]
  sortOrder: number
}

export type LiveRates = {
  birdCards: { name: string; perKg: string; rows: BirdRateRow[] }[]
  birdNotes: string[]
  eggRates: [string, string, string, string, string?][]
  processing: [string, string, string][]
}

const FALLBACK: LiveRates = {
  birdCards: BIRD_RATE_CARDS,
  birdNotes: BIRD_RATE_NOTES,
  eggRates: EGG_RATES,
  processing: PROCESSING_CHARGES,
}

let cached: LiveRates | null = null

function mapCards(cards: ApiRateCard[]): LiveRates {
  const birds = cards
    .filter((c) => c.kind === 'birds' && Array.isArray(c.rows) && c.rows.length)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      name: c.name,
      perKg: c.meta?.perKg ?? '',
      rows: c.rows as BirdRateRow[],
    }))
  const eggs = cards.find((c) => c.kind === 'eggs')
  const processing = cards.find((c) => c.kind === 'processing')
  const notes = cards.find((c) => c.kind === 'notes')
  return {
    birdCards: birds.length ? birds : FALLBACK.birdCards,
    birdNotes: notes?.rows?.length ? notes.rows.map((r) => String(r[0])) : FALLBACK.birdNotes,
    eggRates: eggs?.rows?.length ? (eggs.rows.map((r) => r.map(String)) as LiveRates['eggRates']) : FALLBACK.eggRates,
    processing: processing?.rows?.length
      ? (processing.rows.map((r) => r.map(String)) as LiveRates['processing'])
      : FALLBACK.processing,
  }
}

export function useLiveRates(): LiveRates {
  const [rates, setRates] = useState<LiveRates>(cached ?? FALLBACK)

  useEffect(() => {
    if (cached) return
    let alive = true
    fetch(`${API_URL}/api/ratecards`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`${res.status}`))))
      .then((cards: ApiRateCard[]) => {
        cached = mapCards(cards)
        if (alive) setRates(cached)
      })
      .catch(() => {}) // keep the static fallback
    return () => {
      alive = false
    }
  }, [])

  return rates
}
