
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Palette } from "lucide-react";

export function ColoringPages() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Sample coloring pages - in a real app, these would be AI-generated from stories
  const coloringPages = [
    {
      id: 1,
      title: "Magical Castle",
      description: "A beautiful castle with towers and flags",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Friendly Dragon",
      description: "A cute dragon breathing hearts instead of fire",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Enchanted Forest",
      description: "Trees with faces and magical creatures",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Space Adventure",
      description: "Rockets, planets, and friendly aliens",
      thumbnail: "/placeholder.svg"
    }
  ];

  const downloadColoringPage = (pageTitle: string) => {
    // In a real app, this would download the actual coloring page
    console.log(`Downloading coloring page: ${pageTitle}`);
    // Simulate download
    const link = document.createElement('a');
    link.download = `${pageTitle.toLowerCase().replace(/\s+/g, '-')}-coloring-page.pdf`;
    link.href = '/placeholder.svg'; // Would be actual PDF in real app
    link.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-kids-purple mb-4">
          🎨 Coloring Pages
        </h2>
        <p className="text-gray-600 mb-6">
          Print these magical coloring pages and bring your stories to life with colors!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coloringPages.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-kids-blue flex items-center gap-2">
                <Palette size={20} />
                {page.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <img 
                  src={page.thumbnail} 
                  alt={page.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <p className="text-gray-600 text-sm">{page.description}</p>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setSelectedImage(page.thumbnail)}
                  variant="outline"
                  className="flex-1 border-kids-purple text-kids-purple hover:bg-kids-purple/10"
                >
                  Preview
                </Button>
                <Button 
                  onClick={() => downloadColoringPage(page.title)}
                  className="flex-1 bg-kids-orange hover:bg-kids-orange/90"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-kids-yellow/20 border-kids-yellow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="font-semibold text-kids-purple mb-2">Coloring Tips for Parents & Teachers:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use these pages to discuss story elements and characters</li>
                <li>• Encourage creativity - there are no wrong colors!</li>
                <li>• Ask children to tell you about their coloring choices</li>
                <li>• Display finished artwork to boost confidence</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
