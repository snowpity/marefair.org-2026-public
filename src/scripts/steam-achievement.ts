// src/lib/steam-achievements.ts
// Complete achievement system - all logic in one place

import type { ImageMetadata } from 'astro';

// Import all achievement icons
import fortuneTellerMare from '@assets/steam/FortuneTellerAchievement.png';
import HallOfFame from '@assets/steam/HallOfFameAchievement.png';
import potion from '@assets/steam/NotEnoughBudgetAchievement.png';
import CoC from '@assets/steam/ReadCOCAchievement.png';
import news from '@assets/steam/NewsAchievement.png';
import portal from '@assets/steam/PortalToEquestriaAchievement.png';
import yamcha from '@assets/steam/YamchaAchievement.png';
import toast from '@assets/steam/CheersAchievement.png';
import boop from '@assets/steam/BoopAchievement.png';
import mareErasure from '@assets/steam/MareErasureAchievement.png';
import savePrincess from '@assets/steam/SavePrincessAchievement.png';
import map from '@assets/steam/MapAchievement.png';
import schedule from '@assets/schedules/RatingsVectorsUnrated.png';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Achievement {
	id: string;
	title: string;
	description: string;
	isSecret: boolean;
	icon: string | ImageMetadata;
}

interface AchievementData {
	unlocked: boolean;
	unlockDate?: string;
	// Whether this unlock has been successfully reported to /api/achievements/unlock.
	// Older achievements unlocked before this field existed (or unlocks that were
	// reported while offline/the endpoint was failing) will be missing this or have
	// it set to false, and get reconciled by syncUnlockedAchievements() on load.
	synced?: boolean;
}

// ============================================
// ACHIEVEMENT DEFINITIONS
// ============================================

export const messageLines = [
	"Hello cheaters! Since Astro wipes all of the comments during build,",
	"this is the only way I can leave you a message.",
	"Your mom will die in her sleep tonight if you don't leave a message. The Game.",

	"Now that we left enmity behind, since you're digging into the codes, you obviously",
	"are looking for something special.",
	"Here are some nice commands to run in the console:",
	"document.cookie = 'steam_achievements=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/'; -- Clears all achievements",
	"window.steamAchievements.unlock('id');                                                -- Unlocks an achievement given an ID",
];

import { ACHIEVEMENT_IDS, type AchievementId } from '@scripts/steam-id';
export { ACHIEVEMENT_IDS, type AchievementId };

export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
    mirin: {
		id: 'mirin',
		title: 'Mirin’',
		description: 'I just really like the art on the front page.',
		isSecret: false,
		icon: toast,
	},
    fortune_teller: {
		id: 'fortune_teller',
		title: 'Who knows what the future holds',
		description: 'Ask the Fortune Teller Mare to predict your future.',
		isSecret: false,
		icon: fortuneTellerMare,
	},
	code_of_conduct: {
		id: 'code_of_conduct',
		title: 'Abide by the Mare CoC',
		description: 'We know where you live if you misbehave.',
		isSecret: false,
		icon: CoC,
	},
	portal_discovery: {
		id: 'portal_discovery',
		title: 'Equestria, Pretoria',
		description: 'Discover the Portal to Equestria.',
		isSecret: false,
		icon: portal,
	},
	cant_afford: {
		id: 'cant_afford',
		title: "You can't afford that, traveller",
		description: "It's out of your budget, traveller.",
		isSecret: false,
		icon: potion,
	},
	first_news: {
		id: 'first_news',
		title: 'What news is old',
		description: 'Read the oldest news.',
		isSecret: false,
		icon: news,
	},
	comics: {
		id: 'comics',
		title: 'Isekai’d',
		description: 'No way they left it as a cliffhanger?!',
		isSecret: false,
		icon: yamcha,
	},
	criminally_rich: {
		id: 'criminally_rich',
		title: 'Criminally rich',
		description: 'Who said you can’t buy prestige?',
		isSecret: false,
		icon: HallOfFame,
	},
	broken_snoots: {
		id: 'broken_snoots',
		title: 'Broken Snoots',
		description: 'Break the mascot’s noses by booping each 10 times',
		isSecret: false,
		icon: boop,
	},
	mare_erasure: {
		id: 'mare_erasure',
		title: 'Mare Erasure',
		description: 'You heartless bastard',
		isSecret: false,
		icon: mareErasure,
	},
	princess: {
		id: 'princess',
		title: 'A Happy Ending',
		description: 'You saved the princess!',
		isSecret: false,
		icon: savePrincess,
	},
	map: {
		id: 'map',
		title: 'I solemnly swear',
		description: 'Mare Fair is up to no good',
		isSecret: false,
		icon: map,
	},
	schedule: {
		id: 'schedule',
		title: 'Twilight would be proud',
		description: 'Add an event to My Schedule',
		isSecret: false,
		icon: schedule,
	},
};

