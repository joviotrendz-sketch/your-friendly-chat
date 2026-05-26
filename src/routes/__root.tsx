import * as React from 'react'
import { Link, Outlet, RootRoute } from '@tanstack/react-router'
import { JovioTrendz } from '~/components/JovioTrendz'

function RootComponent() {
  return (
    <div>
      <JovioTrendz />
      <Outlet />
    </div>
  )
}

export const Route = new RootRoute({
  component: RootComponent,
})
