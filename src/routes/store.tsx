import { createFileRoute } from '@tanstack/react-router'
import { StorePage } from '~/components/StorePage'

export const Route = createFileRoute('/store')({ 
  head: () => ({ meta: [{ title: 'Store - JovioTrendz' }] }),
  component: () => <StorePage />
})
