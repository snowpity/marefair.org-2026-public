// src/types/steam-achievements.d.ts

interface Achievement {
	id: string;
	title: string;
	description: string;
	icon?: string;
	isSecret?: boolean;
}

interface AchievementData {
	unlocked: boolean;
	unlockDate?: string;
}

interface SteamAchievements {
	/**
	 * Unlock an achievement
	 * @param achievementId - Unique achievement ID
	 * @param achievement - Achievement data object
	 * @returns true if unlocked, false if already unlocked
	 */
	unlock(achievementId: string): boolean;

	/**
	 * Check if an achievement is unlocked
	 * @param achievementId - Unique achievement ID
	 * @returns true if unlocked, false otherwise
	 */
	isUnlocked(achievementId: string): boolean;

	/**
	 * Get achievement data
	 * @param achievementId - Unique achievement ID
	 * @returns Achievement data or null if not found
	 */
	getData(achievementId: string): AchievementData | null;

	/**
	 * Load all achievements
	 * @returns Record of all achievements
	 */
	loadAll(): Record<string, AchievementData>;
}

declare global {
	interface Window {
		steamAchievements: SteamAchievements;
	}
}

export {};