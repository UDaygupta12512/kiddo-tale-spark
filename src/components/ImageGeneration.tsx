
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageGenerationProps = {
  imageUrl: string | null;
  isGenerating: boolean;
  onGenerate: () => void;
  theme: string;
};

export function ImageGeneration({ 
  imageUrl, 
  isGenerating, 
  onGenerate,
  theme 
}: ImageGenerationProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {!imageUrl && !isGenerating && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-kids-purple/30 rounded-xl p-6 w-full aspect-square">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-kids-purple/10 rounded-full flex items-center justify-center mx-auto">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-8 h-8 text-kids-purple" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-kids-purple">Create an Illustration</h3>
            <p className="text-sm text-gray-500">Let AI create a picture for your story</p>
          </div>
          
          <Button 
            onClick={onGenerate}
            className="mt-6 bg-gradient-to-r from-kids-blue to-kids-purple hover:opacity-90 text-white"
          >
            Generate Image
          </Button>
        </div>
      )}
      
      {isGenerating && (
        <div className="border-2 border-kids-purple/30 rounded-xl p-6 w-full aspect-square flex flex-col items-center justify-center">
          <div className="animate-bounce-gentle">
            <div className="w-16 h-16 border-4 border-kids-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="mt-6 text-center text-kids-purple font-medium">Creating your illustration...</p>
          <p className="text-sm text-gray-500 mt-2 text-center">Our AI is drawing something special!</p>
        </div>
      )}
      
      {imageUrl && (
        <div className="w-full relative">
          <img 
            src={imageUrl} 
            alt="Story illustration" 
            className={cn(
              "w-full h-auto rounded-xl object-cover aspect-square",
              "shadow-lg transition-all duration-500",
            )}
          />
          <div className="absolute bottom-4 right-4">
            <Button 
              onClick={onGenerate} 
              size="sm"
              className="bg-kids-orange hover:bg-kids-orange/90 text-white"
            >
              Regenerate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
