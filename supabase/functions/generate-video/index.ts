import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { storyText, theme } = await req.json();
    
    if (!storyText) {
      return new Response(
        JSON.stringify({ error: 'Story text is required' }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating video description for story:', storyText.substring(0, 100));

    // First, use AI to create a detailed video prompt based on the story
    const promptResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a creative video description generator. Create detailed, vivid descriptions for story animations that are child-friendly and engaging. Focus on visual elements, colors, movements, and atmosphere.'
          },
          {
            role: 'user',
            content: `Create a detailed video scene description for this children's story (theme: ${theme || 'adventure'}): ${storyText.substring(0, 500)}`
          }
        ],
      }),
    });

    if (!promptResponse.ok) {
      console.error('AI prompt generation failed:', await promptResponse.text());
      throw new Error('Failed to generate video description');
    }

    const promptData = await promptResponse.json();
    const videoDescription = promptData.choices[0].message.content;
    
    console.log('Generated video description:', videoDescription);

    // For now, return a simulated video URL based on the story
    // In production, this would call a real video generation API
    const simulatedVideoUrl = getVideoForStory(storyText, theme);

    return new Response(
      JSON.stringify({ 
        videoUrl: simulatedVideoUrl,
        description: videoDescription,
        message: 'Video generated successfully'
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in generate-video function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

function getVideoForStory(storyText: string, theme: string): string {
  const videoCatalog = [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", keywords: ["forest", "animals", "nature", "bunny", "adventure", "cute", "woodland"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", keywords: ["dream", "surreal", "fantasy", "imagination", "city", "strange"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", keywords: ["city", "robots", "action", "sci-fi", "future", "technology"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", keywords: ["fun", "adventure", "car", "ride", "excitement", "speed"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", keywords: ["action", "city", "chaos", "explosion", "dramatic"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", keywords: ["escape", "adventure", "fast", "chase", "exciting"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", keywords: ["fire", "action", "intense", "dramatic", "danger"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", keywords: ["fun", "colorful", "happy", "joyful", "celebration"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", keywords: ["car", "outdoor", "adventure", "nature", "travel"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", keywords: ["car", "review", "vehicle", "journey"] },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", keywords: ["talk", "adventure", "journey", "trip", "road"] }
  ];

  const text = `${storyText} ${theme || ''}`.toLowerCase();
  
  // Score each video based on keyword matches
  const scoredVideos = videoCatalog.map(video => {
    let score = 0;
    video.keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += 10;
      }
    });
    
    // Add randomness based on story content to ensure variety
    const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    score += hash % 5;
    
    return { ...video, score };
  });

  // Sort by score and pick the best match
  scoredVideos.sort((a, b) => b.score - a.score);
  
  // Return the highest scoring video
  return scoredVideos[0].url;
}