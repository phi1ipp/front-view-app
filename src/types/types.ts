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
  connections: Connection[];  // Array of Connection objects
}

interface Connection {
  id: string;
  campaignId: string;
  name: string;
  host: string;
  port: number;
  loginId: string;
}


interface ConnectionsTableProps {
  connections: Connection[];
  onEdit: (connection: Connection) => void;
  onDelete: (connectionId: string) => void;
}

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  connection: Connection | undefined;
  onSubmit: (connection: Connection) => void;
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

export interface User {
  id: string;
  loginId: string;
  fullName: string;
  email: string;
}

export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onSubmit: (user: User) => void;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onConfirm: (userId: string) => void;
}

export interface TableHeaderProps {
  label: string;
  sortable?: boolean;
  onSort?: () => void;
}

export interface TableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export interface TableFooterProps {
  totalItems: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}


//Login

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface InputFieldProps {
  label: string;
  value: string;
  icon: string;
  type?: string;
  onChange: (value: string) => void;
  error?: string;
}

export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}