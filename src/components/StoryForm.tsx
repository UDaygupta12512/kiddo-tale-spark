
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type StoryFormProps = {
  onStoryGenerated: (storyText: string, theme: string) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
};

export function StoryForm({ onStoryGenerated, isGenerating, setIsGenerating }: StoryFormProps) {
  const [mainCharacter, setMainCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [theme, setTheme] = useState("adventure");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const storyThemes = [
    { value: "adventure", label: "Adventure" },
    { value: "fantasy", label: "Fantasy" },
    { value: "mystery", label: "Mystery" },
    { value: "friendship", label: "Friendship" },
    { value: "animals", label: "Animal Stories" },
    { value: "space", label: "Space Exploration" },
  ];

  const handleGenerateStory = async () => {
    if (!mainCharacter || !setting) {
      toast.error("Please fill in the character and setting fields.");
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-story', {
        body: {
          mainCharacter,
          setting,
          theme,
          details: additionalDetails
        }
      });

      if (error) {
        if (error.message?.includes('429')) {
          toast.error('Too many requests. Please try again shortly.');
        } else if (error.message?.includes('402')) {
          toast.error('AI credits exhausted. Please add credits to continue.');
        } else {
          toast.error('Failed to generate story. Please try again.');
        }
        return;
      }

      if (!data?.storyText) {
        toast.error('Story generation returned no content.');
        return;
      }

      onStoryGenerated(data.storyText, theme);
      toast.success('Your story has been created!');
    } catch (error) {
      console.error("Error generating story:", error);
      toast.error("Failed to generate story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="story-card animate-fade-in w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-kids-purple">Create Your Story</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="main-character" className="text-lg">Main Character</Label>
            <Input
              id="main-character"
              className="rounded-xl border-kids-purple/30 focus-visible:ring-kids-purple"
              placeholder="A friendly dragon"
              value={mainCharacter}
              onChange={(e) => setMainCharacter(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="setting" className="text-lg">Story Setting</Label>
            <Input
              id="setting"
              className="rounded-xl border-kids-purple/30 focus-visible:ring-kids-purple"
              placeholder="A magical forest"
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="theme" className="text-lg">Story Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="rounded-xl border-kids-purple/30 focus-visible:ring-kids-purple">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              {storyThemes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  {theme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="details" className="text-lg">Additional Details (optional)</Label>
          <Textarea
            id="details"
            className="rounded-xl min-h-[100px] border-kids-purple/30 focus-visible:ring-kids-purple"
            placeholder="Add any other details you'd like to include in the story..."
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleGenerateStory}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-kids-purple to-kids-blue hover:opacity-90 text-white font-bold py-3 text-lg rounded-xl transition-all"
        >
          {isGenerating ? "Creating Your Story..." : "Generate Story"}
        </Button>
      </div>
    </div>
  );
}
