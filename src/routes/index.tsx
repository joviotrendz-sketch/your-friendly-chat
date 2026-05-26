import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '~/components/LandingPage'

export const Route = createFileRoute('/')({ 
  head: () => ({ meta: [{ title: 'JovioTrendz - Luxury Redefined' }] }),
  component: () => <LandingPage />
})
