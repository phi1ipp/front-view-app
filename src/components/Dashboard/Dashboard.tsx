import React, { useState, useCallback } from 'react';
import styles from './Dashboard.module.css';
import { SideNav } from './SideNav.tsx';
import { DashboardProps, NavSection } from './types.ts';
import { UserManagement } from '../Users/UserManagement.tsx';
import CampaignOff from './img/CampaignOff.svg';
import CampaignOn from './img/CampaignOn.svg';
import UsersOff from './img/UsersOff.svg';
import UsersOn from './img/UsersOn.svg';
import ConnectionsIcon from './img/ConnectionsIcon.svg';
import Controls from './img/Controls.svg';
import ExclusionOff from './img/ExclusionOff.svg';
import ExclusionOn from './img/ExclusionOn.svg';
import EntitlementsOff from './img/EntitlementsOff.svg';
import EntitlementsOn from './img/EntitlementsOn.svg';
import {ConnectionsComponent} from '../Connections/ConnectionsComponent.tsx';
import {ControlsComponent} from '../Controls/ControlsComponent.tsx';
import { CampaignComponent } from '../CampaignComponent/CampaignComponent.tsx';
import { Entitlements } from '../Entitlements/Entitlements.tsx';
import { useNavigate } from 'react-router-dom';
import { Exclusions } from '../Exclusions/Exclusions.tsx';



const CampaignsComponent = () => <div>
<CampaignComponent></CampaignComponent>
</div>;
const UsersComponent = () => <div><UserManagement></UserManagement></div>;
const ConnectionComponent = () => <div><ConnectionsComponent></ConnectionsComponent></div>;
const ControlComponent = () => <div><ControlsComponent></ControlsComponent></div>;
const ExclusionComponent = () => <div><Exclusions></Exclusions></div>
const EntitlementsComponent = () => <div><Entitlements></Entitlements></div>;


export const Dashboard: React.FC<DashboardProps> = ({
  onNavItemClick,
  onFilterClick,
  onCardClick,
  onLogout,
  onDownload
}) => {
  const navigate = useNavigate();
  const [activeNavIndex, setActiveNavIndex] = useState(1);

  const handleNavClick = useCallback((index: number) => {
    setActiveNavIndex(index);
    onNavItemClick?.(index);
  }, [onNavItemClick]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    navigate('/'); // Redirect to login
  };

  const navSections: NavSection[] = [
    {
      items: [
        // { icon:activeNavIndex === 0 ? DashboardOn:DashboardOff,label: "Dashboard",isActive: activeNavIndex === 0,onClick: () => handleNavClick(0)},
        { icon:activeNavIndex === 1 ? CampaignOn:CampaignOff,label: "Campaigns", isActive: activeNavIndex === 1, onClick: () => handleNavClick(1) },
        // { icon:Analytics ,label: "Analytics", isActive: activeNavIndex === 2, onClick: () => handleNavClick(2) }
      ]
    },
    {
      title: "Admin",
      items: [
        { icon:  activeNavIndex === 3?UsersOn:UsersOff, label: "Users", isActive: activeNavIndex === 3, forAdmins: true, onClick: () => handleNavClick(3) },
        { icon: ConnectionsIcon, label: "Connections", isActive: activeNavIndex === 4, forAdmins: true, onClick: () => handleNavClick(4) },
        { icon:  Controls, label: "Controls", isActive: activeNavIndex === 5, forAdmins: true, onClick: () => handleNavClick(5) },
        { icon:  activeNavIndex === 6?ExclusionOn:ExclusionOff, label: "Exclusion", isActive: activeNavIndex === 6, forAdmins: true, onClick: () => handleNavClick(6) },
        { icon:  activeNavIndex === 7?EntitlementsOn:EntitlementsOff, label: "Entitlements", isActive: activeNavIndex === 7, forAdmins: true, onClick: () => handleNavClick(7) },
        // { icon: activeNavIndex === 8?SettingsOn:SettingsOff, label: "Settings", isActive: activeNavIndex === 8, forAdmins: true, onClick: () => handleNavClick(8) }
      ]
    }
  ];

  const renderMainContent = () => {
    switch (activeNavIndex) {
      // case 0:
      //   return <DashboardComponent />;
      case 1:
        return <CampaignsComponent />;
      // case 2:
      //   return <AnalyticsComponent />;
      case 3:
        return <UsersComponent />;
      case 4:
        return <ConnectionComponent />;
      case 5:
        return <ControlComponent />;
      case 6:
        return <ExclusionComponent />;
      case 7:
        return <EntitlementsComponent />;
      // case 8:
      //   return <SettingsComponent />;
      default:
        return <div>Select an item from the navigation.</div>;
    }
  };
  const userName = localStorage.getItem("userName")
  const userIsAdmin = localStorage.getItem('isAdmin') === 'true';
  return (
    <div className={styles.page}>
      <div>
        {/* Side Navigation */}
        <SideNav
          logo="https://logo.stocklight.com/NASDAQ/POWL.png"
          sections={navSections}
          userInfo={{
            name: userName,
            initial: userName?.charAt(0),
            role: userIsAdmin ? 'admin' : 'user',
          }}
          onLogout={handleLogout}
        />
        </div>
      {/* Main Content */}
      <div className={styles.mainContent}>{renderMainContent()}</div>
    </div>
  );
};