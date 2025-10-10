import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type StoryRemixerProps = {
  originalStory: string;
  theme: string;
  onRemixGenerated: (remixedStory: string) => void;
};

export function StoryRemixer({ originalStory, theme, onRemixGenerated }: StoryRemixerProps) {
  const [remixType, setRemixType] = useState("ending");
  const [isRemixing, setIsRemixing] = useState(false);

  const remixOptions = [
    { value: "ending", label: "🎭 Different Ending" },
    { value: "character", label: "👥 New Main Character" },
    { value: "setting", label: "🌍 Different Setting" },
    { value: "twist", label: "🌀 Plot Twist" },
    { value: "tone", label: "🎨 Change Tone (Funny/Serious)" },
  ];

  const handleRemix = async () => {
    setIsRemixing(true);
    
    try {
      // Simulate AI remixing (in real app, would call AI API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let remixedStory = originalStory;
      
      switch(remixType) {
        case "ending":
          remixedStory = originalStory.split('.').slice(0, -2).join('.') + 
            '. But then, something unexpected happened! A magical portal opened, revealing a brand new adventure that was just beginning...';
          break;
        case "character":
          remixedStory = originalStory.replace(/character|hero|protagonist/gi, 'brave robot');
          break;
        case "setting":
          remixedStory = originalStory.replace(/forest|place|location/gi, 'underwater kingdom');
          break;
        case "twist":
          remixedStory = originalStory + ' Suddenly, everything they thought they knew was wrong - it was all part of a grand plan by a friendly wizard to teach them an important lesson about friendship!';
          break;
        case "tone":
          remixedStory = '😄 ' + originalStory + ' And they all laughed and laughed at the silly adventure they just had!';
          break;
      }
      
      onRemixGenerated(remixedStory);
      toast.success("Story remixed successfully!");
    } catch (error) {
      toast.error("Failed to remix story");
    } finally {
      setIsRemixing(false);
    }
  };

  return (
    <div className="story-card p-6">
      <h3 className="text-xl font-bold mb-4 text-kids-purple flex items-center gap-2">
        <Wand2 className="w-6 h-6" />
        Story Remixer
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Transform your story with creative twists! Choose how you want to remix it.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Remix Type</label>
          <Select value={remixType} onValueChange={setRemixType}>
            <SelectTrigger className="rounded-lg border-kids-purple/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {remixOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleRemix}
          disabled={isRemixing}
          className="w-full bg-gradient-to-r from-kids-orange to-kids-yellow text-white font-bold"
        >
          {isRemixing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Remixing Story...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Remix Story
            </>
          )}
        </Button>
      </div>

      <div className="mt-4 p-3 bg-kids-yellow/10 rounded-lg border border-kids-yellow/30">
        <p className="text-xs text-gray-600">
          💡 <strong>Tip:</strong> Try different remix types to explore creative variations of your story!
        </p>
      </div>
    </div>
  );
}