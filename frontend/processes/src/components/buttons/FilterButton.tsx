import React from "react";

import { LucideIcon } from "lucide-react";
import { Button } from "@heroui/react";

interface FilterButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  icon,
  label,
  onClick,
  isActive,
}) => {
  const Icon = icon;
  return (
    <Button
      onPress={onClick}
      variant={isActive ? "solid" : "bordered"}
      className="flex items-center gap-2 text-sm"
    >
      <Icon size={16} />
      <span>{label}</span>
    </Button>
  );
};

export default FilterButton;
