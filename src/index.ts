// Create this file: src/index.ts
export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello world from Worker!");
  }
}
