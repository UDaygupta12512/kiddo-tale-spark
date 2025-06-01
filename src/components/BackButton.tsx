
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button 
      onClick={handleBack}
      variant="outline"
      className="mb-6 transition-all duration-200 hover:scale-105"
    >
      <ArrowLeft size={16} className="mr-2" />
      Back
    </Button>
  );
}
