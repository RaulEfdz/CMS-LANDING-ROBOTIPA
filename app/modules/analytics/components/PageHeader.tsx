"use client";

import React from 'react';

interface PageHeaderProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  className = "",
  children 
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {children}
    </div>
  );
};

export default PageHeader;