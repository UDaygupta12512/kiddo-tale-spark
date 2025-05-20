
import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI-Powered Stories",
    description: "Our advanced AI creates unique and personalized stories based on your child's interests.",
    color: "kids-purple"
  },
  {
    title: "Custom Illustrations",
    description: "Every story comes with beautiful AI-generated images that bring the narrative to life.",
    color: "kids-orange"
  },
  {
    title: "Educational Themes",
    description: "Choose from a variety of themes designed to entertain and educate at the same time.",
    color: "kids-blue"
  },
  {
    title: "Easy Sharing",
    description: "Print stories or save them digitally to enjoy again and again.",
    color: "kids-green"
  }
];

export function Features() {
  return (
    <section id="features" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
        Magical Features
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={cn(
              "story-card h-full p-6",
              "transform hover:-translate-y-2 transition-transform duration-300"
            )}
          >
            <div className={`w-12 h-12 rounded-lg bg-${feature.color} mb-4 flex items-center justify-center`}>
              <span className="text-white font-bold text-xl">{index + 1}</span>
            </div>
            <h3 className={`text-xl font-bold mb-3 text-${feature.color}`}>{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
