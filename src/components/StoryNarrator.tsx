import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { toast } from 'sonner';

type StoryNarratorProps = {
  storyText: string;
};

export function StoryNarrator({ storyText }: StoryNarratorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("default");
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const voices = [
    { value: "default", label: "🎭 Default Voice" },
    { value: "child", label: "👧 Child Voice" },
    { value: "storyteller", label: "📖 Storyteller" },
    { value: "excited", label: "🎉 Excited" }
  ];

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying && utterance) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
        return;
      }

      if (utterance && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        return;
      }

      window.speechSynthesis.cancel();
      
      const newUtterance = new SpeechSynthesisUtterance(storyText);
      
      // Configure voice settings based on selection
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        switch(selectedVoice) {
          case "child":
            newUtterance.pitch = 1.5;
            newUtterance.rate = 1.1;
            break;
          case "storyteller":
            newUtterance.pitch = 0.9;
            newUtterance.rate = 0.85;
            break;
          case "excited":
            newUtterance.pitch = 1.3;
            newUtterance.rate = 1.2;
            break;
          default:
            newUtterance.pitch = 1;
            newUtterance.rate = 1;
        }
      }

      newUtterance.onend = () => {
        setIsPlaying(false);
        toast.success("Story narration completed!");
      };

      newUtterance.onerror = () => {
        setIsPlaying(false);
        toast.error("Error playing narration");
      };

      setUtterance(newUtterance);
      window.speechSynthesis.speak(newUtterance);
      setIsPlaying(true);
      toast.success("Starting narration...");
    } else {
      toast.error("Speech synthesis not supported in your browser");
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setUtterance(null);
  };

  return (
    <div className="story-card p-4">
      <h3 className="text-lg font-bold mb-4 text-kids-purple flex items-center gap-2">
        <Volume2 className="w-5 h-5" />
        Story Narrator
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Choose Voice</label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="rounded-lg border-kids-purple/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.value} value={voice.value}>
                  {voice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSpeak}
            className="flex-1 bg-gradient-to-r from-kids-purple to-kids-blue text-white"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {utterance && window.speechSynthesis.paused ? "Resume" : "Play Story"}
              </>
            )}
          </Button>
          
          {(isPlaying || utterance) && (
            <Button
              onClick={handleStop}
              variant="outline"
              className="border-kids-orange text-kids-orange hover:bg-kids-orange/10"
            >
              <VolumeX className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}