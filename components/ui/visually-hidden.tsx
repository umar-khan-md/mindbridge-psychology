import React from "react";

/**
 * VisuallyHidden — renders content that is visually hidden but
 * accessible to screen readers. Follows the standard clip-rect pattern
 * recommended by WebAIM and the A11Y Project.
 */
export function VisuallyHidden({
  as: Component = "span",
  children,
  ...props
}: {
  as?: React.ElementType;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      {...props}
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
        ...props.style,
      }}
    >
      {children}
    </Component>
  );
}
