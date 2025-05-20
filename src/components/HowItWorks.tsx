
export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-gradient-to-br from-kids-purple/10 to-kids-blue/5 rounded-3xl my-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
        How It Works
      </h2>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          {/* Step connector line */}
          <div className="absolute left-[32px] top-10 w-1 h-[calc(100%-60px)] bg-gradient-to-b from-kids-purple to-kids-blue rounded-full hidden md:block"></div>
          
          {/* Steps */}
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-kids-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-kids-purple/30">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div className="story-card flex-1">
                <h3 className="text-xl font-bold mb-3">Enter Story Details</h3>
                <p className="text-gray-600">Tell us about the main character, setting, and choose a theme for your story. Add as many details as you like!</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-kids-purple to-kids-blue flex items-center justify-center flex-shrink-0 shadow-lg shadow-kids-blue/30">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div className="story-card flex-1">
                <h3 className="text-xl font-bold mb-3">AI Creates Your Story</h3>
                <p className="text-gray-600">Our AI writes a custom story based on your details, creating a unique narrative every time.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-kids-blue flex items-center justify-center flex-shrink-0 shadow-lg shadow-kids-blue/30">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <div className="story-card flex-1">
                <h3 className="text-xl font-bold mb-3">Generate Illustrations</h3>
                <p className="text-gray-600">Add beautiful AI-generated pictures that match your story's theme and characters.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-kids-orange flex items-center justify-center flex-shrink-0 shadow-lg shadow-kids-orange/30">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <div className="story-card flex-1">
                <h3 className="text-xl font-bold mb-3">Share and Enjoy!</h3>
                <p className="text-gray-600">Print your story, save it digitally, or create a collection of tales for endless enjoyment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
