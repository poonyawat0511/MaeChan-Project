import React from 'react';

interface TabsProps {
  defaultValue: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, onValueChange, children, className }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange(value);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
  React.isValidElement<TabsListProps | TabsTriggerProps | TabsContentProps>(child)
    ? React.cloneElement(child, { activeTab, onTabChange: handleTabChange } as Partial<typeof child.props>)
    : child
)}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => (
  <div className={`flex space-x-4 p-2 bg-gray-800 rounded-lg ${className}`}>{children}</div>
);

export const TabsTrigger: React.FC<TabsTriggerProps & { activeTab?: string; onTabChange?: (value: string) => void }> = ({
  value,
  children,
  activeTab,
  onTabChange,
}) => (
  <button
    className={`px-4 py-2 rounded-md ${
      activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
    }`}
    onClick={() => onTabChange && onTabChange(value)}
  >
    {children}
  </button>
);

export const TabsContent: React.FC<TabsContentProps & { activeTab?: string }> = ({ value, children, activeTab }) => {
  return activeTab === value ? <div className="mt-4">{children}</div> : null;
};
