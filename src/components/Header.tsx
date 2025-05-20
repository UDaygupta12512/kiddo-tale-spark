
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className={cn(
            "w-12 h-12 bg-kids-purple rounded-xl flex items-center justify-center",
            "rotate-3 animate-float"
          )}>
            <span className="text-white text-2xl font-bold">K</span>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-kids-orange rounded-full" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
          KidStoryAI
        </h1>
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        <a href="#features" className="text-lg hover:text-kids-purple transition-colors">Features</a>
        <a href="#how-it-works" className="text-lg hover:text-kids-purple transition-colors">How It Works</a>
        <a href="#create" className="text-lg hover:text-kids-purple transition-colors">Create Story</a>
      </div>
      
      <button className="bg-kids-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
        Get Started
      </button>
    </header>
  );
}
