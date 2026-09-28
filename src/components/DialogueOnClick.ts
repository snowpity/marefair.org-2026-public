// This is incredibly scuffed, but Astro's css is scoped and we are not supposed to add tailwind classes with js
export function injectTooltipStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .tooltip {
            display: block;
            opacity: 0;
            position: absolute;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 0.5rem;
            border-radius: 0.5rem;
            font-size: 1rem;
            white-space: nowrap;
            z-index: 100;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            transition: opacity 0.3s ease-in-out;
        }

        .bottom {
            top: auto;
            bottom: 2rem;
        }

        .show-tooltip .tooltip {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// default to 0.5s animation, bottom controls if the tooltip is appearing from the top or bottom of the anchor
export function showTooltipDialogueClick(anchor: Element, elem: Element, context: string, time: number = 500, bottom = false)
{
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    if (bottom)
        tooltip.className += " bottom"
    tooltip.textContent = context;
    anchor.appendChild(tooltip);

    elem.addEventListener('click', (e) => {
        e.preventDefault();
        anchor.classList.add('show-tooltip'); // Show the tooltip

        // Hide the tooltip
        setTimeout(() => {
            anchor.classList.remove('show-tooltip');
        }, time);
    });

}