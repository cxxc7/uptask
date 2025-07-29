import * as React from "react";
import { cva } from "class-variance-authority";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent",
        secondary: "border-transparent",
        destructive: "border-transparent",
        outline: "border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "secondary", "destructive", "outline"]),
  children: PropTypes.node.isRequired,
};

export { Badge, badgeVariants };