// Store processed icon URLs (set by Layout.astro at build time), keyed by
// achievement id.
let processedIcons: Record<string, string> = {};

export function setProcessedIcons(icons: Record<string, string>) {
	processedIcons = icons;
}

// Helper function to get the ImageMetadata object for Astro's Image component.
// Returns null for emoji-icon achievements (icon is a plain string, not an image).
export function getIconMetadata(id: AchievementId): ImageMetadata | null {
	const icon = ACHIEVEMENTS[id]?.icon;
	return typeof icon === 'string' ? null : icon ?? fortuneTellerMare;
}

// Helper function to get optimized icon path for runtime use (toast), keyed
// by achievement id.
export function getIconSrc(id: AchievementId): string {
	return processedIcons[id];
}

// ============================================
// COOKIE MANAGEMENT
// ============================================

function setCookie(name: string, value: string, days?: number) {
	if (days !== undefined) {
		const expires = new Date();
		expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
		document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
	} else {
		document.cookie = `${name}=${value};path=/`;
	}
}

function getCookie(name: string): string | null {
	const nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

// ============================================
// ACHIEVEMENT STORAGE
// ============================================

function loadAchievements(): Record<string, AchievementData> {
	const achievementsCookie = getCookie('steam_achievements');
	if (achievementsCookie) {
		try {
			return JSON.parse(decodeURIComponent(achievementsCookie));
		} catch (e) {
			console.error('Failed to parse achievements cookie:', e);
			return {};
		}
	}
	return {};
}

function saveAchievements(achievements: Record<string, AchievementData>) {
	const encoded = encodeURIComponent(JSON.stringify(achievements));
	setCookie('steam_achievements', encoded, 3650); // 10 years
}

// ============================================
// UNLOCK REPORTING / RECONCILIATION
// ============================================

// POSTs a single unlock to the server and marks it synced locally on success.
// Fire-and-forget from the caller's perspective - failures are swallowed since
// syncUnlockedAchievements() will retry on the next page load.
function reportAchievementUnlock(achievementId: string) {
	fetch('/api/achievements/unlock', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ achievement_id: achievementId }),
	})
		.then(res => {
			if (!res.ok) return;
			const achievements = loadAchievements();
			if (achievements[achievementId]) {
				achievements[achievementId].synced = true;
				saveAchievements(achievements);
			}
		})
		.catch(() => {
			// Network error / offline - leave unsynced, syncUnlockedAchievements()
			// will pick it up on the next load.
		});
}

// Reconciles achievements that are unlocked locally but were never (or not yet)
// successfully reported to the server - e.g. achievements unlocked before this
// syncing existed, or unlocks whose original POST failed. The server endpoint is
// INSERT OR IGNORE, so re-reporting an already-recorded unlock is harmless.
function syncUnlockedAchievements() {
	const achievements = loadAchievements();
	Object.entries(achievements)
		.filter(([, data]) => data.unlocked && !data.synced)
		.forEach(([achievementId]) => reportAchievementUnlock(achievementId));
}

// ============================================
// TOAST NOTIFICATION
// ============================================

