export interface HeaderProps {
  className?: string;
  showLogo?: boolean;
  showNavigation?: boolean;
  showCtaButton?: boolean;
  onCtaClick?: () => void;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}
