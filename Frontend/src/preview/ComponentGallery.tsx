import React, { useState } from 'react'
import {
  Alert,
  Badge,
  Checkbox,
  DatePicker,
  Input,
  Progress,
  Radio,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
} from 'antd'
import { SFButton, SFCard, SFText } from '../components'
import { tokens } from '../tokens'

const { Search, TextArea } = Input

const SAMPLE_DOCUMENTS = [
  {
    key: '1',
    title: 'Consulting_Agreement_v3.pdf',
    recipient: 'sarah.connor@acme.corp',
    status: 'Completed',
    date: '2026-10-14',
  },
  {
    key: '2',
    title: 'Series_A_Term_Sheet.pdf',
    recipient: 'alex.vance@blackmesa.org',
    status: 'Pending Signature',
    date: '2026-10-13',
  },
  {
    key: '3',
    title: 'Mutual_NDA_Draft.docx',
    recipient: 'gordon.f@valvelabs.com',
    status: 'In Review',
    date: '2026-10-12',
  },
]

export const ComponentGallery: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all')
  const [switchChecked, setSwitchChecked] = useState(true)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [radioVal, setRadioVal] = useState('option1')

  const documentColumns = [
    {
      title: 'Document Name',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <SFText weight="semibold" tone="default">
          {text}
        </SFText>
      ),
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
      render: (text: string) => (
        <SFText tone="secondary" size="s">
          {text}
        </SFText>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'blue'
        if (status === 'Completed') color = 'green'
        if (status === 'In Review') color = 'orange'
        return <Tag color={color}>{status}</Tag>
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <SFText tone="secondary" size="s">
          {date}
        </SFText>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <SFButton size="small" variant="subtle">
          View
        </SFButton>
      ),
    },
  ]

  return (
    <div className="preview-main">
      {/* Introduction Banner */}
      <SFCard padding="medium">
        <Space orientation="vertical" size={tokens.spacing.sm}>
          <SFText size="xl" weight="bold" tone="default">
            Component Gallery
          </SFText>
          <SFText size="m" tone="secondary">
            Live preview of production SignFlow wrapper components and native Ant Design
            primitives. All components respond instantly to token edits in the Theme Editor.
          </SFText>
        </Space>
      </SFCard>

      {/* 1. SFButton Section */}
      <div className="gallery-section">
        <div className="gallery-section-header">
          <SFText size="l" weight="bold" tone="default">
            SFButton (SignFlow Wrapper)
          </SFText>
          <SFText size="xs" tone="secondary">
            src/components/SFButton
          </SFText>
        </div>

        <SFCard padding="large">
          <Space orientation="vertical" size={tokens.spacing.lg} style={{ width: '100%' }}>
            {/* Variants */}
            <div className="gallery-row">
              <SFText size="s" weight="semibold" tone="secondary">
                Variants (Primary, Secondary, Subtle, Danger, Text)
              </SFText>
              <Space wrap size={tokens.spacing.base}>
                <SFButton variant="primary">Primary Button</SFButton>
                <SFButton variant="secondary">Secondary Button</SFButton>
                <SFButton variant="subtle">Subtle Workflow Button</SFButton>
                <SFButton variant="danger">Danger Button</SFButton>
                <SFButton variant="text">Text Action</SFButton>
              </Space>
            </div>

            {/* Sizes */}
            <div className="gallery-row">
              <SFText size="s" weight="semibold" tone="secondary">
                Size Scale (Small, Medium, Large)
              </SFText>
              <Space wrap size={tokens.spacing.base} style={{ alignItems: 'center' }}>
                <SFButton size="small">Small (32px)</SFButton>
                <SFButton size="medium">Medium Default (40px)</SFButton>
                <SFButton size="large">Large (48px)</SFButton>
              </Space>
            </div>

            {/* States */}
            <div className="gallery-row">
              <SFText size="s" weight="semibold" tone="secondary">
                Interactive States
              </SFText>
              <Space wrap size={tokens.spacing.base}>
                <SFButton loading>Loading State</SFButton>
                <SFButton disabled>Disabled Primary</SFButton>
                <SFButton variant="subtle" disabled>
                  Disabled Subtle
                </SFButton>
              </Space>
            </div>
          </Space>
        </SFCard>
      </div>

      {/* 2. SFText Section */}
      <div className="gallery-section">
        <div className="gallery-section-header">
          <SFText size="l" weight="bold" tone="default">
            SFText (SignFlow Wrapper)
          </SFText>
          <SFText size="xs" tone="secondary">
            src/components/SFText
          </SFText>
        </div>

        <SFCard padding="large">
          <Space orientation="vertical" size={tokens.spacing.lg} style={{ width: '100%' }}>
            {/* Type Scale */}
            <div className="gallery-row">
              <SFText size="s" weight="semibold" tone="secondary">
                Type Scale (xs 12px, s 13px, m 14px, l 20px, xl 30px)
              </SFText>
              <Space orientation="vertical" size={tokens.spacing.xs}>
                <SFText size="xl" weight="bold">
                  Display Heading (xl / 30px)
                </SFText>
                <SFText size="l" weight="semibold">
                  Section Heading (l / 20px)
                </SFText>
                <SFText size="m">
                  Body Regular text with line-height 1.55 (m / 14px)
                </SFText>
                <SFText size="s" weight="semibold">
                  Form Label / Meta text (s / 13px)
                </SFText>
                <SFText size="xs" tone="secondary">
                  Caption / Timestamp text (xs / 12px)
                </SFText>
              </Space>
            </div>

            {/* Semantic Tones */}
            <div className="gallery-row">
              <SFText size="s" weight="semibold" tone="secondary">
                Semantic Color Tones
              </SFText>
              <Space wrap size={tokens.spacing.base}>
                <SFText tone="default" weight="semibold">
                  Default Navy
                </SFText>
                <SFText tone="secondary">Secondary Muted</SFText>
                <SFText tone="primary" weight="semibold">
                  Primary Brand
                </SFText>
                <SFText tone="success" weight="semibold">
                  Success State
                </SFText>
                <SFText tone="warning" weight="semibold">
                  Warning State
                </SFText>
                <SFText tone="danger" weight="semibold">
                  Danger State
                </SFText>
              </Space>
            </div>

            {/* Typography Modifiers */}
            <div className="gallery-row">
              <SFText size="s" weight="semibold" tone="secondary">
                Ant Design Typography Modifiers
              </SFText>
              <Space wrap size={tokens.spacing.base}>
                <SFText code>code_identifier</SFText>
                <SFText mark>Highlighted</SFText>
                <SFText underline>Underlined text</SFText>
                <SFText copyable>Click to copy text</SFText>
              </Space>
            </div>
          </Space>
        </SFCard>
      </div>

      {/* 3. SFCard Section */}
      <div className="gallery-section">
        <div className="gallery-section-header">
          <SFText size="l" weight="bold" tone="default">
            SFCard (SignFlow Wrapper)
          </SFText>
          <SFText size="xs" tone="secondary">
            src/components/SFCard
          </SFText>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <SFCard
            title="Resting Elevation Card"
            extra={
              <SFButton size="small" variant="text">
                More
              </SFButton>
            }
          >
            <SFText size="s" tone="secondary">
              Default card with 0 1px 2px shadow and 14px border radius.
            </SFText>
          </SFCard>

          <SFCard
            interactive
            title="Interactive Hover Card"
            extra={<Badge status="processing" text="Active" />}
          >
            <SFText size="s" tone="secondary">
              Hover over this card to view the 0 8px 20px elevation lift and pointer affordance.
            </SFText>
          </SFCard>
        </div>
      </div>

      {/* 4. Native Ant Design Components (Themed) */}
      <div className="gallery-section">
        <div className="gallery-section-header">
          <SFText size="l" weight="bold" tone="default">
            Native Ant Design Components (Theme Verified)
          </SFText>
          <SFText size="xs" tone="secondary">
            Native antd primitives inheriting ConfigProvider tokens
          </SFText>
        </div>

        {/* Form Controls */}
        <SFCard title="Form Controls & Inputs" padding="large">
          <Space orientation="vertical" size={tokens.spacing.base} style={{ width: '100%' }}>
            <Space wrap size={tokens.spacing.base}>
              <Input
                aria-label="Sample document input"
                placeholder="Standard Input (40px height)"
                style={{ width: 220 }}
              />
              <Search
                aria-label="Search documents"
                placeholder="Search documents..."
                style={{ width: 220 }}
              />
              <Select
                aria-label="Filter documents by status"
                defaultValue="active"
                style={{ width: 140 }}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'archived', label: 'Archived' },
                  { value: 'draft', label: 'Draft' },
                ]}
              />
              <DatePicker aria-label="Select document date" style={{ width: 160 }} />
            </Space>

            <Space wrap size={tokens.spacing.xl} style={{ alignItems: 'center' }}>
              <Space>
                <Switch
                  aria-label="Toggle workflow notifications"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
                <SFText size="s">Workflow Notifications</SFText>
              </Space>

              <Checkbox checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)}>
                <SFText size="s">Require 2FA Signature</SFText>
              </Checkbox>

              <Radio.Group value={radioVal} onChange={(e) => setRadioVal(e.target.value)}>
                <Radio value="option1">Sequential</Radio>
                <Radio value="option2">Parallel</Radio>
              </Radio.Group>
            </Space>

            <TextArea
              rows={2}
              aria-label="Document signature instructions or audit notes"
              placeholder="Document signature instructions or audit notes..."
            />
          </Space>
        </SFCard>

        {/* Feedback & Status */}
        <SFCard title="Feedback, Tags & Progress Indicators" padding="large">
          <Space orientation="vertical" size={tokens.spacing.base} style={{ width: '100%' }}>
            <Space wrap size={tokens.spacing.sm}>
              <Tag color="blue">Primary Blue</Tag>
              <Tag color="green">Success Completed</Tag>
              <Tag color="orange">Warning Review</Tag>
              <Tag color="red">Danger Rejected</Tag>
              <Tag>Neutral Status</Tag>
            </Space>

            <Alert
              type="success"
              title="Workflow Document Signed"
              description="All signature fields have been completed and verified by audit log."
              showIcon
            />

            <div>
              <SFText size="s" tone="secondary" style={{ display: 'block', marginBottom: 4 }}>
                Document Completion Progress (75%)
              </SFText>
              <Progress percent={75} status="active" />
            </div>
          </Space>
        </SFCard>

        {/* Document Workflow Table */}
        <SFCard title="Document Workflow Table" padding="small">
          <Tabs
            activeKey={selectedTab}
            onChange={setSelectedTab}
            items={[
              { key: 'all', label: 'All Documents' },
              { key: 'pending', label: 'Pending Signatures' },
              { key: 'completed', label: 'Completed' },
            ]}
          />
          <Table
            dataSource={SAMPLE_DOCUMENTS}
            columns={documentColumns}
            pagination={false}
            size="small"
          />
        </SFCard>
      </div>
    </div>
  )
}
