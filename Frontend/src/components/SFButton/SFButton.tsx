/**
 * SFButton — SignFlow Button Wrapper.
 *
 * Rationale:
 * - Maps SignFlow design system variants ('primary', 'secondary', 'subtle', 'danger', 'text')
 *   to Ant Design Button primitives.
 * - Normalizes size vocabulary to ('small' | 'medium' | 'large') mapped to Ant Design ('small' | 'middle' | 'large').
 * - Implements SignFlow document-workflow "subtle" button variant using token values.
 * - Preserves Ant Design Button keyboard navigation, focus ring, loading, and ARIA attributes.
 */
import React from 'react'
import { Button as AntdButton, type ButtonProps as AntdButtonProps } from 'antd'
import './SFButton.css'

export type SFButtonVariant = 'primary' | 'secondary' | 'subtle' | 'danger' | 'text'
export type SFButtonSize = 'small' | 'medium' | 'large'

export interface SFButtonProps
  extends Omit<AntdButtonProps, 'type' | 'size' | 'danger' | 'variant'> {
  /** SignFlow button visual variant */
  variant?: SFButtonVariant
  /** SignFlow button size scale */
  size?: SFButtonSize
}

function mapSizeToAntd(size: SFButtonSize): AntdButtonProps['size'] {
  switch (size) {
    case 'small':
      return 'small'
    case 'large':
      return 'large'
    case 'medium':
    default:
      return 'middle'
  }
}

export const SFButton: React.FC<SFButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...rest
}) => {
  const antdSize = mapSizeToAntd(size)

  let antdType: AntdButtonProps['type']
  let isDanger = false
  let customClass = ''

  switch (variant) {
    case 'primary':
      antdType = 'primary'
      break
    case 'danger':
      antdType = 'primary'
      isDanger = true
      break
    case 'subtle':
      antdType = 'default'
      customClass = 'sf-button--subtle'
      break
    case 'text':
      antdType = 'text'
      break
    case 'secondary':
    default:
      antdType = 'default'
      break
  }

  const combinedClass = [customClass, className].filter(Boolean).join(' ')

  return (
    <AntdButton
      type={antdType}
      size={antdSize}
      danger={isDanger}
      className={combinedClass || undefined}
      {...rest}
    >
      {children}
    </AntdButton>
  )
}
