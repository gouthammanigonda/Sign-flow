import React, { useState } from 'react'
import {
  Alert,
  Button,
  Card,
  Input,
  Modal,
  Radio,
  Space,
  Tag,
  Typography,
} from 'antd'
import {
  SUPPORTED_COLOR_OVERRIDE_KEYS,
  useTheme,
  type ColorOverrides,
  type SupportedColorOverrideKey,
} from '../theme'
import { tokens } from '../tokens'

const { Text, Paragraph } = Typography
const { TextArea } = Input

const QUICK_PRESETS: { name: string; overrides: ColorOverrides }[] = [
  {
    name: 'SignFlow Blue',
    overrides: {
      primary: '#2563EB',
      primaryHover: '#1D4ED8',
    },
  },
  {
    name: 'Emerald Workflow',
    overrides: {
      primary: '#059669',
      primaryHover: '#047857',
    },
  },
  {
    name: 'Royal Violet',
    overrides: {
      primary: '#7C3AED',
      primaryHover: '#6D28D9',
    },
  },
  {
    name: 'Amber Slate',
    overrides: {
      primary: '#D97706',
      primaryHover: '#B45309',
    },
  },
]

export const ThemeEditor: React.FC = () => {
  const {
    themeState,
    setPreset,
    setOverride,
    setOverrides,
    resetTheme,
    exportJSON,
    importJSON,
  } = useTheme()

  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [jsonImportText, setJsonImportText] = useState('')
  const [importError, setImportError] = useState<string | null>(null)
  const [importSuccess, setImportSuccess] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleApplyPreset = (preset: (typeof QUICK_PRESETS)[number]) => {
    setOverrides(preset.overrides)
  }

  const handleOpenExport = () => {
    setCopied(false)
    setIsExportModalOpen(true)
  }

  const handleCopyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportJSON())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleApplyImport = () => {
    setImportError(null)
    setImportSuccess(false)

    const result = importJSON(jsonImportText)
    if (result.success) {
      setImportSuccess(true)
      setTimeout(() => {
        setIsImportModalOpen(false)
        setImportSuccess(false)
        setJsonImportText('')
      }, 1200)
    } else {
      setImportError(result.error || 'Failed to import theme.')
    }
  }

  const getEffectiveTokenColor = (key: SupportedColorOverrideKey): string => {
    if (themeState.preset === 'custom' && themeState.overrides[key]) {
      return themeState.overrides[key] as string
    }
    return tokens.color[key]
  }

  return (
    <div className="theme-editor-sticky">
      {/* Preset & Base Status Card */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Live Theme Editor</span>
            <Tag color={themeState.preset === 'light' ? 'blue' : 'purple'}>
              {themeState.preset.toUpperCase()}
            </Tag>
          </div>
        }
        size="small"
      >
        <Space orientation="vertical" size={tokens.spacing.md} style={{ width: '100%' }}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Active Preset:
            </Text>
            <Radio.Group
              value={themeState.preset}
              onChange={(e) => setPreset(e.target.value)}
              buttonStyle="solid"
              style={{ width: '100%' }}
            >
              <Radio.Button value="light" style={{ width: '50%', textAlign: 'center' }}>
                Light (Default)
              </Radio.Button>
              <Radio.Button value="custom" style={{ width: '50%', textAlign: 'center' }}>
                Custom
              </Radio.Button>
            </Radio.Group>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Theme Name: <Text strong>{themeState.name}</Text>
            </Text>
          </div>

          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>
              Quick Color Themes:
            </Text>
            <Space wrap size={[6, 6]}>
              {QUICK_PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  size="small"
                  onClick={() => handleApplyPreset(preset)}
                >
                  {preset.name}
                </Button>
              ))}
            </Space>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <Button size="small" danger onClick={resetTheme} style={{ flex: 1 }}>
              Reset to Baseline
            </Button>
            <Button size="small" onClick={handleOpenExport} style={{ flex: 1 }}>
              Export JSON
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setImportError(null)
                setIsImportModalOpen(true)
              }}
              style={{ flex: 1 }}
            >
              Import JSON
            </Button>
          </div>
        </Space>
      </Card>

      {/* Token Overrides Accordion Card */}
      <Card title="Supported Token Controls" size="small">
        <Space orientation="vertical" size={8} style={{ width: '100%' }}>
          {SUPPORTED_COLOR_OVERRIDE_KEYS.map((key) => {
            const currentColor = getEffectiveTokenColor(key)
            const isOverridden =
              themeState.preset === 'custom' && Boolean(themeState.overrides[key])

            return (
              <div key={key} className="color-token-row">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text strong style={{ fontSize: 13 }}>
                    {key}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    {isOverridden ? 'custom override' : 'baseline'}
                  </Text>
                </div>

                <div className="color-swatch-picker">
                  <input
                    type="color"
                    aria-label={`Color picker for ${key}`}
                    className="color-input-native"
                    value={currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#2563EB'}
                    onChange={(e) => setOverride(key, e.target.value)}
                  />
                  <Input
                    size="small"
                    aria-label={`Hex value for ${key}`}
                    value={currentColor}
                    onChange={(e) => setOverride(key, e.target.value)}
                    style={{ width: 90, fontFamily: 'monospace', fontSize: 12 }}
                  />
                </div>
              </div>
            )
          })}
        </Space>
      </Card>

      {/* Export Modal */}
      <Modal
        title="Export Theme JSON (Version 1)"
        open={isExportModalOpen}
        onOk={() => setIsExportModalOpen(false)}
        onCancel={() => setIsExportModalOpen(false)}
        footer={[
          <Button key="copy" type="primary" onClick={handleCopyExport}>
            {copied ? 'Copied to Clipboard!' : 'Copy JSON'}
          </Button>,
          <Button key="close" onClick={() => setIsExportModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <Paragraph type="secondary" style={{ fontSize: 12 }}>
          Standardized versioned schema containing theme name, base preset, and active
          token overrides.
        </Paragraph>
        <TextArea
          rows={10}
          readOnly
          aria-label="Exported theme JSON content"
          value={exportJSON()}
          style={{ fontFamily: 'monospace', fontSize: 12, backgroundColor: '#F8FAFC' }}
        />
      </Modal>

      {/* Import Modal */}
      <Modal
        title="Import Theme JSON"
        open={isImportModalOpen}
        onCancel={() => setIsImportModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsImportModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="apply"
            type="primary"
            onClick={handleApplyImport}
            disabled={!jsonImportText.trim()}
          >
            Validate & Apply
          </Button>,
        ]}
      >
        <Paragraph type="secondary" style={{ fontSize: 12 }}>
          Paste a versioned Theme JSON v1 object below. Invalid schemas or unknown tokens
          will be safely rejected without affecting the active theme.
        </Paragraph>

        <TextArea
          rows={8}
          aria-label="Theme JSON to import"
          placeholder='{\n  "version": 1,\n  "name": "Custom Theme",\n  "basePreset": "light",\n  "overrides": {\n    "primary": "#059669"\n  }\n}'
          value={jsonImportText}
          onChange={(e) => setJsonImportText(e.target.value)}
          style={{ fontFamily: 'monospace', fontSize: 12, marginBottom: 12 }}
        />

        {importError && (
          <Alert
            type="error"
            title="Import Rejected"
            description={importError}
            showIcon
            style={{ marginBottom: 12 }}
          />
        )}

        {importSuccess && (
          <Alert
            type="success"
            title="Import Accepted"
            description="Theme validated and applied successfully!"
            showIcon
            style={{ marginBottom: 12 }}
          />
        )}

        <div style={{ marginTop: 8 }}>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>
            Quick Sample Templates:
          </Text>
          <Space wrap>
            <Button
              size="small"
              onClick={() =>
                setJsonImportText(
                  JSON.stringify(
                    {
                      version: 1,
                      name: 'Ocean Gradient',
                      basePreset: 'light',
                      overrides: {
                        primary: '#0284C7',
                        primaryHover: '#0369A1',
                        success: '#0D9488',
                      },
                    },
                    null,
                    2,
                  ),
                )
              }
            >
              Valid Sample
            </Button>
            <Button
              size="small"
              danger
              onClick={() =>
                setJsonImportText(
                  JSON.stringify(
                    {
                      version: 99,
                      name: 'Corrupted',
                      basePreset: 'invalid',
                      overrides: { unknownToken: '#123456' },
                    },
                    null,
                    2,
                  ),
                )
              }
            >
              Invalid Sample
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  )
}
