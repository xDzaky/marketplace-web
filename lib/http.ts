export function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
    ...init,
  });
}

export function badRequest(message: string, extra?: any) {
  return json({ error: message, ...(extra ?? {}) }, { status: 400 });
}

export function unauthorized(message = 'Unauthorized') {
  return json({ error: message }, { status: 401 });
}

export function notFound(message = 'Not found') {
  return json({ error: message }, { status: 404 });
}

