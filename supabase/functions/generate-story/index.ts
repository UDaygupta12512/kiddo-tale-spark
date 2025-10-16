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
    const { mainCharacter, setting, theme, details, tone = 'adventurous', moralFocus = 50 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const toneGuide = {
      funny: 'humorous and playful, with silly moments and wordplay',
      adventurous: 'exciting and action-packed, with thrilling moments',
      mystery: 'intriguing and suspenseful, with clues and discoveries',
      heartwarming: 'gentle and touching, with emotional warmth',
      educational: 'informative and engaging, teaching new concepts naturally'
    };

    const moralGuidance = moralFocus < 30 
      ? 'Weave the moral subtly through the story without explicitly stating it.'
      : moralFocus >= 70 
      ? 'Make the moral lesson prominent and clearly stated at the end.'
      : 'Include a clear but gentle moral that emerges naturally from the story.';

    const prompt = `Write a delightful children's story (400-700 words) for ages 4-10.
- Main character: ${mainCharacter}
- Setting: ${setting}
- Theme: ${theme}
- Extra details: ${details || 'N/A'}
- Tone: ${toneGuide[tone as keyof typeof toneGuide] || toneGuide.adventurous}
- Moral guidance: ${moralGuidance}

Requirements:
- Use a ${tone} tone throughout the story
- Clear beginning, middle, and end with gentle conflict and resolution
- Simple vocabulary suited for kids
- Add light dialogue and sensory details
- ${moralFocus >= 30 ? 'Conclude with a short, kid-friendly moral on the last line starting with "Moral:"' : 'Let the moral emerge naturally from the story events'}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a kind children\'s storyteller. Keep stories vivid, wholesome, and age-appropriate.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error (generate-story):', response.status, errorText);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    const storyText: string | undefined = data.choices?.[0]?.message?.content;
    if (!storyText) throw new Error('No story generated');

    return new Response(
      JSON.stringify({ storyText }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-story function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});