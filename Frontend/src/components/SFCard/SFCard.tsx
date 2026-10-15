/**
 * SFCard — SignFlow Card Wrapper.
 *
 * Rationale:
 * - Implements SignFlow card elevation specs:
 *   - Resting shadow: 0 1px 2px rgba(15, 23, 42, 0.025)
 *   - Interactive hover shadow: 0 8px 20px rgba(15, 23, 42, 0.08)
 *   - Large border-radius: 14px
 * - Provides standardized document card padding scale ('small' | 'medium' | 'large' | 'none').
 * - Adds 'interactive' flag for clickable workflow document cards.
 * - Preserves Ant Design Card props (title, extra, actions, cover, bordered, loading, etc.).
 */
import React from 'react'
import { Card as AntdCard, type CardProps as AntdCardProps } from 'antd'
import './SFCard.css'

export type SFCardPadding = 'small' | 'medium' | 'large' | 'none'

export interface SFCardProps extends Omit<AntdCardProps, 'size'> {
  /** Enables hover elevation and pointer cursor */
  interactive?: boolean
  /** Internal body padding scale */
  padding?: SFCardPadding
}

function getPaddingValue(padding: SFCardPadding): number {
  switch (padding) {
    case 'small':
      return 12
    case 'large':
      return 24
    case 'none':
      return 0
    case 'medium':
    default:
      return 16
  }
}

export const SFCard: React.FC<SFCardProps> = ({
  interactive = false,
  padding = 'medium',
  className = '',
  styles,
  children,
  ...rest
}) => {
  const paddingValue = getPaddingValue(padding)

  const cardClasses = [
    'sf-card',
    interactive ? 'sf-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const mergedStyles: AntdCardProps['styles'] =
    typeof styles === 'function'
      ? (info) => {
          const res = styles(info)
          return {
            ...res,
            body: {
              padding: paddingValue,
              ...res?.body,
            },
          }
        }
      : {
          ...styles,
          body: {
            padding: paddingValue,
            ...styles?.body,
          },
        }

  return (
    <AntdCard className={cardClasses} styles={mergedStyles} {...rest}>
      {children}
    </AntdCard>
  )
}
