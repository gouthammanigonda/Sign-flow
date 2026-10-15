/**
 * SFText — SignFlow Typography Wrapper.
 *
 * Rationale:
 * - Implements the 5-step SignFlow type scale ('xs' 12px, 's' 13px, 'm' 14px, 'l' 20px, 'xl' 30px).
 * - Implements SignFlow font weight scale ('regular' 400, 'semibold' 600, 'bold' 700).
 * - Implements SignFlow semantic color tones ('default' navy, 'secondary' muted, 'primary' brand, 'success', 'warning', 'danger').
 * - Preserves Ant Design Typography.Text capabilities (copyable, editable, ellipsis, underline, mark, code, etc.).
 */
import React from 'react'
import { Typography } from 'antd'
import type { TextProps as AntdTextProps } from 'antd/es/typography/Text'
import { tokens } from '../../tokens'

export type SFTextSize = 'xs' | 's' | 'm' | 'l' | 'xl'
export type SFTextWeight = 'regular' | 'semibold' | 'bold'
export type SFTextTone = 'default' | 'secondary' | 'primary' | 'success' | 'warning' | 'danger'

export interface SFTextProps extends Omit<AntdTextProps, 'type'> {
  /** SignFlow type size */
  size?: SFTextSize
  /** SignFlow font weight */
  weight?: SFTextWeight
  /** SignFlow semantic text tone */
  tone?: SFTextTone
  /** Whether to render as block element (paragraph/div) */
  block?: boolean
  children?: React.ReactNode
}

function getFontSize(size: SFTextSize): number {
  switch (size) {
    case 'xs':
      return tokens.typography.fontSizeCaption // 12
    case 's':
      return tokens.typography.fontSizeLabel // 13
    case 'l':
      return tokens.typography.fontSizeHeading // 20
    case 'xl':
      return tokens.typography.fontSizeDisplay // 30
    case 'm':
    default:
      return tokens.typography.fontSizeBase // 14
  }
}

function getFontWeight(weight: SFTextWeight): number {
  switch (weight) {
    case 'semibold':
      return tokens.typography.fontWeightSemibold // 600
    case 'bold':
      return tokens.typography.fontWeightBold // 700
    case 'regular':
    default:
      return tokens.typography.fontWeightRegular // 400
  }
}

export const SFText: React.FC<SFTextProps> = ({
  size = 'm',
  weight = 'regular',
  tone = 'default',
  block = false,
  style,
  children,
  ...rest
}) => {
  const fontSize = getFontSize(size)
  const fontWeight = getFontWeight(weight)

  // Map tone: if matching antd's built-in type prop, pass it; otherwise apply color style
  let antdType: AntdTextProps['type'] = undefined
  let customColor: string | undefined = undefined

  switch (tone) {
    case 'secondary':
      antdType = 'secondary'
      break
    case 'success':
      antdType = 'success'
      break
    case 'warning':
      antdType = 'warning'
      break
    case 'danger':
      antdType = 'danger'
      break
    case 'primary':
      customColor = tokens.color.primary
      break
    case 'default':
    default:
      customColor = tokens.color.primaryText
      break
  }

  const computedStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily,
    fontSize,
    fontWeight,
    lineHeight: size === 'm' ? tokens.typography.lineHeightBase : 1.4,
    display: block ? 'block' : 'inline',
    ...(customColor ? { color: customColor } : {}),
    ...style,
  }

  return (
    <Typography.Text type={antdType} style={computedStyle} {...rest}>
      {children}
    </Typography.Text>
  )
}
