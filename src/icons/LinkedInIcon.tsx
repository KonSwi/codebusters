import * as React from 'react'
import Svg from '@/assets/icons/linkedin.svg'

type Props = React.ComponentProps<typeof Svg> & { size?: number }
export function LinkedInIcon({ size = 18, ...props }: Props) {
  return <Svg width={size} height={size} {...props} />
}
