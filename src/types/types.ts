export interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  section?: string;
  forAdmins?: boolean;
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
  controls: Controls[]; 
}

export interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign?: Campaign;
  onSubmit: (campaigns: Campaign) => void;
}

export interface CampaignTableProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onStart:(campaign:Campaign)=>void;

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
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onStart:(campaign:Campaign)=>void;
}

//Users
export interface User {
  username: string;
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


export interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  onConfirm: (id: string) => void;
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
  connections: Connection[];
  onEdit: (connection: Connection) => void;
  onDelete: (connectionId: string) => void;
}
export interface TableRowPropsConnection {
  connection: Connection;
  onEdit: (connection: Connection) => void;
  onDelete: (id: string) => void;
}
export interface DeleteModalPropsConnection {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onConfirm: (userId: string) => void;
}

//controls

// Base interface for all controls
export interface GrcControl {
    id: number;
    name: string;
    description: string;
    type: 'SA' | 'SOD';  // Union type for discriminator
}

// Segregation of Authority control
export interface GrcSaControl extends GrcControl {
    type: 'SA';
    id: number;
    entId: number;
    entName: string;
}

// Segregation of Duties control
export interface GrcSodControl extends GrcControl {
    type: 'SOD';
    id: number;
    ent1Id: number;
    ent2Id: number;
    ent1Name: string;
    ent2Name: string;
}

export type Controls = GrcSaControl | GrcSodControl;

// Type guard functions to check control types
export const isSaControl = (control: Controls): control is GrcSaControl => {
    return control.type === 'SA';
};

export const isSodControl = (control: Controls): control is GrcSodControl => {
    return control.type === 'SOD';
};

export interface ControlTableProps {
  controls: Controls[];
  onEdit: ( control: Controls) => void;
  onDelete: (controlId: string) => void;
}

export interface ControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  control: Controls | undefined;
  onSubmit: ( control: Controls) => void;
}

//Entitlements

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

//Exclusion


export interface Exclusion {
  id: string;
  name: string;
  rule: string;
}

export interface ExclusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  exclusion?: Exclusion;
  onSubmit: (exclusion: Exclusion) => void;
}

export interface ExclusionTableProps {
  exclusions: Exclusion[];
  onEdit: (exclusion: Exclusion) => void;
  onDelete: (id: string) => void;
}
export interface ExclusionTableRowProps {
  exclusion: Exclusion;
  onEdit: (exclusion: Exclusion) => void;
  onDelete: (id: string) => void;
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



