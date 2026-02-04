
import React from 'react';
import { THEME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col items-center transition-colors duration-1000"
      style={{ backgroundColor: THEME.background, color: THEME.text }}
    >
      {/* Scrollable area */}
      <main className="relative w-full max-w-md h-full overflow-y-auto no-scrollbar flex flex-col items-center px-6 pt-12 pb-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
