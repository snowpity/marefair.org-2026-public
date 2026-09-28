// ID list must be separate the other list
export const ACHIEVEMENT_IDS = [
	'mirin',
	'fortune_teller',
	'code_of_conduct',
	'portal_discovery',
	'cant_afford',
	'first_news',
	'comics',
	'criminally_rich',
	'broken_snoots',
	'mare_erasure',
	'princess',
	'map',
	'schedule'
] as const;

export type AchievementId = (typeof ACHIEVEMENT_IDS)[number];