import React from 'react'
import { Tag } from 'antd'
import { ComponentGallery } from './ComponentGallery'
import { ThemeEditor } from './ThemeEditor'
import { useTheme } from '../theme'
import { SFText } from '../components'
import './preview.css'

export const PreviewPage: React.FC = () => {
  const { themeState } = useTheme()

  return (
    <div className="preview-layout">
      {/* Top Navigation Header */}
      <header className="preview-header">
        <div className="preview-header-brand">
          <div className="preview-header-logo">SF</div>
          <div>
            <SFText size="l" weight="bold" tone="default">
              SignFlow UI Kit
            </SFText>
            <span style={{ marginLeft: 8 }}>
              <Tag color={themeState.preset === 'light' ? 'blue' : 'purple'}>
                {themeState.preset.toUpperCase()}
              </Tag>
            </span>
          </div>
        </div>

        <div>
          <SFText size="s" tone="secondary">
            Phase 5: Component Preview & Live Theme Editor
          </SFText>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="preview-body">
        <ComponentGallery />
        <aside className="preview-sidebar">
          <ThemeEditor />
        </aside>
      </div>
    </div>
  )
}
