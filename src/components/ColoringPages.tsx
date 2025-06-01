
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Palette, Eye } from "lucide-react";

export function ColoringPages() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Sample coloring pages with actual placeholder images
  const coloringPages = [
    {
      id: 1,
      title: "Magical Castle",
      description: "A beautiful castle with towers and flags",
      thumbnail: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Friendly Animals",
      description: "Cute animals in a peaceful forest setting",
      thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Playful Kitten",
      description: "An adorable kitten ready to be colored",
      thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Jungle Adventure",
      description: "Fun jungle animals and tropical scenes",
      thumbnail: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop"
    }
  ];

  const downloadColoringPage = (pageTitle: string) => {
    console.log(`Downloading coloring page: ${pageTitle}`);
    // Create a simple download simulation
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 400, 400);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(pageTitle, 50, 200);
      ctx.strokeRect(50, 50, 300, 300);
    }
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${pageTitle.toLowerCase().replace(/\s+/g, '-')}-coloring-page.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const closePreview = () => {
    setSelectedImage(null);
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
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={page.thumbnail} 
                  alt={page.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    console.log(`Image failed to load: ${page.thumbnail}`);
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Im0yMjQgMTgyLjQtODEuNiA4MS42IDEyIDEyIDY5LjYtNjkuNmEyNC4yNSAyNC4yNSAwIDAgMSAzNC4zIDBsMTMuOSAxMy45YTI0LjI1IDI0LjI1IDAgMCAxIDAgMzQuM2wtNjkuNiA2OS42IDEyIDEyIDgxLjYtODEuNmE0MC4yNSA0MC4yNSAwIDAgMCAwLTU2LjlsLTEzLjktMTMuOWE0MC4yNSA0MC4yNSAwIDAgMC01Ni45IDB6IiBmaWxsPSIjOTA5M0ExIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3Mjg0IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkNvbG9yaW5nIFBhZ2U8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
              </div>
              
              <p className="text-gray-600 text-sm">{page.description}</p>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setSelectedImage(page.thumbnail)}
                  variant="outline"
                  className="flex-1 border-kids-purple text-kids-purple hover:bg-kids-purple/10"
                >
                  <Eye size={16} className="mr-2" />
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

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closePreview}
        >
          <div className="relative max-w-2xl max-h-[80vh] bg-white rounded-lg p-4">
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
            <img 
              src={selectedImage} 
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

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
