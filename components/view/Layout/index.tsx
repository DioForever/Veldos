import { ReactNode } from 'react';
import Navbar from '../../functions/Navbar';
import "../Layout/Layout.module.css"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="Layout">
      <Navbar></Navbar>
      {children}
    </div>
  );
}
