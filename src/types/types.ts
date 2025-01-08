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



//Campaign

export interface Campaign {
  id: string;
  name: string;
  status:String;
  violationCount:string;
  connectionId: string;
  controls: Connection[]; 
}

export interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaigns: Campaign) => void;
}

export interface CampaignTableProps {
  campaigns: Campaign[];
}

export interface StatusChipProps {
  status: Campaign['status'];
}

export interface DownloadButtonProps {
  onClick: () => void;
}

export interface TableRowProps {
  campaign: Campaign;
  onDownload: () => void;
}

//Users
export interface User {
  id: string;
  enabled: string;
  fullName: string;
  email: string;
  password: string;
}

export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onSubmit: (user: User) => void;
}

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}


export interface TableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

//connections
export interface Connection {
  length: any;
  id: bigint;
  name: string;
  host: string;
  port: string;
  db:String;
  user: string;
  password:string;
}

export interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  connection?: Connection;
  onSubmit: (connection: Connection) => void;
}
export interface ConnectionsTableProps {
  connections: Connection;
  onEdit: (connection: Connection) => void;
  onDelete: (connectionId: string) => void;
}




























interface Controls {
  id: string;
  name: string;
  ent1Id:bigint;
  ent1Name: string;
  ent2Id:bigint;
  ent2Name: string;

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













export interface Entitlement {
  id: string;
  name: string;
  accessSet: AccessList[];
}

export interface AccessList{
id: string;
name: string;
}

export interface EntitlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  entitlement?: Entitlement;
  onSubmit: (entitlement: Entitlement) => void;
}

export interface EntitlementTableProps {
  entitlements: Entitlement[];
  onEdit: (entitlement: Entitlement) => void;
  onDelete: (entitlementId: string) => void;
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



export interface TableFooterProps {
  totalItems: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}


export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export interface InputFieldProps {
  label: string;
  value: string;
  icon: string;
  type?: string;
  onChange: (value: string) => void;
}

export interface TableHeaderProps {
  label: string;
  sortable?: boolean;
}


