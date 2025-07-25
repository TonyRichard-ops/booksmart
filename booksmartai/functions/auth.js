import { createClient } from 'npm:@base44/sdk@0.1.0';

const base44 = createClient({
  appId: Deno.env.get('BASE44_APP_ID'), 
});

Deno.serve(async (req) => {
  try {
    const authHeader = req.headers.get('Authorization');
    
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      base44.auth.setToken(token);
    }

    const requestData = await req.json();
    const { operation, userData } = requestData;

    let result;
    switch (operation) {
      case 'me':
        result = await base44.auth.me();
        break;
      case 'logout':
        result = await base44.auth.logout();
        break;
      case 'login':
        result = await base44.auth.login();
        break;
      case 'updateMyUserData':
        result = await base44.entities.User.updateMyUserData(userData);
        break;
      default:
        throw new Error('Invalid auth operation');
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
