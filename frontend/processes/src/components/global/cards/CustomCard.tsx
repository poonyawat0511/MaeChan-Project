import { Card, CardHeader, CardBody } from "@heroui/react";
import React from "react";


interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const CustomCard: React.FC<CardProps> = ({ title, children, className = "" }) => (
  <Card className={`shadow-sm border border-gray-100 ${className}`}>
    <CardHeader>
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    </CardHeader>
    <CardBody>{children}</CardBody>
  </Card>
);

export default CustomCard;
