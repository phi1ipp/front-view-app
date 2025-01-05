import React, { useState, useCallback } from 'react';
import styles from './Dashboard.module.css';
import { SideNav } from './SideNav.tsx';
import { MainContent } from './MainContent.tsx';
import { DashboardProps, NavSection } from './types.ts';
import { Campaigns } from '../Campaign/Campaigns.tsx';
import { UserManagement } from '../Users/UserManagement.tsx';
import Analytics from './img/Analytics.svg';
import DashboardOff from './img/DashboardOff.svg';
import DashboardOn from './img/DashboardOn.svg';
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
import SettingsOff from './img/SettingsOff.svg';
import SettingsOn from './img/SettingsOn.svg';
import {ConnectionsComponent} from '../Connections/ConnectionsComponent.tsx';
import {ControlsComponent} from '../Controls/ControlsComponent.tsx';
import { CampaignComponent } from '../CampaignComponent/CampaignComponent.tsx';
import { Entitlements } from '../Entitlements/Entitlements.tsx';



const DashboardComponent = () => <div>Dashboard Component</div>;
const CampaignsComponent = () => <div>
<CampaignComponent></CampaignComponent>
</div>;
const AnalyticsComponent = () => <div>Analytics Component</div>;
const UsersComponent = () => <div><UserManagement></UserManagement></div>;
const ConnectionComponent = () => <div><ConnectionsComponent></ConnectionsComponent></div>;
const ControlComponent = () => <div><ControlsComponent></ControlsComponent></div>;
const ExclusionComponent = () => <div>Exclusion Component</div>
const EntitlementsComponent = () => <div><Entitlements></Entitlements></div>;
const SettingsComponent = () => <div>Settings Component</div>;


export const Dashboard: React.FC<DashboardProps> = ({
  onNavItemClick,
  onFilterClick,
  onCardClick,
  onLogout,
  onDownload
}) => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [activeFilterIndex, setActiveFilterIndex] = useState(1);

  const handleNavClick = useCallback((index: number) => {
    setActiveNavIndex(index);
    onNavItemClick?.(index);
  }, [onNavItemClick]);

  const handleFilterClick = useCallback((index: number) => {
    setActiveFilterIndex(index);
    onFilterClick?.(index);
  }, [onFilterClick]);

  const navSections: NavSection[] = [
    {
      items: [
        {icon:activeNavIndex === 0 ?DashboardOn:DashboardOff,label: "Dashboard",isActive: activeNavIndex === 0,onClick: () => handleNavClick(0)},
        { icon:activeNavIndex === 1?CampaignOn:CampaignOff,label: "Campaigns", isActive: activeNavIndex === 1, onClick: () => handleNavClick(1) },
        { icon:Analytics ,label: "Analytics", isActive: activeNavIndex === 2, onClick: () => handleNavClick(2) }
      ]
    },
    {
      title: "Admin",
      items: [
        { icon:  activeNavIndex === 3?UsersOn:UsersOff, label: "Users", isActive: activeNavIndex === 3, onClick: () => handleNavClick(3) },
        { icon: ConnectionsIcon, label: "Connections", isActive: activeNavIndex === 4, onClick: () => handleNavClick(4) },
        { icon:  Controls, label: "Controls", isActive: activeNavIndex === 5, onClick: () => handleNavClick(5) },
        { icon:  activeNavIndex === 6?ExclusionOn:ExclusionOff, label: "Exclusion", isActive: activeNavIndex === 6, onClick: () => handleNavClick(6) },
        { icon:  activeNavIndex === 7?EntitlementsOn:EntitlementsOff, label: "Entitlements", isActive: activeNavIndex === 7, onClick: () => handleNavClick(7) },
        { icon: activeNavIndex === 8?SettingsOn:SettingsOff, label: "Settings", isActive: activeNavIndex === 8, onClick: () => handleNavClick(8) }
      ]
    }
  ];

  const renderMainContent = () => {
    switch (activeNavIndex) {
      case 0:
        return <DashboardComponent />;
      case 1:
        return <CampaignsComponent />;
      case 2:
        return <AnalyticsComponent />;
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
      case 8:
        return <SettingsComponent />;
      default:
        return <div>Select an item from the navigation.</div>;
    }
  };
  const userName = localStorage.getItem("userName")
  return (
    <div className={styles.page}>
      {/* Side Navigation */}
      <SideNav
        logo="https://cdn.builder.io/api/v1/image/assets/TEMP/372bc690f69db00839e7021bbe33cfc171e1f57239950891962bbcdd50ac540f"
        sections={navSections}
        userInfo={{
          name: userName,
          initial: userName?.charAt(0),
          role: 'admin',
        }}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className={styles.mainContent}>{renderMainContent()}</div>
    </div>
  );
};