function showAchievementToast(achievementId: string) {
	const existingToast = document.querySelector('.achievement-toast');
	if (existingToast) {
		existingToast.remove();
	}

	const toast = document.createElement('div');
	toast.className = 'achievement-toast';

	// Get achievement data from ACHIEVEMENTS constant
	const achievement = ACHIEVEMENTS[achievementId];
	if (!achievement) {
		console.error(`Achievement ${achievementId} not found`);
		return;
	}

	// Build icon HTML
	let iconHTML: string;
	if (typeof achievement.icon === 'string') {
		iconHTML = `<span class="text-2xl">${achievement.icon}</span>`;
	} else {
		const iconSrc = getIconSrc(achievementId as AchievementId);
		iconHTML = `<img src="${iconSrc}" alt="${achievement.title}" style="width: 100%; height: 100%; object-fit: contain;" />`;
	}

	toast.innerHTML = `
		<div class="achievement-toast-header">Achievement Unlocked</div>
		<div class="achievement-toast-content">
			<div class="achievement-toast-icon">
				${iconHTML}
			</div>
			<div class="achievement-toast-text">
				<div class="achievement-toast-title">${achievement.title}</div>
				<div class="achievement-toast-description">${achievement.description}</div>
			</div>
		</div>
	`;

	document.body.appendChild(toast);

	setTimeout(() => {
		toast.classList.add('show');
        if (achievementAudio) {
            achievementAudio.currentTime = 0; // Reset to start
            achievementAudio.play().catch(e => console.log("Failed to play sound:", e));
        }
	}, 100);

	setTimeout(() => {
		toast.classList.remove('show');
		setTimeout(() => toast.remove(), 500);
	}, 5000); // 5 seconds
}

// ============================================
// ACHIEVEMENT PANEL UPDATES
// ============================================

function updateAchievementPanel() {
	const achievements = loadAchievements();
	const achievementItems = document.querySelectorAll('.achievement-item');

	achievementItems.forEach((item) => {
		const achievementId = item.getAttribute('data-achievement-id');
		if (!achievementId) return;

		const data = achievements[achievementId];
		if (data?.unlocked) {
			item.classList.remove('opacity-50');

			const icon = item.querySelector('.achievement-icon');
			if (icon) {
				icon.classList.remove('bg-gradient-to-br', 'from-[#3d3d3d]', 'to-[#2d2d2d]');
				icon.classList.add('bg-gradient-to-br', 'from-[#f39c12]', 'to-[#e67e22]');

				// Also update the image opacity if it exists
				const img = icon.querySelector('img');
				if (img) {
					img.classList.remove('opacity-30');
					img.style.opacity = '1';
				}
			}

			const dateContainer = item.querySelector('.achievement-unlock-date');
			if (dateContainer && data.unlockDate) {
				dateContainer.textContent = `Unlocked ${data.unlockDate}`;
			}
		}
	});

	// Update stats
	const totalAchievements = achievementItems.length;
	const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
	const percentage = totalAchievements > 0 ? Math.round((unlockedCount / totalAchievements) * 100) : 0;

	const unlockedEl = document.querySelector('#steam-unlocked-count');
	const totalEl = document.querySelector('#steam-total-count');
	const percentageEl = document.querySelector('#steam-percentage');
	const progressBar = document.querySelector('#steam-progress-bar');

	if (unlockedEl) unlockedEl.textContent = unlockedCount.toString();
	if (totalEl) totalEl.textContent = totalAchievements.toString();
	if (percentageEl) percentageEl.textContent = `(${percentage}%)`;
	if (progressBar) {
		(progressBar as HTMLElement).style.width = `${percentage}%`;
	}
}

// ============================================
// CORE ACHIEVEMENT FUNCTIONS
// ============================================

function unlockAchievementCore(achievementId: string): boolean {
	const achievementCheck = ACHIEVEMENTS[achievementId];
    if (!achievementCheck) {
        console.error(`Achievement ${achievementId} not found`);
        return false;
    }

	const achievements = loadAchievements();

	if (achievements[achievementId]?.unlocked) {
		console.log(`Achievement "${achievementId}" already unlocked`);
		return false;
	}

	achievements[achievementId] = {
		unlocked: true,
		unlockDate: new Date().toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		})
	};

	saveAchievements(achievements);

	reportAchievementUnlock(achievementId);

	showAchievementToast(achievementId); // Only pass ID now
	updateAchievementPanel();

	const achievement = ACHIEVEMENTS[achievementId];
	console.log(`Achievement unlocked: ${achievement?.title || achievementId}`);
	return true;
}

