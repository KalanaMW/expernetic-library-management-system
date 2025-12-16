import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Layout = ({ children, showHeader = true, showFooter = true }: LayoutProps) => {
  return (
    <div className="layout">
      {showHeader && <Header />}
      <main className="main-content">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
