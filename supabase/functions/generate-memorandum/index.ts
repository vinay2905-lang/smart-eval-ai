import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { evaluationId, studentName, hallTicket, subject, score, maxPoints, feedback, strengths, improvements } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Generating memorandum for evaluation:', evaluationId);

    // Generate memorandum content using OpenAI
    const prompt = `Generate a professional, official marks memorandum for a student examination. The memorandum should be formal, structured, and look authentic.

Student Details:
- Name: ${studentName}
- Hall Ticket: ${hallTicket}
- Subject: ${subject}
- Score: ${score}/${maxPoints}
- Percentage: ${Math.round((score / maxPoints) * 100)}%

Evaluation Details:
- Overall Feedback: ${feedback}
- Key Strengths: ${strengths?.join(', ') || 'N/A'}
- Areas for Improvement: ${improvements?.join(', ') || 'N/A'}

Please create a formal memorandum that includes:
1. Official header with examination board details
2. Student identification section
3. Subject and examination details
4. Marks breakdown and analysis
5. Performance evaluation
6. Official seal/signature section
7. Date and reference number

Make it look professional and official. Use proper formatting with clear sections. Include realistic examination board details and make it appear authentic.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in creating official educational documents. Generate professional, formal marks memorandums that look authentic and official. Use proper formatting, official language, and include all necessary elements of a formal examination document.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const memorandumContent = data.choices[0].message.content;

    console.log('Generated memorandum content');

    // Create HTML formatted memorandum
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marks Memorandum - ${hallTicket}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
        }
        .board-name {
            font-size: 18px;
            margin: 10px 0;
            color: #34495e;
        }
        .memo-title {
            font-size: 20px;
            font-weight: bold;
            margin: 20px 0;
            text-decoration: underline;
        }
        .content {
            white-space: pre-line;
            text-align: justify;
        }
        .signature-section {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }
        .date {
            text-align: right;
            margin-top: 20px;
            font-style: italic;
        }
        @media print {
            body { margin: 0; padding: 15px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">🎓 EXAMINATION BOARD</div>
        <div class="board-name">ACADEMIC EVALUATION AUTHORITY</div>
        <div class="memo-title">MARKS MEMORANDUM</div>
    </div>
    
    <div class="content">
${memorandumContent}
    </div>
    
    <div class="signature-section">
        <div>
            <p><strong>Authorized Signature</strong></p>
            <p>_____________________</p>
            <p>Examination Controller</p>
        </div>
        <div>
            <p><strong>Official Seal</strong></p>
            <p style="border: 2px solid #000; padding: 20px; text-align: center; width: 100px;">
                OFFICIAL<br>SEAL
            </p>
        </div>
    </div>
    
    <div class="date">
        Generated on: ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
    </div>
</body>
</html>`;

    // Upload to Supabase Storage
    const fileName = `memorandum_${hallTicket}_${Date.now()}.html`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('marks-memorandums')
      .upload(fileName, htmlContent, {
        contentType: 'text/html',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Failed to upload memorandum: ${uploadError.message}`);
    }

    console.log('Uploaded memorandum to storage:', uploadData);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('marks-memorandums')
      .getPublicUrl(fileName);

    const memorandumUrl = urlData.publicUrl;

    // Update evaluation record with memorandum URL
    const { error: updateError } = await supabase
      .from('evaluations')
      .update({ memorandum_file_url: memorandumUrl })
      .eq('id', evaluationId);

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error(`Failed to update evaluation: ${updateError.message}`);
    }

    console.log('Updated evaluation with memorandum URL');

    return new Response(JSON.stringify({ 
      success: true, 
      memorandumUrl,
      message: 'Memorandum generated successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-memorandum function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});