function isAchievementUnlockedCore(achievementId: string): boolean {
	const achievements = loadAchievements();
	return achievements[achievementId]?.unlocked || false;
}

function getAchievementDataCore(achievementId: string): AchievementData | null {
	const achievements = loadAchievements();
	return achievements[achievementId] || null;
}

// ============================================
// GLOBAL API SETUP
// ============================================

let achievementAudio: HTMLAudioElement | null = null;

export function initializeAchievementSystem() {
	// Pick up the processed icons that were set by Layout.astro
	if ((window as any).__processedIcons) {
		processedIcons = (window as any).__processedIcons;
		//console.log('Processed icons loaded:', Object.keys(processedIcons));
	}

	// Preload the audio
    achievementAudio = new Audio('/audio/desktop_toast_default.wav');
    achievementAudio.preload = 'auto';
    achievementAudio.load();

	// Expose achievement functions globally
	(window as any).steamAchievements = {
		unlock: unlockAchievementCore,
		isUnlocked: isAchievementUnlockedCore,
		getData: getAchievementDataCore,
		loadAll: loadAchievements,
		updatePanel: updateAchievementPanel
	};

	// Report any locally-unlocked achievements that never made it to the server
	// (e.g. unlocked before this reporting existed, or a prior POST failed).
	syncUnlockedAchievements();

	console.log('Achievement system initialized');
}

// ============================================
// GLOBAL ACHIEVEMENT STATS
// ============================================

interface GlobalStatsResponse {
	achievements: { achievement_id: string; unlock_count: number }[];
	totalPlayers: number;
}

let globalStatsCache: GlobalStatsResponse | null = null;

async function fetchGlobalStats(): Promise<GlobalStatsResponse | null> {
	if (globalStatsCache) return globalStatsCache;

	try {
		const res = await fetch('/api/achievements/stats');
		if (!res.ok) return null;
		const data = (await res.json()) as GlobalStatsResponse;
		globalStatsCache = data;
		return data;
	} catch (e) {
		console.error('Failed to load global achievement stats:', e);
		return null;
	}
}

async function renderGlobalAchievements() {
	const container = document.querySelector('#global-achievements-list');
	if (!container) return;

	container.innerHTML = `<div class="text-center text-white/50 text-xs py-8">Loading global stats…</div>`;

	const stats = await fetchGlobalStats();
	if (!stats) {
		container.innerHTML = `<div class="text-center text-white/50 text-xs py-8">Couldn't load global stats. Try again later.</div>`;
		return;
	}

	const countByAchievement: Record<string, number> = {};
	stats.achievements.forEach(a => {
		countByAchievement[a.achievement_id] = a.unlock_count;
	});
	const totalPlayers = stats.totalPlayers;

	const rows = getAllAchievementIds()
		.map(id => {
			const achievement = ACHIEVEMENTS[id];
			const count = countByAchievement[id] || 0;
			const percentage = totalPlayers > 0 ? Math.round((count / totalPlayers) * 100) : 0;
			const unlocked = isAchievementUnlockedCore(id);
			return { achievement, percentage, unlocked };
		})
		// Steam-style: most commonly unlocked first
		.sort((a, b) => b.percentage - a.percentage);

	const checkmarkSvg = `
		<svg viewBox="0 0 24 24" class="w-4 h-4 text-[#c7d5e0]" fill="currentColor">
			<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
		</svg>
	`;

	container.innerHTML = rows
		.map(({ achievement, percentage, unlocked }) => {
			const iconSrc = getIconSrc(achievement.id as AchievementId);
			return `
				<div class="achievement-item relative overflow-hidden flex gap-3 px-4 py-3 border-b border-black/30 hover:bg-white/[0.05] transition-colors">
					<!-- Fill bar: width mirrors the % of players who have this achievement -->
					<div class="absolute inset-y-0 left-0 bg-white/[0.06] transition-all duration-500 pointer-events-none" style="width: ${percentage}%;"></div>

					<!-- Checkmark column: only filled if the local player has this achievement -->
					<div class="relative z-10 w-5 flex-shrink-0 flex justify-center items-center pt-1.5">
						${unlocked ? checkmarkSvg : ''}
					</div>

					<div class="achievement-icon relative z-10 w-12 h-12 hover:scale-150 transition-transform select-none rounded flex-shrink-0 flex items-center justify-center text-2xl shadow-lg bg-gradient-to-br from-[#f39c12] to-[#e67e22]">
						<img src="${iconSrc}" alt="${achievement.title}" style="width: 100%; height: 100%; object-fit: contain;" />
					</div>
					<div class="relative z-10 flex-1 min-w-0">
						<div class="flex justify-between items-start mb-1">
							<div class="text-[#c7d5e0] text-[13px] font-medium">${achievement.title}</div>
							<div class="text-[#66c0f4] text-[11px] whitespace-nowrap ml-2">${percentage}%</div>
						</div>
						<div class="text-[#8f98a0] text-[11px] leading-relaxed mb-0.5">${achievement.description}</div>
					</div>
				</div>
			`;
		})
		.join('');
}

