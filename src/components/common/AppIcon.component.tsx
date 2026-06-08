import { Icon, type IconifyIcon } from "@iconify/react";
import type { CSSProperties } from "react";

type AppIconProps = {
  icon: string | IconifyIcon;
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  inline?: boolean;
  ariaLabel?: string;
};

export const AppIcon_component = ({
  icon,
  width = 24,
  height = 24,
  color = "currentColor",
  className,
  style,
  inline = true,
  ariaLabel,
}: AppIconProps) => {
  return (
    <Icon
      icon={icon}
      width={width}
      height={height}
      color={color}
      className={className}
      style={{ display: inline ? "inline-block" : "block", ...style }}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    />
  );
};

export default AppIcon_component;
