import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SavedStory = {
  id: string;
  title: string;
  text: string;
  theme: string;
  timestamp: number;
};

type StoryLibraryProps = {
  currentStory?: string;
  currentTheme?: string;
  onLoadStory?: (text: string, theme: string) => void;
};

export function StoryLibrary({ currentStory, currentTheme, onLoadStory }: StoryLibraryProps) {
  const [savedStories, setSavedStories] = useState<SavedStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<SavedStory | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    loadStoriesFromStorage();
  }, []);

  const loadStoriesFromStorage = () => {
    const stored = localStorage.getItem('savedStories');
    if (stored) {
      setSavedStories(JSON.parse(stored));
    }
  };

  const saveCurrentStory = () => {
    if (!currentStory) {
      toast.error("No story to save!");
      return;
    }

    const newStory: SavedStory = {
      id: Date.now().toString(),
      title: currentStory.substring(0, 50) + "...",
      text: currentStory,
      theme: currentTheme || "adventure",
      timestamp: Date.now()
    };

    const updated = [...savedStories, newStory];
    setSavedStories(updated);
    localStorage.setItem('savedStories', JSON.stringify(updated));
    toast.success("Story saved to your library!");
  };

  const deleteStory = (id: string) => {
    const updated = savedStories.filter(s => s.id !== id);
    setSavedStories(updated);
    localStorage.setItem('savedStories', JSON.stringify(updated));
    toast.success("Story deleted");
  };

  const viewStory = (story: SavedStory) => {
    setSelectedStory(story);
    setShowDialog(true);
  };

  const loadStory = (story: SavedStory) => {
    if (onLoadStory) {
      onLoadStory(story.text, story.theme);
      toast.success("Story loaded!");
      setShowDialog(false);
    }
  };

  return (
    <div className="story-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-kids-purple flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Story Library ({savedStories.length})
        </h3>
        {currentStory && (
          <Button
            onClick={saveCurrentStory}
            className="bg-gradient-to-r from-kids-green to-kids-blue text-white"
          >
            Save Current Story
          </Button>
        )}
      </div>

      {savedStories.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No saved stories yet. Create and save your first story!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedStories.map((story) => (
            <Card key={story.id} className="p-4 hover:shadow-lg transition-shadow border-l-4 border-kids-purple">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(story.timestamp).toLocaleDateString()}
                  </p>
                  <h4 className="font-semibold text-sm mt-1 line-clamp-2">
                    {story.title}
                  </h4>
                  <span className="inline-block mt-2 px-2 py-1 bg-kids-blue/10 text-kids-blue text-xs rounded">
                    {story.theme}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => viewStory(story)}
                    className="flex-1 border-kids-blue text-kids-blue hover:bg-kids-blue/10"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteStory(story.id)}
                    className="border-kids-orange text-kids-orange hover:bg-kids-orange/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-kids-purple">Saved Story</DialogTitle>
          </DialogHeader>
          {selectedStory && (
            <div className="space-y-4">
              <div className="prose max-w-none">
                {selectedStory.text.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-3">{paragraph}</p>
                ))}
              </div>
              <Button
                onClick={() => loadStory(selectedStory)}
                className="w-full bg-gradient-to-r from-kids-purple to-kids-blue text-white"
              >
                Load This Story
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}