// ============================================
// TAB SWITCHING (IN PROGRESS / MY / GLOBAL)
// ============================================

export function initializeAchievementTabs() {
	const tabs = document.querySelectorAll<HTMLElement>('[data-achievement-tab]');
	const myList = document.querySelector<HTMLElement>('#achievements-list');
	const globalList = document.querySelector<HTMLElement>('#global-achievements-list');

	if (!tabs.length || !myList || !globalList) return;

	const activateTab = (target: string) => {
		tabs.forEach(tab => {
			const isActive = tab.dataset.achievementTab === target;
			tab.classList.toggle('bg-neutral-700', isActive);
			tab.classList.toggle('rounded-full', isActive);
			tab.classList.toggle('px-4', isActive);
		});

		if (target === 'global') {
			myList.classList.add('hidden');
			globalList.classList.remove('hidden');
			renderGlobalAchievements();
			return;
		}

		globalList.classList.add('hidden');
		myList.classList.remove('hidden');

		myList.querySelectorAll<HTMLElement>('.achievement-item').forEach(item => {
			if (target === 'in-progress') {
				// "In progress" = anything not yet unlocked locally.
				item.classList.toggle('hidden', !item.classList.contains('opacity-50'));
			} else {
				item.classList.remove('hidden');
			}
		});
	};

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const target = tab.dataset.achievementTab;
			if (target) activateTab(target);
		});
	});
}

// ============================================
// HELPER FUNCTIONS FOR IMPORTS
// ============================================

export function getAchievement(id: string) {
	return ACHIEVEMENTS[id];
}

export function getAllAchievementIds(): string[] {
	return Object.keys(ACHIEVEMENTS);
}

export function createUnlockData(id: string, iconOverride?: string) {
	const achievement = ACHIEVEMENTS[id];
	if (!achievement) {
		console.error(`Achievement with id "${id}" not found`);
		return null;
	}

	return {
		id: achievement.id,
		title: achievement.title,
		description: achievement.description,
		// achievement.id doubles as the lookup key into processedIcons for image
		// icons; emoji icons are passed through as-is.
		icon: iconOverride || (typeof achievement.icon === 'string' ? achievement.icon : achievement.id),
		isSecret: achievement.isSecret,
	};
}

// ============================================
// SAFE WRAPPER FUNCTIONS
// ============================================

export function hasSteamAchievements(): boolean {
	return typeof window !== 'undefined' && 'steamAchievements' in window;
}

export function unlockAchievement(id: string, iconOverride?: string): boolean {
	if (!hasSteamAchievements()) {
		console.warn('Steam achievement system not loaded yet');
		return false;
	}

	const unlockData = createUnlockData(id, iconOverride);
	if (!unlockData) return false;

	return (window as any).steamAchievements.unlock(id, unlockData);
}

export function isAchievementUnlocked(id: string): boolean {
	if (!hasSteamAchievements()) return false;
	return (window as any).steamAchievements.isUnlocked(id);
}

export function getAchievementData(id: string) {
	if (!hasSteamAchievements()) return null;
	return (window as any).steamAchievements.getData(id);
}

export function getAllUnlockedAchievements() {
	if (!hasSteamAchievements()) return {};
	return (window as any).steamAchievements.loadAll();
}

export function updatePanel() {
	if (!hasSteamAchievements()) return;
	(window as any).steamAchievements.updatePanel();
}