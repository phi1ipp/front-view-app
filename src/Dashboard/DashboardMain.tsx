import React, { useState, useCallback } from 'react';
import styles from './Dashboard.module.css';
import { SideNav } from './SideNav.tsx';
import { MainContent } from './MainContent.tsx';
import { DashboardProps, NavSection } from './types';

export const DashboardMain: React.FC<DashboardProps> = ({
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
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/236b16b5d9861487b8a0b997b9084e9eac6b79a95ae8c3fd0f363249f853c4b2?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", label: "Dashboard", isActive: activeNavIndex === 0, onClick: () => handleNavClick(0) },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/141ef2131f6462761fba4501c53c5acecf70dcbbbeae1e337b4997f4f892a2d9?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", label: "Campaigns", isActive: activeNavIndex === 1, onClick: () => handleNavClick(1) },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d0d3bff899b4577ba9afd46a89a6e6f367fd75ac402790a7e96894a0396354a8?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", label: "Analytics", isActive: activeNavIndex === 2, onClick: () => handleNavClick(2) }
      ]
    },
    {
      title: "Admin",
      items: [
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/20902a2e29f7d52acabc25038ef1425a9d4b51d856e2913560c64206998ed00f?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", label: "Users", isActive: activeNavIndex === 3, onClick: () => handleNavClick(3) },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/31326b10d8a6ec1af684b53d078d39ca41828dc118db6193d010b4e4d22831cf?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", label: "Connections", isActive: activeNavIndex === 4, onClick: () => handleNavClick(4) },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/813385be1bd57c8f371929935474362eecc2463f42aee9ac7e574c235cdb32fe?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", label: "Controls", isActive: activeNavIndex === 5, onClick: () => handleNavClick(5) },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c24f73804564e9b0e8a0ed7adec2a501e81b55ae078ee96424b880529811675?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", label: "Entitlements", isActive: activeNavIndex === 6, onClick: () => handleNavClick(6) },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/613727d45492e301016a9392111f47d74010037eed80a53298fdf33b3ad2c833?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", label: "Settings", isActive: activeNavIndex === 7, onClick: () => handleNavClick(7) }
      ]
    }
  ];

  const filterChips = [
    { label: "", isActive: activeFilterIndex === 0, onClick: () => handleFilterClick(0) },
    { label: "", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/22cf047b892edfb1a6ab3981480b8f929197261946eb8758ab075c7569b01a31?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740", isActive: activeFilterIndex === 1, onClick: () => handleFilterClick(1) },
    { label: "", isActive: activeFilterIndex === 2, onClick: () => handleFilterClick(2) },
    { label: "", isActive: activeFilterIndex === 3, onClick: () => handleFilterClick(3) },
    { label: "", isActive: activeFilterIndex === 4, onClick: () => handleFilterClick(4) }
  ];

  const cards = Array(21).fill(null).map((_, index) => ({
    image: `http://b.io/ext_${13 + (index % 7)}-`,
    title: "",
    date: index === 0 ? "Updated today" : 
          index === 1 ? "Updated yesterday" : 
          "Updated 2 days ago",
    onClick: () => onCardClick?.(index)
  }));

  return (
    <div className={styles.page}>
      <SideNav
        logo="https://cdn.builder.io/api/v1/image/assets/TEMP/372bc690f69db00839e7021bbe33cfc171e1f57239950891962bbcdd50ac540f?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
        sections={navSections}
        userInfo={{
          name: "Thomas Raymond",
          initial: "T",
          role: "admin"
        }}
        onLogout={onLogout}
      />
      <MainContent></MainContent>
       
    </div>
  );
};