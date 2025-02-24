import React, { createContext, useContext, useState } from "react";

interface SelectContextProps {
  value: string;
  onChange: (value: string) => void;
}

const SelectContext = createContext<SelectContextProps | null>(null);

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {
  const [internalValue, setInternalValue] = useState(value || "");

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <SelectContext.Provider value={{ value: internalValue, onChange: handleChange }}>
      <div className="relative w-64">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger: React.FC = () => {
  return (
    <button className="w-full p-2 border rounded-md text-left bg-white">
      <SelectValue />
    </button>
  );
};

export const SelectValue: React.FC = () => {
  const context = useContext(SelectContext);
  if (!context) throw new Error("SelectValue must be used within a Select");

  return <span>{context.value || "Select an option"}</span>;
};

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg">
      {children}
    </div>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error("SelectItem must be used within a Select");

  return (
    <div
      onClick={() => context.onChange(value)}
      className="p-2 cursor-pointer hover:bg-gray-100"
    >
      {children}
    </div>
  );
};
