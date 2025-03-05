"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface UnauthorizedCardProps {
  message?: string;
  onSignin?: () => void;
}

const UnauthorizedCard: React.FC<UnauthorizedCardProps> = ({
  message = "You do not have access to this page.",
  onSignin,
}) => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardBody className="flex flex-col items-center gap-4 py-8">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-bold text-red-600">Unauthorized Access</h2>
          <p className="text-gray-600 text-center">{message}</p>
          <Button color="primary" className="mt-2" onPress={onSignin}>
            Go to Sign In
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UnauthorizedCard;
