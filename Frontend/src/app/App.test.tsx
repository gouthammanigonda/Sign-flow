/**
 * App smoke & integration tests for PreviewPage shell.
 */
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Preview Page Integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the SignFlow UI Kit header', () => {
    render(<App />)
    expect(screen.getByText('SignFlow UI Kit')).toBeInTheDocument()
    expect(screen.getByText('Component Gallery')).toBeInTheDocument()
    expect(screen.getByText('Live Theme Editor')).toBeInTheDocument()
  })

  it('renders wrapper sections in the gallery', () => {
    render(<App />)
    expect(screen.getByText('SFButton (SignFlow Wrapper)')).toBeInTheDocument()
    expect(screen.getByText('SFText (SignFlow Wrapper)')).toBeInTheDocument()
    expect(screen.getByText('SFCard (SignFlow Wrapper)')).toBeInTheDocument()
    expect(screen.getByText('Native Ant Design Components (Theme Verified)')).toBeInTheDocument()
  })
})
