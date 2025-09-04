import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";

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
    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { email, full_name, role, invitation_token, invited_by } = await req.json();

    // Validate admin permissions
    const { data: inviterProfile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('user_id', invited_by)
      .single();

    if (!inviterProfile || inviterProfile.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can send invitations');
    }

    // Check if user already exists
    const { data: existingUser, error: userError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
    
    if (existingUser.user && !userError) {
      // User already exists, just update their role in profiles table
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ role })
        .eq('email', email);
        
      if (updateError) {
        console.error('Error updating user role:', updateError);
        throw new Error('Erro ao atualizar papel do usuário: ' + updateError.message);
      }
      
      console.log('User role updated successfully:', { email, role });
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Usuário já cadastrado. Papel atualizado com sucesso.',
          data: { user: existingUser.user }
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
    
    // User doesn't exist, send invitation
    const redirectTo = `${req.headers.get('origin') || 'http://localhost:5173'}/auth/accept-invitation?token=${invitation_token}`;

    // Send invitation using Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
      data: {
        full_name,
        role,
        invitation_token,
        invited_by
      }
    });

    if (error) {
      console.error('Error sending invitation:', error);
      throw error;
    }

    console.log('Invitation sent successfully:', { email, full_name, role });

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-team-invitation function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});