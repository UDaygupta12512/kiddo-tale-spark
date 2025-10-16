import { Award, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface StoryCertificateProps {
  storyTitle: string;
  userName?: string;
  completionDate?: Date;
}

export const StoryCertificate = ({ 
  storyTitle, 
  userName = "Young Reader",
  completionDate = new Date()
}: StoryCertificateProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(0.5, '#60a5fa');
    gradient.addColorStop(1, '#34d399');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 760, 560);

    // Inner border
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 720, 520);

    // Certificate text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Achievement', 400, 120);

    ctx.font = '24px Arial';
    ctx.fillText('This certifies that', 400, 200);

    ctx.font = 'bold 36px Arial';
    ctx.fillText(userName, 400, 260);

    ctx.font = '24px Arial';
    ctx.fillText('has completed the story', 400, 320);

    ctx.font = 'bold 28px Arial';
    const maxWidth = 600;
    const words = storyTitle.split(' ');
    let line = '';
    let y = 370;
    
    for (let word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        ctx.fillText(line, 400, y);
        line = word + ' ';
        y += 35;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 400, y);

    ctx.font = '20px Arial';
    ctx.fillText(completionDate.toLocaleDateString(), 400, 500);

    // Download
    const link = document.createElement('a');
    link.download = `${storyTitle.replace(/\s+/g, '_')}_certificate.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Certificate Downloaded!",
      description: "Your achievement certificate has been saved.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Story Achievement',
          text: `I completed "${storyTitle}"! 🎉`,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(`I completed "${storyTitle}"! 🎉`);
      toast({
        title: "Copied to clipboard!",
        description: "Share your achievement with friends!",
      });
    }
  };

  return (
    <div className="story-card p-8 text-center space-y-6">
      <div className="flex justify-center">
        <Award className="w-16 h-16 text-primary" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
          Congratulations!
        </h3>
        <p className="text-muted-foreground">
          You've completed this amazing story!
        </p>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download Certificate
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share Achievement
        </Button>
      </div>
    </div>
  );
};
