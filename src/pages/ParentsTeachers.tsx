
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Users, Lightbulb } from "lucide-react";

const ParentsTeachers = () => {
  const educationalBenefits = [
    {
      title: "Language Development",
      description: "Stories enhance vocabulary, grammar, and communication skills through exposure to rich language patterns.",
      icon: "📚"
    },
    {
      title: "Imagination & Creativity",
      description: "Storytelling stimulates creative thinking and helps children develop their own imaginative capabilities.",
      icon: "🌟"
    },
    {
      title: "Emotional Intelligence",
      description: "Stories help children understand emotions, empathy, and social situations through character experiences.",
      icon: "❤️"
    },
    {
      title: "Critical Thinking",
      description: "Analyzing plots, characters, and outcomes develops logical reasoning and problem-solving skills.",
      icon: "🧠"
    },
    {
      title: "Cultural Awareness",
      description: "Diverse stories expose children to different cultures, traditions, and perspectives.",
      icon: "🌍"
    },
    {
      title: "Memory & Focus",
      description: "Following story sequences improves concentration, memory retention, and listening skills.",
      icon: "🎯"
    }
  ];

  const writingPrompts = [
    "What would happen if animals could talk for one day?",
    "You find a magic door in your school. Where does it lead?",
    "A friendly robot becomes your new classmate. Tell their story.",
    "You can shrink to the size of an ant. What adventure do you have?",
    "What if colors had personalities? Describe a day in Colorland.",
    "You discover a library where books come to life. What happens?",
    "A kind dragon needs help solving a problem. How do you help?",
    "You wake up with a superpower. How do you use it to help others?"
  ];

  const downloadTemplate = (templateName: string) => {
    console.log(`Downloading template: ${templateName}`);
    // In a real app, this would download actual PDF templates
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="py-16 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto space-y-12">
          <BackButton />
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              👨‍👩‍👧‍👦 Parents' & Teachers' Corner
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the educational power of storytelling and access resources 
              to enhance your child's learning journey.
            </p>
          </div>

          {/* Educational Benefits */}
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-kids-purple mb-8 flex items-center gap-3">
              <BookOpen />
              Educational Benefits of Storytelling
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationalBenefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-kids-blue flex items-center gap-3">
                      <span className="text-2xl">{benefit.icon}</span>
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Writing Prompts */}
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-kids-orange mb-8 flex items-center gap-3">
              <Lightbulb />
              Creative Writing Prompts for Classrooms
            </h2>
            
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-kids-orange">Spark Creativity with These Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {writingPrompts.map((prompt, index) => (
                    <div key={index} className="p-4 bg-kids-yellow/20 rounded-lg border-l-4 border-kids-orange transition-all duration-200 hover:bg-kids-yellow/30">
                      <p className="text-gray-700">{prompt}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-kids-blue/10 rounded-lg">
                  <h4 className="font-semibold text-kids-blue mb-2">Using These Prompts:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Start with 5-10 minutes of brainstorming</li>
                    <li>• Encourage students to draw their ideas first</li>
                    <li>• Allow collaboration between students</li>
                    <li>• Focus on creativity over perfect grammar initially</li>
                    <li>• Have students share their stories with the class</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Printable Templates */}
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-kids-green mb-8 flex items-center gap-3">
              <Download />
              Printable Story Templates for Offline Use
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-kids-green">Story Planning Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Help children organize their thoughts with character, setting, and plot planning sheets.</p>
                  <Button 
                    onClick={() => downloadTemplate("Story Planning")}
                    className="w-full bg-kids-green hover:bg-kids-green/90 transition-all duration-200"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-kids-green">Comic Strip Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Visual storytelling templates with panels for drawing and writing short stories.</p>
                  <Button 
                    onClick={() => downloadTemplate("Comic Strip")}
                    className="w-full bg-kids-green hover:bg-kids-green/90 transition-all duration-200"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-kids-green">Story Journal Pages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Daily writing pages with prompts and reflection questions for ongoing practice.</p>
                  <Button 
                    onClick={() => downloadTemplate("Story Journal")}
                    className="w-full bg-kids-green hover:bg-kids-green/90 transition-all duration-200"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ for Educators */}
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-kids-purple mb-8 flex items-center gap-3">
              <Users />
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  How can I integrate AI storytelling into my curriculum?
                </AccordionTrigger>
                <AccordionContent>
                  AI storytelling can be integrated across multiple subjects. Use it for creative writing exercises, 
                  reading comprehension activities, character analysis, and even to create scenarios for math word problems. 
                  Start with 15-20 minute sessions and gradually increase as students become more comfortable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  What age groups benefit most from interactive storytelling?
                </AccordionTrigger>
                <AccordionContent>
                  Interactive storytelling benefits children from ages 4-12, with different applications for each age group. 
                  Younger children (4-6) benefit from simple stories with pictures, while older children (7-12) can engage 
                  with more complex narratives and writing exercises.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  How do I assess student progress with storytelling activities?
                </AccordionTrigger>
                <AccordionContent>
                  Focus on creativity, engagement, and comprehension rather than perfect grammar. Use rubrics that evaluate 
                  story structure, character development, creativity, and participation in discussions. Portfolio assessments 
                  work well for tracking progress over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Can these activities support different learning styles?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! Visual learners benefit from illustrations and coloring pages, auditory learners enjoy listening 
                  to stories and discussions, and kinesthetic learners can act out stories or create physical story props. 
                  The variety of activities ensures all learning styles are supported.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParentsTeachers;
