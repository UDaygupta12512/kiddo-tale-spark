import { useState, useEffect } from 'react';
import { Award, Download, Share2, Trophy, Star, Sparkles, BookOpen, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [achievements, setAchievements] = useState({
    storiesRead: 1,
    wordsLearned: 25,
    badges: ['First Story', 'Creative Thinker'],
    level: 1,
  });

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const badges = [
    { icon: BookOpen, name: "First Story", color: "text-primary", unlocked: true },
    { icon: Star, name: "Creative Thinker", color: "text-secondary", unlocked: true },
    { icon: Trophy, name: "Story Master", color: "text-accent", unlocked: achievements.storiesRead >= 5 },
    { icon: Sparkles, name: "Imagination Hero", color: "text-primary", unlocked: achievements.wordsLearned >= 50 },
    { icon: Target, name: "Perfect Reader", color: "text-secondary", unlocked: false },
    { icon: Zap, name: "Speed Reader", color: "text-accent", unlocked: false },
  ];

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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fade-in"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animation: `fade-in 0.5s ease-out ${Math.random() * 0.5}s, slide-in-right ${2 + Math.random() * 3}s ease-in ${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {['🎉', '⭐', '🏆', '✨', '🎊'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Main Achievement Card */}
      <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 animate-scale-in">
        <div className="flex justify-center">
          <div className="relative">
            <Award className="w-20 h-20 text-primary animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-secondary animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-3 animate-fade-in">
            🎉 Amazing Achievement! 🎉
          </h3>
          <p className="text-lg text-muted-foreground mb-2">
            {userName} completed
          </p>
          <p className="text-2xl font-bold text-primary">
            {storyTitle}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {completionDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={handleDownload} size="lg" className="gap-2 hover-scale">
            <Download className="w-5 h-5" />
            Download Certificate
          </Button>
          <Button onClick={handleShare} variant="outline" size="lg" className="gap-2 hover-scale">
            <Share2 className="w-5 h-5" />
            Share Achievement
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 animate-fade-in">
          <div className="text-center space-y-2">
            <BookOpen className="w-10 h-10 text-primary mx-auto" />
            <p className="text-3xl font-bold text-primary">{achievements.storiesRead}</p>
            <p className="text-sm text-muted-foreground">Stories Completed</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-center space-y-2">
            <Star className="w-10 h-10 text-secondary mx-auto" />
            <p className="text-3xl font-bold text-secondary">{achievements.wordsLearned}</p>
            <p className="text-sm text-muted-foreground">Words Learned</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center space-y-2">
            <Trophy className="w-10 h-10 text-accent mx-auto" />
            <p className="text-3xl font-bold text-accent">Level {achievements.level}</p>
            <p className="text-sm text-muted-foreground">Reader Level</p>
          </div>
        </Card>
      </div>

      {/* Progress to Next Level */}
      <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-lg">Progress to Level {achievements.level + 1}</h4>
            <span className="text-sm text-muted-foreground">2 more stories</span>
          </div>
          <Progress value={33} className="h-3" />
          <p className="text-sm text-muted-foreground text-center">
            Keep reading to unlock more badges and rewards!
          </p>
        </div>
      </Card>

      {/* Badges Section */}
      <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h4 className="font-bold text-xl mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🏅 Achievement Badges
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`text-center space-y-2 p-4 rounded-lg transition-all ${
                badge.unlocked 
                  ? 'bg-gradient-to-br from-primary/10 to-accent/10 hover-scale cursor-pointer' 
                  : 'bg-muted/50 opacity-50'
              }`}
            >
              <div className="flex justify-center">
                <badge.icon 
                  className={`w-12 h-12 ${badge.unlocked ? badge.color : 'text-muted-foreground'}`} 
                />
              </div>
              <p className="text-xs font-medium">{badge.name}</p>
              {badge.unlocked && (
                <Badge variant="secondary" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Unlocked
                </Badge>
              )}
              {!badge.unlocked && (
                <Badge variant="outline" className="text-xs">
                  Locked
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Motivational Message */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <p className="text-lg font-medium text-foreground">
          ✨ "Every story you read opens a new door to imagination!" ✨
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Keep reading, keep learning, keep growing!
        </p>
      </Card>
    </div>
  );
};
