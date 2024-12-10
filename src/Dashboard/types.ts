export interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  section?: string;
}

export interface NavSection {
  title?: string;
  items: NavItemProps[];
}

export interface UserInfo {
  name: string;
  initial: string;
  role: 'admin' | 'user';
}

export interface SideNavProps {
  logo: string;
  sections: NavSection[];
  userInfo: UserInfo;
  onLogout?: () => void;
}

export interface CardProps {
  image: string;
  title: string;
  date: string;
  onClick?: () => void;
}

export interface FilterChipProps {
  label: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface MainContentProps {
  filterChips: FilterChipProps[];
  cards: CardProps[];
  onDownload?: () => void;
}

export interface DashboardProps {
  onNavItemClick?: (index: number) => void;
  onFilterClick?: (index: number) => void;
  onCardClick?: (index: number) => void;
  onLogout?: () => void;
  onDownload?: () => void;
}