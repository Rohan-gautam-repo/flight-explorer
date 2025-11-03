import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders header brand', () => {
    render(<App />)
    expect(screen.getByText(/Flight Explorer/i)).toBeInTheDocument()
  })
})
