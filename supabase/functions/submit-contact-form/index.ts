import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    // Create Supabase client with service role key (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { name, email, phone, message }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Nome, email e mensagem são obrigatórios" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Email inválido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Processing contact form submission for:", email);

    // First, check if customer already exists
    const { data: existingCustomer, error: customerCheckError } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (customerCheckError) {
      console.error("Error checking existing customer:", customerCheckError);
      throw customerCheckError;
    }

    let customerId: string;

    if (existingCustomer) {
      customerId = existingCustomer.id;
      console.log("Found existing customer:", customerId);
    } else {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert([{
          full_name: name,
          email: email,
          phone: phone || null,
        }])
        .select("id")
        .single();

      if (customerError) {
        console.error("Error creating customer:", customerError);
        throw customerError;
      }

      customerId = newCustomer.id;
      console.log("Created new customer:", customerId);
    }

    // Generate ticket number
    const ticketNumber = `WEB-${Date.now().toString().slice(-6)}`;

    // Create support ticket
    const { data: ticket, error: ticketError } = await supabase
      .from("support_tickets")
      .insert([{
        ticket_number: ticketNumber,
        customer_id: customerId,
        subject: "Novo contato via website",
        description: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone || "Não informado"}\n\nMensagem:\n${message}`,
        status: "open",
        priority: "medium"
      }])
      .select("id, ticket_number")
      .single();

    if (ticketError) {
      console.error("Error creating support ticket:", ticketError);
      throw ticketError;
    }

    console.log("Successfully created support ticket:", ticket.ticket_number);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Mensagem enviada com sucesso!",
        ticket_number: ticket.ticket_number
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in submit-contact-form function:", error);
    return new Response(
      JSON.stringify({
        error: "Erro interno do servidor",
        details: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);