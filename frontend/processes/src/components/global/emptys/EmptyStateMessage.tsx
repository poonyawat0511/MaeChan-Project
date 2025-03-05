import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";


interface EmptyStateMessageProps {
  message?: string;
  subMessage?: string;
  onClearFilters?: () => void;
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({
  message = "No matching requests found",
  subMessage = "Try adjusting your search criteria or refresh the page",
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center px-4">
      <ExclamationCircleIcon className="h-12 w-12 text-gray-300 mb-2" />
      <p className="text-gray-500 font-medium">{message}</p>
      <p className="text-gray-400 text-sm mt-1">{subMessage}</p>
      {onClearFilters && (
        <Button
          size="sm"
          variant="flat"
          color="primary"
          className="mt-4"
          onPress={onClearFilters}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
};

export default EmptyStateMessage;
