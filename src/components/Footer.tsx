
export function Footer() {
  return (
    <footer className="py-8 border-t mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-kids-purple rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">K</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
                KidStoryAI
              </span>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              Bringing stories to life with AI
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-kids-purple">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-500 hover:text-kids-purple transition-colors text-sm">Features</a></li>
                <li><a href="#" className="text-gray-500 hover:text-kids-purple transition-colors text-sm">Pricing</a></li>
                <li><a href="#how-it-works" className="text-gray-500 hover:text-kids-purple transition-colors text-sm">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-kids-blue">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-kids-blue transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-500 hover:text-kids-blue transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-kids-blue transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-kids-orange">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-kids-orange transition-colors text-sm">Email Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-kids-orange transition-colors text-sm">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} KidStoryAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
