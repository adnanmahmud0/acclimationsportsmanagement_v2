import { cn } from "@/lib/utils";

interface GradientHeaderProps {
  children: React.ReactNode;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  size?: 'xl' | 'lg' | 'md' | 'sm';
}

export function GradientHeader({ 
  children, 
  tag: Tag = 'h2', 
  className,
  size = 'lg'
}: GradientHeaderProps) {
  const sizeClasses = {
    xl: 'text-5xl md:text-6xl lg:text-8xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
    md: 'text-3xl md:text-4xl lg:text-5xl',
    sm: 'text-xl md:text-2xl',
  };

  return (
    <Tag className={cn(
      "font-serif font-bold leading-[1.1] bg-gradient-to-r from-white to-primary bg-clip-text text-transparent pb-3 inline-block",
      sizeClasses[size],
      className
    )}>
      {children}
    </Tag>
  );
}
