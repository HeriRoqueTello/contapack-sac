import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const MetricCard = ({ title, value, change, positive }) => {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div
            className={`flex items-center text-sm font-medium ${
              positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {positive ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
