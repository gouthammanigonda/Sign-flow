import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './index'
import { tokens } from '../tokens'

const TestConsumer: React.FC = () => {
  const {
    themeState,
    themeConfig,
    setPreset,
    setOverride,
    resetTheme,
    exportJSON,
    importJSON,
  } = useTheme()

  const [importError, setImportError] = useState<string | null>(null)

  const handleValidImport = () => {
    const res = importJSON(
      JSON.stringify({
        version: 1,
        name: 'Imported Emerald',
        basePreset: 'light',
        overrides: {
          primary: '#059669',
        },
      }),
    )
    if (!res.success) {
      setImportError(res.error || 'Unknown error')
    }
  }

  const handleInvalidImport = () => {
    const res = importJSON('{ invalid json')
    if (!res.success) {
      setImportError(res.error || 'Failed')
    }
  }

  return (
    <div>
      <div data-testid="preset-display">{themeState.preset}</div>
      <div data-testid="name-display">{themeState.name}</div>
      <div data-testid="color-primary-token">
        {String(themeConfig.token?.colorPrimary)}
      </div>
      <div data-testid="export-json">{exportJSON()}</div>
      {importError && <div data-testid="import-error">{importError}</div>}

      <button onClick={() => setPreset('custom')}>Switch to Custom</button>
      <button onClick={() => setPreset('light')}>Switch to Light</button>
      <button onClick={() => setOverride('primary', '#8B5CF6')}>
        Override Primary
      </button>
      <button onClick={resetTheme}>Reset Theme</button>
      <button onClick={handleValidImport}>Import Valid</button>
      <button onClick={handleInvalidImport}>Import Invalid</button>
    </div>
  )
}

describe('ThemeContext runtime', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides default light theme state', () => {
    render(
      <ThemeProvider persist={false}>
        <TestConsumer />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('preset-display')).toHaveTextContent('light')
    expect(screen.getByTestId('name-display')).toHaveTextContent('SignFlow Light')
    expect(screen.getByTestId('color-primary-token')).toHaveTextContent(
      tokens.color.primary,
    )
  })

  it('updates Ant Design theme config when setting overrides', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider persist={false}>
        <TestConsumer />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Override Primary' }))

    expect(screen.getByTestId('preset-display')).toHaveTextContent('custom')
    expect(screen.getByTestId('color-primary-token')).toHaveTextContent('#8B5CF6')
  })

  it('switches between presets and updates token configuration', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider
        persist={false}
        initialState={{
          preset: 'custom',
          name: 'Custom',
          overrides: { primary: '#EC4899' },
        }}
      >
        <TestConsumer />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('color-primary-token')).toHaveTextContent('#EC4899')

    await user.click(screen.getByRole('button', { name: 'Switch to Light' }))
    expect(screen.getByTestId('preset-display')).toHaveTextContent('light')
    // In light preset, baseline color is used
    expect(screen.getByTestId('color-primary-token')).toHaveTextContent(
      tokens.color.primary,
    )

    await user.click(screen.getByRole('button', { name: 'Switch to Custom' }))
    expect(screen.getByTestId('preset-display')).toHaveTextContent('custom')
    expect(screen.getByTestId('color-primary-token')).toHaveTextContent('#EC4899')
  })

  it('resets theme to default light baseline', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider
        persist={false}
        initialState={{
          preset: 'custom',
          name: 'Custom',
          overrides: { primary: '#EC4899' },
        }}
      >
        <TestConsumer />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Reset Theme' }))

    expect(screen.getByTestId('preset-display')).toHaveTextContent('light')
    expect(screen.getByTestId('name-display')).toHaveTextContent('SignFlow Light')
    expect(screen.getByTestId('color-primary-token')).toHaveTextContent(
      tokens.color.primary,
    )
  })

  it('imports valid JSON and updates the active theme', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider persist={false}>
        <TestConsumer />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Import Valid' }))

    expect(screen.getByTestId('preset-display')).toHaveTextContent('custom')
    expect(screen.getByTestId('name-display')).toHaveTextContent('Imported Emerald')
    expect(screen.getByTestId('color-primary-token')).toHaveTextContent('#059669')
  })

  it('rejects invalid JSON import without altering active theme', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider
        persist={false}
        initialState={{
          preset: 'custom',
          name: 'Preserved Theme',
          overrides: { primary: '#F59E0B' },
        }}
      >
        <TestConsumer />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Import Invalid' }))

    // Error displayed
    expect(screen.getByTestId('import-error')).toBeInTheDocument()
    // State remains completely preserved
    expect(screen.getByTestId('name-display')).toHaveTextContent('Preserved Theme')
    expect(screen.getByTestId('color-primary-token')).toHaveTextContent('#F59E0B')
  })
})
