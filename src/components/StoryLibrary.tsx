import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Trash2, Eye, Star, Tag, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SavedStory = {
  id: string;
  title: string;
  text: string;
  theme: string;
  timestamp: number;
  tags?: string[];
  rating?: number;
  collection?: string;
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
  const [newTag, setNewTag] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [filterCollection, setFilterCollection] = useState("all");

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

  const addTag = (storyId: string, tag: string) => {
    if (!tag.trim()) return;
    const updated = savedStories.map(s => 
      s.id === storyId 
        ? { ...s, tags: [...(s.tags || []), tag.trim()] }
        : s
    );
    setSavedStories(updated);
    localStorage.setItem('savedStories', JSON.stringify(updated));
    setNewTag("");
    toast.success("Tag added!");
  };

  const removeTag = (storyId: string, tagToRemove: string) => {
    const updated = savedStories.map(s =>
      s.id === storyId
        ? { ...s, tags: (s.tags || []).filter(t => t !== tagToRemove) }
        : s
    );
    setSavedStories(updated);
    localStorage.setItem('savedStories', JSON.stringify(updated));
  };

  const rateStory = (storyId: string, rating: number) => {
    const updated = savedStories.map(s =>
      s.id === storyId ? { ...s, rating } : s
    );
    setSavedStories(updated);
    localStorage.setItem('savedStories', JSON.stringify(updated));
    toast.success(`Rated ${rating} stars!`);
  };

  const setCollection = (storyId: string, collection: string) => {
    const updated = savedStories.map(s =>
      s.id === storyId ? { ...s, collection } : s
    );
    setSavedStories(updated);
    localStorage.setItem('savedStories', JSON.stringify(updated));
    toast.success("Collection updated!");
  };

  const allTags = Array.from(new Set(savedStories.flatMap(s => s.tags || [])));
  const allCollections = Array.from(new Set(savedStories.map(s => s.collection).filter(Boolean)));

  const filteredStories = savedStories.filter(story => {
    const matchesTag = filterTag === "all" || (story.tags || []).includes(filterTag);
    const matchesCollection = filterCollection === "all" || story.collection === filterCollection;
    return matchesTag && matchesCollection;
  });

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

      {savedStories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterCollection} onValueChange={setFilterCollection}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Collections</SelectItem>
              {allCollections.map(col => (
                <SelectItem key={col} value={col!}>{col}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {savedStories.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No saved stories yet. Create and save your first story!
        </p>
      ) : filteredStories.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No stories match the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStories.map((story) => (
            <Card key={story.id} className="p-4 hover:shadow-lg transition-shadow border-l-4 border-kids-purple">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(story.timestamp).toLocaleDateString()}
                  </p>
                  <h4 className="font-semibold text-sm mt-1 line-clamp-2">
                    {story.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block px-2 py-1 bg-kids-blue/10 text-kids-blue text-xs rounded">
                      {story.theme}
                    </span>
                    {story.collection && (
                      <Badge variant="outline" className="text-xs">
                        <FolderOpen className="w-3 h-3 mr-1" />
                        {story.collection}
                      </Badge>
                    )}
                  </div>

                  {/* Rating Display */}
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 cursor-pointer transition-colors ${
                          story.rating && star <= story.rating
                            ? "fill-kids-yellow text-kids-yellow"
                            : "text-gray-300"
                        }`}
                        onClick={() => rateStory(story.id, star)}
                      />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(story.tags || []).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs cursor-pointer"
                        onClick={() => removeTag(story.id, tag)}
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
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

              {/* Add Tag */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTag(selectedStory.id, newTag);
                    }
                  }}
                />
                <Button
                  onClick={() => addTag(selectedStory.id, newTag)}
                  className="bg-kids-green text-white"
                >
                  <Tag className="w-4 h-4" />
                </Button>
              </div>

              {/* Add to Collection */}
              <div>
                <Input
                  placeholder="Collection name (e.g., 'Favorites', 'Bedtime Stories')"
                  value={selectedStory.collection || ""}
                  onChange={(e) => setCollection(selectedStory.id, e.target.value)}
                />
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