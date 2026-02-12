import * as React from 'react'
import Svg from '@/assets/icons/youtube.svg'

type Props = React.ComponentProps<typeof Svg> & { size?: number }
export function YouTubeIcon({ size = 18, ...props }: Props) {
  return <Svg width={size} height={size} {...props} />
}
