import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Check, RotateCcw, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

type StoryEvent = {
  id: string;
  text: string;
  order: number;
};

type StorySequencingProps = {
  storyText?: string;
};

export function StorySequencing({ storyText }: StorySequencingProps) {
  const [events, setEvents] = useState<StoryEvent[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const generateEvents = (): StoryEvent[] => {
    // If we have a story, try to extract sentences
    if (storyText && storyText.length > 100) {
      const sentences = storyText
        .split(/[.!?]+/)
        .filter(s => s.trim().length > 20)
        .slice(0, 5);
      
      if (sentences.length >= 4) {
        return sentences.map((text, index) => ({
          id: `event-${index}`,
          text: text.trim() + '.',
          order: index,
        }));
      }
    }

    // Default story events
    return [
      { id: 'event-0', text: 'A brave knight set out on a quest to find the magical crystal.', order: 0 },
      { id: 'event-1', text: 'Along the way, the knight met a wise old wizard who gave them a map.', order: 1 },
      { id: 'event-2', text: 'The knight faced many challenges, including crossing a dangerous river.', order: 2 },
      { id: 'event-3', text: 'Finally, the knight reached the crystal cave and found the treasure.', order: 3 },
      { id: 'event-4', text: 'The knight returned home as a hero, sharing the crystal\'s magic with everyone.', order: 4 },
    ];
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const resetGame = () => {
    const newEvents = generateEvents();
    setEvents(shuffleArray(newEvents));
    setIsCorrect(false);
    setAttempts(0);
  };

  useEffect(() => {
    resetGame();
  }, [storyText]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(events);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEvents(items);
    setIsCorrect(false);
  };

  const checkOrder = () => {
    setAttempts(attempts + 1);
    const correct = events.every((event, index) => event.order === index);
    
    if (correct) {
      setIsCorrect(true);
      toast.success("🎉 Perfect! The story is in the right order!");
    } else {
      toast.error("Not quite right. Keep trying!");
    }
  };

  return (
    <div className="story-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-kids-purple flex items-center gap-2">
          <ArrowUpDown className="w-7 h-7" />
          Story Sequencing
        </h3>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-kids-blue/20 rounded-lg">
            <span className="font-bold text-kids-blue">Attempts: {attempts}</span>
          </div>
          <Button
            onClick={resetGame}
            variant="outline"
            size="sm"
            className="border-kids-purple text-kids-purple hover:bg-kids-purple/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Puzzle
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-center text-gray-600 mb-4">
          Drag and drop the events to put the story in the correct order!
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="events">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3 mb-6"
            >
              {events.map((event, index) => (
                <Draggable key={event.id} draggableId={event.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`
                        p-4 cursor-move transition-all
                        ${snapshot.isDragging 
                          ? 'bg-gradient-to-r from-kids-purple/20 to-kids-blue/20 shadow-lg scale-105 border-2 border-kids-purple' 
                          : 'hover:shadow-md border-l-4 border-kids-blue'
                        }
                        ${isCorrect && event.order === index ? 'bg-kids-green/10 border-kids-green' : ''}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-kids-purple/20 flex items-center justify-center font-bold text-kids-purple">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{event.text}</p>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="text-center">
        <Button
          onClick={checkOrder}
          disabled={isCorrect}
          className="bg-gradient-to-r from-kids-green to-kids-blue text-white px-8"
        >
          <Check className="w-5 h-5 mr-2" />
          Check Order
        </Button>
      </div>

      {isCorrect && (
        <div className="mt-6 p-6 bg-gradient-to-r from-kids-yellow/20 to-kids-orange/20 rounded-lg border-2 border-kids-yellow text-center">
          <Trophy className="w-12 h-12 mx-auto mb-3 text-kids-yellow" />
          <p className="text-xl font-bold text-kids-purple">
            🎉 Great Job! You got it in {attempts} {attempts === 1 ? 'try' : 'tries'}!
          </p>
        </div>
      )}
    </div>
  );
}
