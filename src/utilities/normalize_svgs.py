#!/usr/bin/env python3
"""
Normalize SVG files to strip XML declarations, DOCTYPE, and clean up
attributes so they render correctly as inline SVGs on the map.
"""

import re
import sys
from pathlib import Path

def normalize_svg(content: str) -> str:
    # Strip XML declaration
    content = re.sub(r'<\?xml[^?]*\?>\s*', '', content)

    # Strip DOCTYPE
    content = re.sub(r'<!DOCTYPE[^>]*>\s*', '', content)

    # Clean up the <svg> opening tag
    def clean_svg_tag(m):
        attrs = m.group(1)

        # Strip px from width/height values
        attrs = re.sub(r'(width|height)="(\d+)px"', r'\1="\2"', attrs)

        # Strip inline style from <svg>
        attrs = re.sub(r'\s*style="[^"]*"', '', attrs)

        # Strip xmlns:xlink (not needed for our use case)
        attrs = re.sub(r'\s*xmlns:xlink="[^"]*"', '', attrs)

        return f'<svg{attrs}>'

    content = re.sub(r'<svg([^>]*)>', clean_svg_tag, content)

    # Unwrap <g> tags — remove opening and closing, keep contents
    content = re.sub(r'<g[^>]*>', '', content)
    content = re.sub(r'</g>', '', content)

    # Strip inline style=" from paths/elements (opacity, fill-rule, etc.)
    content = re.sub(r'\s*style="[^"]*"', '', content)

    # Normalize whitespace
    content = content.strip()

    return content


def process_directory(svg_dir: Path):
    svg_files = list(svg_dir.glob('*.svg'))
    if not svg_files:
        print(f"No SVG files found in {svg_dir}")
        return

    print(f"Processing {len(svg_files)} SVG files in {svg_dir}...\n")

    for svg_path in sorted(svg_files):
        original = svg_path.read_text(encoding='utf-8')
        normalized = normalize_svg(original)

        if normalized != original:
            svg_path.write_text(normalized, encoding='utf-8')
            print(f"  ✓ normalized: {svg_path.name}")
        else:
            print(f"  - unchanged:  {svg_path.name}")

    print("\nDone.")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python normalize_svgs.py <path/to/MAP_SVG>")
        sys.exit(1)

    directory = Path(sys.argv[1])
    if not directory.is_dir():
        print(f"Error: {directory} is not a directory")
        sys.exit(1)

    process_directory(directory)
