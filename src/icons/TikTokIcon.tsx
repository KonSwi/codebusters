import * as React from "react";
import Svg from "@/assets/icons/tiktok.svg";

type Props = React.ComponentProps<typeof Svg> & { size?: number };
export function TikTokIcon({ size = 18, ...props }: Props) {
  return <Svg width={size} height={size} {...props} />;
}
