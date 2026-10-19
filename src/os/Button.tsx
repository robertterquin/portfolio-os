import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './Button.css';

type Variant = 'accent' | 'plain';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({
  variant = 'accent',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return <button type={type} className={`btn btn--${variant} ${className}`} {...props} />;
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant };

/** A link styled as a button. External links open in a new tab. */
export function LinkButton({ variant = 'plain', className = '', href, ...props }: LinkButtonProps) {
  const external = href?.startsWith('http');
  return (
    <a
      href={href}
      className={`btn btn--${variant} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
    />
  );
}
