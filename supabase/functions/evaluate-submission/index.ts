import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { submissionId } = await req.json();

    if (!submissionId) {
      throw new Error('Submission ID is required');
    }

    // Get submission details
    const { data: submission, error: submissionError } = await supabaseClient
      .from('submissions')
      .select(`
        *,
        assignment:assignments(title, description, instructions, max_points),
        student:profiles!submissions_student_id_fkey(full_name)
      `)
      .eq('id', submissionId)
      .single();

    if (submissionError || !submission) {
      throw new Error('Submission not found');
    }

    // Check if evaluation already exists
    const { data: existingEvaluation } = await supabaseClient
      .from('evaluations')
      .select('*')
      .eq('submission_id', submissionId)
      .single();

    if (existingEvaluation) {
      return new Response(
        JSON.stringify({ evaluation: existingEvaluation }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare AI evaluation prompt
    const prompt = `
You are an expert academic evaluator. Please evaluate the following student submission:

**Assignment:** ${submission.assignment.title}
**Description:** ${submission.assignment.description}
**Instructions:** ${submission.assignment.instructions || 'No specific instructions provided'}
**Maximum Points:** ${submission.assignment.max_points}

**Student Submission:**
${submission.content}

Please provide:
1. A score out of ${submission.assignment.max_points} points
2. Detailed feedback explaining the score
3. At least 2 strengths of the submission
4. At least 2 areas for improvement

Respond in JSON format:
{
  "score": number,
  "feedback": "detailed feedback",
  "strengths": ["strength1", "strength2", ...],
  "improvements": ["improvement1", "improvement2", ...]
}
`;

    // Call OpenAI for evaluation
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert academic evaluator. Always respond with valid JSON in the exact format requested.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${await openAIResponse.text()}`);
    }

    const openAIData = await openAIResponse.json();
    const evaluationText = openAIData.choices[0].message.content;

    // Parse the AI response
    let evaluation;
    try {
      evaluation = JSON.parse(evaluationText);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      evaluation = {
        score: Math.floor(submission.assignment.max_points * 0.75), // Default to 75%
        feedback: evaluationText,
        strengths: ["Submission received and processed"],
        improvements: ["Review assignment requirements carefully"]
      };
    }

    // Ensure score is within bounds
    evaluation.score = Math.min(Math.max(evaluation.score, 0), submission.assignment.max_points);

    // Save evaluation to database
    const { data: savedEvaluation, error: saveError } = await supabaseClient
      .from('evaluations')
      .insert({
        submission_id: submissionId,
        score: evaluation.score,
        feedback: evaluation.feedback,
        strengths: evaluation.strengths || [],
        improvements: evaluation.improvements || []
      })
      .select()
      .single();

    if (saveError) {
      throw new Error(`Failed to save evaluation: ${saveError.message}`);
    }

    return new Response(
      JSON.stringify({ evaluation: savedEvaluation }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in evaluate-submission function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});