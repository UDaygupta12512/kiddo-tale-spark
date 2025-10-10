import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type CharacterBuilderProps = {
  onCharacterCreated?: (character: Character) => void;
};

type Character = {
  name: string;
  type: string;
  personality: string;
  specialPower: string;
  color: string;
};

export function CharacterBuilder({ onCharacterCreated }: CharacterBuilderProps) {
  const [character, setCharacter] = useState<Character>({
    name: "",
    type: "human",
    personality: "brave",
    specialPower: "",
    color: "#9b87f5"
  });

  const characterTypes = [
    { value: "human", label: "Human" },
    { value: "animal", label: "Animal" },
    { value: "robot", label: "Robot" },
    { value: "alien", label: "Alien" },
    { value: "monster", label: "Friendly Monster" },
    { value: "fairy", label: "Fairy/Magical Being" },
  ];

  const personalities = [
    { value: "brave", label: "Brave & Courageous" },
    { value: "kind", label: "Kind & Caring" },
    { value: "funny", label: "Funny & Playful" },
    { value: "smart", label: "Smart & Curious" },
    { value: "creative", label: "Creative & Artistic" },
    { value: "adventurous", label: "Adventurous & Bold" },
  ];

  const colors = [
    { value: "#9b87f5", label: "Purple", color: "bg-kids-purple" },
    { value: "#f97316", label: "Orange", color: "bg-kids-orange" },
    { value: "#0EA5E9", label: "Blue", color: "bg-kids-blue" },
    { value: "#D946EF", label: "Pink", color: "bg-pink-500" },
    { value: "#10B981", label: "Green", color: "bg-kids-green" },
    { value: "#FBBF24", label: "Yellow", color: "bg-kids-yellow" },
  ];

  const handleCreate = () => {
    if (!character.name) {
      toast.error("Please give your character a name!");
      return;
    }

    onCharacterCreated?.(character);
    toast.success(`${character.name} has been created! Use them in your next story.`);
    
    // Reset form
    setCharacter({
      name: "",
      type: "human",
      personality: "brave",
      specialPower: "",
      color: "#9b87f5"
    });
  };

  const generateRandom = () => {
    const names = ["Sparky", "Luna", "Max", "Bella", "Phoenix", "Nova", "Atlas", "Willow"];
    const powers = ["flying", "invisibility", "super strength", "talking to animals", "time travel", "shapeshifting"];
    
    setCharacter({
      name: names[Math.floor(Math.random() * names.length)],
      type: characterTypes[Math.floor(Math.random() * characterTypes.length)].value,
      personality: personalities[Math.floor(Math.random() * personalities.length)].value,
      specialPower: powers[Math.floor(Math.random() * powers.length)],
      color: colors[Math.floor(Math.random() * colors.length)].value
    });
    
    toast.success("Random character generated!");
  };

  return (
    <div className="story-card p-6">
      <h3 className="text-xl font-bold mb-6 text-kids-purple flex items-center gap-2">
        <Sparkles className="w-6 h-6" />
        Character Builder
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Character Name</Label>
          <Input
            placeholder="Enter character name..."
            value={character.name}
            onChange={(e) => setCharacter({ ...character, name: e.target.value })}
            className="rounded-lg border-kids-purple/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Character Type</Label>
            <Select value={character.type} onValueChange={(value) => setCharacter({ ...character, type: value })}>
              <SelectTrigger className="rounded-lg border-kids-purple/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {characterTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Personality</Label>
            <Select value={character.personality} onValueChange={(value) => setCharacter({ ...character, personality: value })}>
              <SelectTrigger className="rounded-lg border-kids-purple/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {personalities.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Special Power/Skill</Label>
          <Input
            placeholder="e.g., can fly, super smart, talks to animals..."
            value={character.specialPower}
            onChange={(e) => setCharacter({ ...character, specialPower: e.target.value })}
            className="rounded-lg border-kids-purple/30"
          />
        </div>

        <div className="space-y-2">
          <Label>Favorite Color</Label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setCharacter({ ...character, color: c.value })}
                className={`w-10 h-10 rounded-full ${c.color} border-4 transition-all ${
                  character.color === c.value ? 'border-gray-800 scale-110' : 'border-white'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleCreate}
            className="flex-1 bg-gradient-to-r from-kids-purple to-kids-blue text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Character
          </Button>
          <Button
            onClick={generateRandom}
            variant="outline"
            className="border-kids-orange text-kids-orange hover:bg-kids-orange/10"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Random
          </Button>
        </div>

        {character.name && (
          <div className="mt-6 p-4 rounded-lg border-2 border-dashed border-kids-purple/30 bg-kids-purple/5">
            <h4 className="font-bold text-sm mb-2 text-kids-purple">Character Preview:</h4>
            <p className="text-sm">
              <strong>{character.name}</strong> is a {character.personality}{' '}
              {character.type}
              {character.specialPower && ` with the power of ${character.specialPower}`}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}