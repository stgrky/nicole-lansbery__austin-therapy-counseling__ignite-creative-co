import { type HTMLAttributes } from "react";

export function Container({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
