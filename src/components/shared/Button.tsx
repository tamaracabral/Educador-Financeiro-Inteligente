import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost'
  icon?: LucideIcon
}

const baseClasses =
  'flex cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80'

const variantClasses = {
  primary: 'bg-primary text-primary-foreground font-semibold rounded-xl',
  secondary: 'rounded-3xl border border-border bg-secondary-button',
  ghost: 'rounded-lg text-foreground hover:bg-secondary-button',
}

export function Button({
  children,
  className,
  icon: Icon,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[baseClasses, variantClasses[variant], className]
        .filter(Boolean)
        .join(' ')}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  )
}
