import * as React from "react";
import Svg from "@/assets/icons/github.svg";

type Props = React.ComponentProps<typeof Svg> & { size?: number };
export function GitHubIcon({ size = 18, ...props }: Props) {
  return <Svg width={size} height={size} {...props} />;
}
