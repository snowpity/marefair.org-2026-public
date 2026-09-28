// src/scripts/scroll-timeline-loader.ts

/* Preface:
 * This whole convoluted system was made to add parallax support to Firefox, as well as legacy devices
 * that doesn't support the newer standard of CSS scroll-timeline.
 * It supposes to detect if CSS animation-timeline: scroll() is supported, then inject the necessary patches.
*/
declare global {
    interface Window {
        __scrollTimelineAfterSwapRegistered?: boolean;
    }
}

const POLYFILL_SRC = "/scroll-timeline.js";
const PAUSE_STYLE_ID = "scroll-timeline-polyfill-pause";

// Inject a <style> that pauses all animations so the polyfill can rewire them.
// Must be called after every page swap because Astro replaces <head> on navigation.
function injectPauseStyle() {
    if (document.getElementById(PAUSE_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = PAUSE_STYLE_ID;
    style.textContent = `* { animation-play-state: paused !important; }`;
    (document.head || document.body).appendChild(style);
}

function removePauseStyle() {
    document.getElementById(PAUSE_STYLE_ID)?.remove();
}

// Replicates the polyfill's internal per-element scanner.
// Called after each page swap to wire up new elements.
function scanElements() {
    const ST = (window as any).ScrollTimeline;
    const VT = (window as any).ViewTimeline;
    if (!ST) return;

    document.querySelectorAll<HTMLElement>("*").forEach(el => {
        try {
            for (const anim of el.getAnimations()) {
                if (anim.playState !== "paused") continue;

                const style = window.getComputedStyle(el);
                const name = (anim as any).animationName ?? (anim.effect as any)?.animationName;
                if (!name || name === "none") continue;

                // Read the custom properties the polyfill uses
                const timelineStr = style.getPropertyValue(`--${name}-animation-timeline`).trim();
                if (!timelineStr) continue;

                const rangeStr = style.getPropertyValue(`--${name}-animation-range`).trim() || undefined;

                // Parse scroll() or view()
                const match = /(view|scroll)(\(([^)]*)\))?/.exec(timelineStr);
                if (!match) continue;

                const type = match[1];
                const args = (match[3] ?? "").trim().split(/\s+/).filter(Boolean);

                let timeline;
                if (type === "scroll") {
                    const scroller = args.find(a => ["nearest","root","self"].includes(a)) ?? "nearest";
                    const axis = args.find(a => ["block","inline","x","y"].includes(a)) ?? "block";
                    const source = scroller === "root" ? document.documentElement
                                 : scroller === "self"  ? el
                                 : null; // nearest — let polyfill default
                    timeline = source ? new ST({ source, axis }) : new ST({ axis });
                } else {
                    const axis = args.find(a => ["block","inline","x","y"].includes(a)) ?? "block";
                    timeline = new VT({ subject: el, axis });
                }

                const options: any = { timeline };
                if (rangeStr) options["animation-range"] = rangeStr;

                const keyframes = (anim.effect as KeyframeEffect)?.getKeyframes() ?? [];
                new Animation(new KeyframeEffect(el, keyframes), timeline, options).play();
            }
        } catch(e) {
            console.error(e);
        }
    });
}

export function ScrollTimelinePolyfill() {
    // Skip entirely if the browser supports animation-timeline natively.
    // Chrome/Edge will use the native CSS and never reach this code.
    if (CSS.supports("animation-timeline: scroll()")) return;

    // Pause all animations so the polyfill can rewire them with scroll timelines.
    injectPauseStyle();

    // Load once — initPolyfill() uses Reflect.defineProperty and throws if called twice
    if (!document.querySelector('script[data-scroll-timeline-polyfill="true"]')) {
        const script = document.createElement("script");
        script.src = POLYFILL_SRC;
        script.setAttribute("data-scroll-timeline-polyfill", "true");
        script.onload = () => removePauseStyle();
        (document.body || document.head).appendChild(script);
    }

    if (!window.__scrollTimelineAfterSwapRegistered) {
        window.__scrollTimelineAfterSwapRegistered = true;

        document.addEventListener("astro:after-swap", () => {
            // Re-inject the pause style — Astro replaces <head> on each swap,
            // so the style tag is gone and animations would run unsuppressed.
            injectPauseStyle();

            // Defer scan by one animation frame so the new DOM's computed styles
            // (including our freshly injected pause) are settled before we read them.
            requestAnimationFrame(() => {
                scanElements();
                removePauseStyle();
            });
        });
    }
}