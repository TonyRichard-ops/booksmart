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

    const { entity, operation, data, id, filters, sort, limit } = await req.json();

    let result;
    switch (operation) {
      case 'list':
        result = await base44.entities[entity].list(sort, limit);
        break;
      case 'filter':
        result = await base44.entities[entity].filter(filters, sort, limit);
        break;
      case 'create':
        result = await base44.entities[entity].create(data);
        break;
      case 'update':
        result = await base44.entities[entity].update(id, data);
        break;
      case 'delete':
        result = await base44.entities[entity].delete(id);
        break;
      default:
        throw new Error('Invalid operation');
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
