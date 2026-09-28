export const onRequestGet: PagesFunction<{ DB: D1Database }> = async (context) => {
  const [unlocks, totalPlayers] = await Promise.all([
    context.env.DB.prepare(
      `SELECT achievement_id, COUNT(*) as unlock_count FROM achievement_unlocks GROUP BY achievement_id`
    ).all() as Promise<D1Result<{ achievement_id: string; unlock_count: number }>>,
    context.env.DB.prepare(
      `SELECT COUNT(DISTINCT ip_hash) as total FROM achievement_unlocks`
    ).first() as Promise<{ total: number } | null>,
  ]);

  return Response.json(
    {
      achievements: unlocks.results,
      totalPlayers: totalPlayers?.total ?? 0,
    },
    {
      headers: {
        // Global stats aren't user-specific and don't need to be fresh to
        // the second - cache at the edge for a minute to cut down on D1 reads.
        "Cache-Control": "public, max-age=60",
      },
    }
  );
};