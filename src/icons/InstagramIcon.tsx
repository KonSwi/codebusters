import * as React from 'react'
import Svg from '@/assets/icons/instagram.svg'

type Props = React.ComponentProps<typeof Svg> & { size?: number }
export function InstagramIcon({ size = 18, ...props }: Props) {
  return <Svg width={size} height={size} {...props} />
}
