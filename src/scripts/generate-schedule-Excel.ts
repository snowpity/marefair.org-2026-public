import ExcelJS from 'exceljs';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import type { EventDetails } from '@components/ScheduleTable.astro';

const RATING_COLORS: Array<{ keyword: string; argb: string }> = [
    { keyword: "safe",         argb: "FF86EFAC" },
    { keyword: "questionable", argb: "FF67E8F9" },
    { keyword: "suggestive",   argb: "FFFCD34D" },
    { keyword: "explicit",     argb: "FFFCA5A5" },
];

function getRatingColor(rating: string): string {
    const lower = (rating ?? "").toLowerCase();
    return RATING_COLORS.find(r => lower.includes(r.keyword))?.argb ?? "FFFFFFFF";
}

const HEADER_FILL   = "FF1F2937";
const HEADER_FONT   = "FFFFFFFF";
const DAY_TAB_FILLS = ["FF374151", "FF1D4ED8", "FF6D28D9"];

function formatTime(timeKey: string): string {
    const [h, m] = timeKey.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12    = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
}

export async function generateScheduleExcel(
    days: Record<string, Record<string, Record<string, EventDetails>>>,
    timeSlots: string[],
    rooms: string[],
    fileName: string = 'schedule.xlsx',
): Promise<string> {

    const wb = new ExcelJS.Workbook();
    wb.creator = 'Mare Fair Schedule';
    wb.created = new Date();

    for (const [dayIdx, dayName] of Object.keys(days).entries()) {
        const events = days[dayName];
        const ws     = wb.addWorksheet(dayName);
        ws.properties.tabColor = { argb: DAY_TAB_FILLS[dayIdx % DAY_TAB_FILLS.length] };

        ws.getColumn(1).width = 12;
        rooms.forEach((_, i) => { ws.getColumn(i + 2).width = 28; });

        const headerRow = ws.addRow(['Time', ...rooms]);
        headerRow.height = 28;
        headerRow.eachCell(cell => {
            cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEADER_FILL } };
            cell.font      = { bold: true, color: { argb: HEADER_FONT }, name: 'Arial', size: 11 };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border    = { bottom: { style: 'medium', color: { argb: 'FF111827' } } };
        });

        // PASS 1: pre-compute fill colors for every cell
        type EventBlock = { name: string; startRow: number; spanCount: number; colNum: number; };
        const blocks: EventBlock[]                               = [];
        const eventFill: Record<number, Record<number, string>> = {};

        rooms.forEach((room, colIdx) => {
            const colNum  = colIdx + 2;
            const skipSet = new Set<string>();

            for (let i = 0; i < timeSlots.length; i++) {
                const time    = timeSlots[i];
                const current = events[time]?.[room];
                if (!current?.name || skipSet.has(time)) continue;

                let span = 1;
                for (let j = i + 1; j < timeSlots.length; j++) {
                    const next = events[timeSlots[j]]?.[room];
                    if (next?.name === current.name) { span++; skipSet.add(timeSlots[j]); }
                    else break;
                }

                const rating    = Array.isArray(current.rating) ? current.rating[0] : current.rating;
                const fillColor = getRatingColor(rating);
                const startRow  = i + 2;

                blocks.push({ name: current.name, startRow, spanCount: span, colNum });

                for (let s = 0; s < span; s++) {
                    const r = startRow + s;
                    if (!eventFill[r]) eventFill[r] = {};
                    eventFill[r][colNum] = fillColor;
                }
            }
        });

        // PASS 2: write rows — each row only touches its own cells before commit()
        timeSlots.forEach((time, rowIdx) => {
            const excelRow = rowIdx + 2;
            const row      = ws.getRow(excelRow);
            row.height     = 20;

            const timeCell     = row.getCell(1);
            timeCell.value     = formatTime(time);
            timeCell.font      = { bold: true, name: 'Arial', size: 10, color: { argb: 'FF111827' } };
            timeCell.alignment = { vertical: 'middle', horizontal: 'center' };
            timeCell.fill      = {
                type: 'pattern', pattern: 'solid',
                fgColor: { argb: rowIdx % 2 === 0 ? 'FFE5E7EB' : 'FFF9FAFB' },
            };

            rooms.forEach((_, colIdx) => {
                const colNum = colIdx + 2;
                const cell   = row.getCell(colNum);
                const argb   = eventFill[excelRow]?.[colNum];
                cell.fill    = {
                    type: 'pattern', pattern: 'solid',
                    fgColor: { argb: argb ?? (rowIdx % 2 === 0 ? 'FFD1D5DB' : 'FFE5E7EB') },
                };
            });

            row.commit();
        });

        // PASS 3: write text, borders, merges after all rows committed
        for (const block of blocks) {
            const cell     = ws.getRow(block.startRow).getCell(block.colNum);
            cell.value     = block.name;
            cell.font      = { name: 'Arial', size: 10, bold: false, color: { argb: 'FF111827' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border    = {
                top:    { style: 'thin', color: { argb: 'FF6B7280' } },
                left:   { style: 'thin', color: { argb: 'FF6B7280' } },
                right:  { style: 'thin', color: { argb: 'FF6B7280' } },
                bottom: { style: 'thin', color: { argb: 'FF6B7280' } },
            };
            if (block.spanCount > 1) {
                ws.mergeCells(block.startRow, block.colNum,
                              block.startRow + block.spanCount - 1, block.colNum);
            }
        }

        ws.views = [{ state: 'frozen', xSplit: 1, ySplit: 1 }];
    }

    // During `npm run dev` there is no dist/ folder — Astro serves files from
    // public/ directly. During a production build, public/ is copied into dist/
    // before rendering starts, so we must write to dist/ to be picked up.
    const isDev   = process.env.NODE_ENV !== 'production';
    const outDir  = isDev
        ? path.join(process.cwd(), 'public')   // dev:   served statically as-is
        : path.join(process.cwd(), 'dist');     // build: Cloudflare Pages picks this up
    const outPath = path.join(outDir, fileName);
    console.log(`[Excel] writing to: ${outPath} (${isDev ? 'dev' : 'build'})`);
    const buffer  = await wb.xlsx.writeBuffer();
    await mkdir(outDir, { recursive: true });
    await writeFile(outPath, buffer as unknown as Buffer);
    console.log(`[Excel] write complete`);

    return `/${fileName}`;
}