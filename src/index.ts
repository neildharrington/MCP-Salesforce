export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    // Redirect to OAuth provider
    if (url.pathname === '/login') {
      const authUrl = new URL('https://provider.com/oauth/authorize');
      authUrl.searchParams.set('client_id', env.CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', env.REDIRECT_URI);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', 'user:email'); // adjust as needed
      return Response.redirect(authUrl.toString());
    }
    // Handle callback from provider
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });
      // Exchange code for token
      const tokenUrl = 'https://provider.com/oauth/access_token';
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: env.CLIENT_ID,
          client_secret: env.CLIENT_SECRET,
          code,
          redirect_uri: env.REDIRECT_URI,
        }),
      });
      const data = await response.json();
      if (!data.access_token) return new Response('Failed to get token', { status: 400 });
      // Optionally: Store token securely or return it to the client
      return new Response(JSON.stringify({ access_token: data.access_token }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response('Not found', { status: 404 });
  }
};
