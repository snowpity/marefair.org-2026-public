// src/scripts/my-schedule-store.ts
// Shared localStorage helpers for the personal schedule feature.

const STORAGE_KEY = 'mare-fair-my-schedule';
const NAME_FALLBACK_PREFIX = 'name:';

export interface SavedEventRef {
    id: string;
    name: string;
    addedAt: number;
}

/** A fully "hydrated" event, resolved from the live DOM at render time. */
export interface SavedEvent {
    id: string;
    name: string;
    business_name: string;
    'context-id': string;
    rating: string;
    startTime: string;
    endTime: string;
    room: string;
    day: string;
    /** True when this id couldn't be found on the current page - fields above are best-effort. */
    stale?: boolean;
}

function slugifyName(name: string): string {
    return NAME_FALLBACK_PREFIX + name.trim().toLowerCase();
}

function isRealContextId(id: string): boolean {
    return !!id && !id.startsWith(NAME_FALLBACK_PREFIX);
}

/** Builds the stable identifier used to key a saved panel. Prefers context-id; falls back to name. */
export function makeEventId(contextId: string | undefined | null, name: string): string {
    const trimmed = (contextId || '').trim();
    return trimmed ? trimmed : slugifyName(name || '');
}

// -- Storage (ids only) ----------------------------------------------------------

function migrateLegacyEntry(raw: any): SavedEventRef | null {
    if (!raw || typeof raw !== 'object') return null;

    const name = raw.name || '';
    const contextId = raw['context-id'] || raw.context_id || '';
    const id = raw.id || makeEventId(contextId, name);
    if (!id) return null;

    return {
        id,
        name,
        addedAt: typeof raw.addedAt === 'number' ? raw.addedAt : Date.now(),
    };
}

export function getSavedRefs(): SavedEventRef[] {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (!Array.isArray(parsed)) return [];

        const refs = parsed
            .map(migrateLegacyEntry)
            .filter((r): r is SavedEventRef => r !== null);

        // De-dupe by id
        const byId = new Map<string, SavedEventRef>();
        for (const ref of refs) {
            const existing = byId.get(ref.id);
            if (!existing || ref.addedAt < existing.addedAt) byId.set(ref.id, ref);
        }
        return [...byId.values()];
    } catch {
        return [];
    }
}

export function saveSavedRefs(refs: SavedEventRef[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(refs));
}

export function isIdSaved(id: string): boolean {
    return getSavedRefs().some(r => r.id === id);
}

/** Returns true if the event was added, false if it was removed. */
export function toggleEventRef(ref: { id: string; name: string }): boolean {
    const current = getSavedRefs();
    const idx = current.findIndex(r => r.id === ref.id);
    if (idx >= 0) {
        current.splice(idx, 1);
        saveSavedRefs(current);
        return false;
    }
    current.push({ id: ref.id, name: ref.name, addedAt: Date.now() });
    saveSavedRefs(current);
    return true;
}

export function removeSavedId(id: string): void {
    saveSavedRefs(getSavedRefs().filter(r => r.id !== id));
}

/** Real, shareable context-ids only (excludes synthetic name-based fallback ids). */
export function getSavedContextIds(): string[] {
    return getSavedRefs().map(r => r.id).filter(isRealContextId);
}

/** Replaces the entire saved list with the given context-ids (used by Import/share-link flows). */
export function replaceWithContextIds(contextIds: string[], nameById: Map<string, string>): void {
    const refs: SavedEventRef[] = contextIds.map(id => ({
        id,
        name: nameById.get(id) || id,
        addedAt: Date.now(),
    }));
    saveSavedRefs(refs);
}

// -- Resolving live data -----------------------------------------------------------

/**
 * Scans the current page for [data-schedule-btn] panels and returns a map of eventId
 */
export function buildLiveScheduleIndex(): Map<string, SavedEvent> {
    const index = new Map<string, SavedEvent>();
    if (typeof document === 'undefined') return index;

    document.querySelectorAll<HTMLElement>('[data-schedule-btn]').forEach(btn => {
        const name = btn.dataset.name || '';
        const contextId = btn.dataset.contextId || '';
        const id = makeEventId(contextId, name);
        if (index.has(id)) return; // first occurrence wins

        index.set(id, {
            id,
            name,
            business_name: btn.dataset.business || '',
            'context-id': contextId,
            rating: btn.dataset.rating || '',
            startTime: btn.dataset.start || '',
            endTime: btn.dataset.end || '',
            room: btn.dataset.room || '',
            day: btn.dataset.day || getDayLabel(btn.dataset.start || ''),
        });
    });

    return index;
}

/**
 * Resolves every saved ref against live page data, so times/rooms/days are always current.
 */
export function resolveSavedSchedule(index: Map<string, SavedEvent> = buildLiveScheduleIndex()): SavedEvent[] {
    return getSavedRefs().map(ref => {
        const live = index.get(ref.id);
        if (live) return live;

        return {
            id: ref.id,
            name: ref.name || 'Unknown panel',
            business_name: '',
            'context-id': isRealContextId(ref.id) ? ref.id : '',
            rating: '',
            startTime: '',
            endTime: '',
            room: '',
            day: 'Unknown',
            stale: true,
        };
    });
}

/**
 * Returns 'Friday', 'Saturday', or 'Sunday' for convention days.
 * ISO strings were produced from UTC-4 times, so we read them back
 * in America/New_York (UTC-4 in winter, but convention is Sep so UTC-4).
 * To be safe we just use UTC offset math directly: add 4 hours back to
 * recover the original Orlando wall-clock date.
 */
export function getDayLabel(isoString: string): string {
    if (!isoString) return 'Unknown';
    const utcMs = new Date(isoString).getTime();
    if (Number.isNaN(utcMs)) return 'Unknown';

    const orlandoMs = utcMs + 4 * 60 * 60 * 1000; // shift back to UTC-4 wall clock
    const d = new Date(orlandoMs);

    const month = d.getUTCMonth() + 1;
    const day   = d.getUTCDate();
    const year  = d.getUTCFullYear();

    if (year === 2025 && month === 9 && day === 5) return 'Friday';
    if (year === 2025 && month === 9 && day === 6) return 'Saturday';
    if (year === 2025 && month === 9 && day === 7) return 'Sunday';
    return 'Unknown';
}