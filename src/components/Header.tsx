
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import { User, LogOut } from "lucide-react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "See you next time! 👋",
    });
    navigate('/');
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
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
      </Link>
      
      <div className="hidden md:flex items-center gap-4">
        <Link 
          to="/" 
          className={cn(
            "text-lg transition-all duration-200 hover:text-kids-purple hover:scale-105",
            location.pathname === "/" && "text-kids-purple font-semibold"
          )}
        >
          Home
        </Link>
        <Link 
          to="/games" 
          className={cn(
            "text-lg transition-all duration-200 hover:text-kids-blue hover:scale-105",
            location.pathname === "/games" && "text-kids-blue font-semibold"
          )}
        >
          Games
        </Link>
        <Link 
          to="/creative" 
          className={cn(
            "text-lg transition-all duration-200 hover:text-kids-orange hover:scale-105",
            location.pathname === "/creative" && "text-kids-orange font-semibold"
          )}
        >
          Creative
        </Link>
        <Link 
          to="/parents-teachers" 
          className={cn(
            "text-lg transition-all duration-200 hover:text-kids-green hover:scale-105",
            location.pathname === "/parents-teachers" && "text-kids-green font-semibold"
          )}
        >
          For Educators
        </Link>
      </div>
      
      {session ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-kids-purple/10">
            <User className="w-4 h-4 text-kids-purple" />
            <span className="text-sm text-kids-purple font-medium">
              {session.user.email?.split('@')[0]}
            </span>
          </div>
          <button 
            onClick={handleSignOut}
            className="bg-kids-red hover:bg-opacity-90 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      ) : (
        <button 
          onClick={() => navigate('/auth')}
          className="bg-kids-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
        >
          Sign In
        </button>
      )}
    </header>
  );
}
