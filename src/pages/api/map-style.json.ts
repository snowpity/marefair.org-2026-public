// src/pages/api/map-style.json.ts
/*
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const mapApiKey = import.meta.env.MAP_API;

  // Fetch the map style from MapTiler on the server
  const response = await fetch(
    `https://api.maptiler.com/maps/aquarelle/style.json?key=${mapApiKey}`
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
*/