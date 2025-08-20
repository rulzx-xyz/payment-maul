import React from 'react';

const ContentPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative p-6 bg-white border border-slate-200 rounded-2xl shadow-xl">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ContentPanel;