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


export interface DashboardProps {
  onNavItemClick?: (index: number) => void;
  onFilterClick?: (index: number) => void;
  onCardClick?: (index: number) => void;
  onLogout?: () => void;
  onDownload?: () => void;
}

export interface CampaignData {
  id: string;
  name: string;
  status: 'Running' | 'Completed' | 'Error';
  violationCount: number;
}

export interface TableHeaderProps {
  label: string;
  sortable?: boolean;
}

export interface StatusChipProps {
  status: CampaignData['status'];
}

export interface DownloadButtonProps {
  onClick: () => void;
}

export interface TableRowProps {
  campaign: CampaignData;
  onDownload: () => void;
}

export interface Campaign {
  id: string;
  name: string;
  controlId: string;
  connectionId: string;
}


export interface AddCampaignProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: Campaign) => void;
}

export interface Control {
  id: string;
  name: string;
}

export interface Connection {
  id: string;
  name: string;
}