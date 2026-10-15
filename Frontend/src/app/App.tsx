/**
 * SignFlow UI Kit — Main App Entry.
 *
 * Renders the custom React Component Gallery and Live Theme Editor within
 * the ThemeProvider context.
 */
import { ThemeProvider } from '../theme'
import { PreviewPage } from '../preview'

export default function App() {
  return (
    <ThemeProvider>
      <PreviewPage />
    </ThemeProvider>
  )
}
