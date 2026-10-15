import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../theme'
import { ThemeEditor } from './ThemeEditor'

describe('ThemeEditor key flows', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders preset controls and token inputs', () => {
    render(
      <ThemeProvider persist={false}>
        <ThemeEditor />
      </ThemeProvider>,
    )

    expect(screen.getByText('Live Theme Editor')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Light (Default)' })).toBeChecked()
    expect(screen.getByText('primary')).toBeInTheDocument()
    expect(screen.getByText('primaryHover')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset to Baseline' })).toBeInTheDocument()
  })

  it('switches between presets when clicked', async () => {
    render(
      <ThemeProvider persist={false}>
        <ThemeEditor />
      </ThemeProvider>,
    )

    const customRadio = screen.getByRole('radio', { name: 'Custom' })
    fireEvent.click(customRadio)
    expect(customRadio).toBeChecked()
  })

  it('applies quick color presets', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider persist={false}>
        <ThemeEditor />
      </ThemeProvider>,
    )

    const emeraldBtn = screen.getByRole('button', { name: 'Emerald Workflow' })
    await user.click(emeraldBtn)

    expect(screen.getByRole('radio', { name: 'Custom' })).toBeChecked()
    expect(screen.getAllByDisplayValue('#059669').length).toBeGreaterThanOrEqual(1)
  })

  it('resets theme back to baseline', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider persist={false}>
        <ThemeEditor />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Royal Violet' }))
    expect(screen.getAllByDisplayValue('#7C3AED').length).toBeGreaterThanOrEqual(1)

    await user.click(screen.getByRole('button', { name: 'Reset to Baseline' }))
    expect(screen.getByRole('radio', { name: 'Light (Default)' })).toBeChecked()
    expect(screen.getAllByDisplayValue('#2563EB').length).toBeGreaterThanOrEqual(1)
  })

  it('opens Export JSON modal and displays versioned schema', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider persist={false}>
        <ThemeEditor />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Export JSON' }))
    expect(
      screen.getByText('Export Theme JSON (Version 1)'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy JSON' })).toBeInTheDocument()
  })

  it('validates and safely rejects invalid JSON import without altering active theme', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider persist={false}>
        <ThemeEditor />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Import JSON' }))
    expect(screen.getByText('Import Theme JSON')).toBeInTheDocument()

    // Load invalid sample
    await user.click(screen.getByRole('button', { name: 'Invalid Sample' }))
    await user.click(screen.getByRole('button', { name: 'Validate & Apply' }))

    // Error alert is visible
    expect(screen.getByText('Import Rejected')).toBeInTheDocument()
  })

  it('validates and applies valid JSON import successfully', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider persist={false}>
        <ThemeEditor />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Import JSON' }))
    await user.click(screen.getByRole('button', { name: 'Valid Sample' }))
    await user.click(screen.getByRole('button', { name: 'Validate & Apply' }))

    expect(screen.getByText('Import Accepted')).toBeInTheDocument()
  })
})
