import { Card, CardContent } from "@/components/ui/card";
import { FileX } from "lucide-react";

const EmptyState = ({ message = "No hay datos disponibles" }) => {
  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <FileX className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">Sin datos</h3>
        <p className="text-gray-600 text-center max-w-sm">{message}</p>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
