"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                primary:
                    "bg-emerald text-white shadow-lg shadow-emerald/20 hover:bg-emerald-light hover:shadow-emerald/40",
                secondary:
                    "bg-navy-dark text-white shadow-lg shadow-navy-dark/20 hover:bg-navy-mid hover:shadow-navy-dark/40",
                teal:
                    "bg-emerald text-white shadow-lg shadow-emerald/20 hover:bg-emerald-light hover:shadow-emerald/40",
                outline:
                    "border border-navy-mid bg-transparent text-navy-dark hover:bg-soft-gray hover:text-emerald",
                ghost: "bg-transparent text-navy-dark hover:bg-soft-gray hover:text-emerald",
                link: "text-emerald underline-offset-4 hover:underline",
                gradient: "bg-gradient-to-r from-emerald to-emerald-light text-white shadow-lg shadow-emerald/20 hover:shadow-emerald/40",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 text-xs",
                lg: "h-14 px-10 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
