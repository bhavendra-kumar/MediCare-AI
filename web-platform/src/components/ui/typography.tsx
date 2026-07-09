import * as React from "react"
import { cn } from "@/lib/utils"

const TypographyH1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1 ref={ref} className={cn("scroll-m-20 text-center text-3xl md:text-4xl font-extrabold tracking-tight text-balance", className)} {...props}>
        {children}
      </h1>
    )
  }
)
TypographyH1.displayName = "TypographyH1"

const TypographyH2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2 ref={ref} className={cn("scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0", className)} {...props}>
        {children}
      </h2>
    )
  }
)
TypographyH2.displayName = "TypographyH2"

const TypographyH3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn("scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight", className)} {...props}>
        {children}
      </h3>
    )
  }
)
TypographyH3.displayName = "TypographyH3"

const TypographyH4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h4 ref={ref} className={cn("scroll-m-20 text-lg md:text-xl font-semibold tracking-tight", className)} {...props}>
        {children}
      </h4>
    )
  }
)
TypographyH4.displayName = "TypographyH4"

const TypographyP = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm md:text-base leading-6 md:leading-7 not-first:mt-6", className)} {...props}>
        {children}
      </p>
    )
  }
)
TypographyP.displayName = "TypographyP"

const TypographyBlockquote = React.forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <blockquote ref={ref} className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props}>
        {children}
      </blockquote>
    )
  }
)
TypographyBlockquote.displayName = "TypographyBlockquote"

const TypographyList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul ref={ref} className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
        {children}
      </ul>
    )
  }
)
TypographyList.displayName = "TypographyList"

const TypographyInlineCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <code ref={ref} className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)} {...props}>
        {children}
      </code>
    )
  }
)
TypographyInlineCode.displayName = "TypographyInlineCode"

const TypographyLead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-lg md:text-xl text-muted-foreground", className)} {...props}>
        {children}
      </p>
    )
  }
)
TypographyLead.displayName = "TypographyLead"

const TypographyLarge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-base md:text-lg font-semibold", className)} {...props}>
        {children}
      </div>
    )
  }
)
TypographyLarge.displayName = "TypographyLarge"

const TypographySmall = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <small ref={ref} className={cn("text-xs md:text-sm leading-none font-medium", className)} {...props}>
        {children}
      </small>
    )
  }
)
TypographySmall.displayName = "TypographySmall"

const TypographyMuted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-xs md:text-sm text-muted-foreground", className)} {...props}>
        {children}
      </p>
    )
  }
)
TypographyMuted.displayName = "TypographyMuted"

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
}
