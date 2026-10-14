/**
 * App shell — Phase 2 proof of concept.
 *
 * Demonstrates that changing a canonical token (primary color) updates a
 * native Ant Design Button through ConfigProvider / the theme adapter.
 * No custom inline styles are used; the color change flows purely through
 * the Ant Design token system.
 */
import { useState } from 'react'
import { Button, ConfigProvider, Space, Typography } from 'antd'
import { buildAntdTheme } from '../theme/adapter'
import { tokens } from '../tokens'
import './App.css'

const { Title, Paragraph, Text } = Typography

export default function App() {
  // Toggle between the spec primary color and an alternate to prove the
  // theme pipeline is real (not hardcoded inline styles).
  const [useAlt, setUseAlt] = useState(false)

  const theme = buildAntdTheme(
    useAlt ? { primary: '#7C3AED', primaryHover: '#6D28D9' } : {},
  )

  return (
    <ConfigProvider theme={theme}>
      <main className="app-shell">
        <Title level={1}>SignFlow UI Kit</Title>

        <Paragraph>
          Phase 2 — canonical tokens wired through the Ant Design theme adapter.
          Switching primary color below updates the native Button via{' '}
          <Text code>ConfigProvider</Text>, not inline styles.
        </Paragraph>

        <Space orientation="vertical" size={tokens.spacing.base}>
          <Space>
            <Button type="primary">Primary button</Button>
            <Button>Default button</Button>
            <Button type="primary" danger>
              Danger button
            </Button>
          </Space>

          <Button
            onClick={() => setUseAlt((v) => !v)}
            style={{ fontFamily: tokens.typography.fontFamily }}
          >
            {useAlt
              ? `Restore SignFlow primary (${tokens.color.primary})`
              : 'Switch to alternate primary (#7C3AED)'}
          </Button>

          <Text type="secondary" style={{ fontSize: tokens.typography.fontSizeCaption }}>
            Current primary token:{' '}
            <Text code>{useAlt ? '#7C3AED' : tokens.color.primary}</Text>
          </Text>
        </Space>
      </main>
    </ConfigProvider>
  )
}
