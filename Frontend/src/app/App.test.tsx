/**
 * App smoke test — verifies the foundation shell renders correctly.
 */
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'SignFlow UI Kit' })).toBeInTheDocument()
  })

  it('renders the primary button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'Primary button' })).toBeInTheDocument()
  })

  it('renders the theme toggle button', () => {
    render(<App />)
    expect(
      screen.getByRole('button', { name: /Switch to alternate primary/ }),
    ).toBeInTheDocument()
  })
})
