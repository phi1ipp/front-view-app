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
  hostport: string;
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

interface Controls {
  id: string;
  campaignId: string;
  name: string;
  hostport: string;
  loginId: string;
}


interface ControlTableProps {
  controls: Control[];
  onEdit: ( control: Control) => void;
  onDelete: (controlId: string) => void;
}

interface ControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  control: Control | undefined;
  onSubmit: ( control: Control) => void;
}


export interface AddCampaignProps {
  campaign: Campaign[];
}

export interface Control {
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

interface Campaigns {
  id: string;
  name: string;
  status: 'Running' | 'Completed' | 'Error';
  violationCount: number;
}


interface CampaignsTableProps {
  campaigns: Campaigns[];
}

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaigns | undefined;
  onSubmit: (campaigns: Campaigns) => void;
}

//Login

export interface InputFieldProps {
  label: string;
  value: string;
  icon: string;
  type?: string;
  onChange: (value: string) => void;
}

export interface ButtonProps {
  label: string;
  onClick: () => void;
}