/*
const byTable: Record<string, any> = {};
for (const a of apiData.assignments) {
    byTable[a["room-or-table-id"]] = a;
}
const byAdTable: Record<string, any> = {};
for (const a of adApiData.assignments) {
    byAdTable[a["room-or-table-id"]] = a;
}
*/

export const adCoords = [
    { l: "35.84%",  t: "68.28%", w: "11.82%",   h: "3.52%"  , id: "AD 1" },
    { l: "48.54%",  t: "68.02%", w: "6.35%",    h: "3.71%"  , id: "AD 2" },
    { l: "55.66%",  t: "67.95%", w: "6.93%",    h: "3.71%"  , id: "AD 3" },
    { l: "63.28%",  t: "68.08%", w: "11.62%",   h: "3.58%"  , id: "AD 4" },
    { l: "74.41%",  t: "72.05%", w: "4.59%",    h: "4.1%"   , id: "AD 5" },
    { l: "74.32%",  t: "76.55%", w: "4.49%",    h: "4.82%"  , id: "AD 6" },
    { l: "63.18%",  t: "85.67%", w: "12.3%",    h: "3.52%"  , id: "AD 7" },
    { l: "52.34%",  t: "85.87%", w: "9.86%",    h: "3.32%"  , id: "AD 8" },
    { l: "42.09%",  t: "86%"   , w: "9.18%",    h: "3.26%"  , id: "AD 9" },
    { l: "32.52%",  t: "85.93%", w: "8.3%" ,    h: "3.32%"  , id: "AD 10"},
    { l: "24.22%",  t: "86%", w: "7.42%"   ,    h: "3.32%"  , id: "AD 11"},
    { l: "35.45%",  t: "75.19%", w: "8.59%",    h: "3.52%"  , id: "AD 12"},
    { l: "45.02%",  t: "75.06%", w: "7.13%",    h: "3.58%"  , id: "AD 13"},
    { l: "53.22%",  t: "74.87%", w: "8.3%",     h: "3.65%"  , id: "AD 14"},
    { l: "62.21%",  t: "74.74%", w: "7.62%",    h: "3.71%"  , id: "AD 15"},
    { l: "53.42%",  t: "79.62%", w: "16.31%",   h: "3.97%"  , id: "AD 16"},
    { l: "45.12%",  t: "79.88%", w: "7.03%",    h: "3.91%"  , id: "AD 17"},
    { l: "35.64%",  t: "80.01%", w: "8.3%",     h: "3.78%"  , id: "AD 18"},
];

export type VendorCoordinate = { l: string; t: string; w: string; h: string; id: string };

// Single shared hit-box for the whole Artist Alley section on the map.
export const artistAlleyCoord = { l: "21.29%",  t: "57.92%", w: "30.18%",   h: "4.49%"  };


export type Question = { id: string; title: string; answer: string };
export type Assignment = { ['room-or-table-id']?: string; ['context-id']?: string; ['application-name']?: string; ['start-time']?: string; ['end-time']?: string; questions?: Question[] };
export type Vendor = { id: string; icon: null; 'icon-src': string; name: string; description: string; 'x-link': string[]; 'other-link': string[]; 'deviantart-link': string[]; 'instagram-link': string[]; 'tumblr-link': string[]; l: string; t: string; w: string; h: string; day: string };

export const vendorCoords = [
    { l: "19.95%",  t: "10.67%", w: "17.14%",  h: "4.43%", id: "A1"  },

    { l: "37.6%",   t: "10.95%", w: "9.96%",   h: "4.1%",  id: "A2"  },

    { l: "54.11%",  t: "10.62%", w: "9.57%",   h: "4.23%", id: "A3"  },

    { l: "63.48%",  t: "10.62%", w: "7.42%",   h: "4.23%", id: "A4"  },

    { l: "71.39%",  t: "10.56%", w: "8.79%",   h: "6.05%", id: "A5"  },

    { l: "75.68%",  t: "17.13%", w: "4.79%",   h: "4.75%", id: "A6"  },

    { l: "75.59%",  t: "22.47%", w: "4.88%",   h: "5.21%", id: "A7"  },

    { l: "75.49%",  t: "31.23%", w: "5.36%",   h: "5.35%", id: "A8"  },

    { l: "75.49%",  t: "36.72%", w: "5.15%",   h: "10.5%", id: "A9"  },

    { l: "75.59%",  t: "47.43%", w: "4.94%",   h: "5.01%", id: "A10"  },

    { l: "71.06%",  t: "55.59%", w: "9.47%",   h: "6.52%", id: "A11"  },

    { l: "63.85%",  t: "57.93%", w: "6.39%",   h: "4.26%", id: "A12"  },

    { l: "57.98%",  t: "58.06%", w: "5.46%",   h: "4.19%", id: "A13"  },

    { l: "52.52%",  t: "58%",    w: "4.94%",   h: "4.32%", id: "A14"  },

    { l: "30.69%",  t: "22.99%", w: "6.49%",   h: "5.22%", id: "B1"  },

    { l: "38%",  t: "24.23%",    w: "5.77%",   h: "3.98%", id: "B2"  },

    { l: "44.28%",  t: "24.09%", w: "5.56%",   h: "4.19%", id: "B3"  },

    { l: "50.57%",  t: "24.09%", w: "5.66%",   h: "4.19%", id: "B4"  },

    { l: "56.85%",  t: "24.09%", w: "6.18%",   h: "4.32%", id: "B5"  },

    { l: "63.95%",  t: "24.23%", w: "7.11%",   h: "4.12%", id: "B6"  },

    { l: "63.75%",  t: "17.78%", w: "7.21%",   h: "5.9%",  id: "B7"  },

    { l: "56.33%",  t: "17.91%", w: "7%",      h: "4.32%", id: "B8"  },

    { l: "50.57%",  t: "17.91%", w: "5.87%",   h: "4.39%", id: "B9"  },

    { l: "44.39%",  t: "17.98%", w: "5.87%",   h: "4.46%", id: "B10"  },

    { l: "38%",     t: "17.98%", w: "6.08%",   h: "4.67%", id: "B11"  },

    { l: "30.69%",  t: "18.12%", w: "6.8%",    h: "4.6%",  id: "B12"  },

    { l: "30.79%",  t: "36.03%", w: "6.39%",   h: "5.63%", id: "C1"  },

    { l: "37.9%",   t: "37.47%", w: "5.66%",   h: "4.12%", id: "C2"  },

    { l: "44.08%",  t: "37.47%", w: "6.08%",   h: "4.26%", id: "C3"  },

    { l: "50.57%",  t: "37.41%", w: "5.66%",   h: "4.19%", id: "C4"  },

    { l: "56.64%",  t: "37.41%", w: "6.39%",   h: "4.32%", id: "C5"  },

    { l: "63.85%",  t: "37.41%", w: "7.11%",   h: "4.32%", id: "C6"  },

    { l: "63.54%",  t: "31.16%", w: "7.42%",   h: "5.63%", id: "C7"  },

    { l: "56.95%",  t: "31.3%", w: "5.87%",    h: "4.19%", id: "C8"  },

    { l: "37.8%",   t: "31.23%", w: "18.3%",   h: "4.19%", id: "C9"  },

    { l: "30.9%",   t: "31.3%",  w: "6.39%",   h: "4.19%", id: "C10"  },

    { l: "30.66%",  t: "49.78%", w: "6.54%",   h: "2.93%", id: "D1"  },
    { l: "30.76%",  t: "52.65%", w: "6.64%",   h: "2.34%", id: "D2"  },

    { l: "38%",     t: "50.65%", w: "5.25%",   h: "4.32%", id: "D3"  },

    { l: "43.87%",  t: "50.58%", w: "5.87%",   h: "4.39%", id: "D4"  },

    { l: "50.36%",  t: "50.58%", w: "5.97%",   h: "4.32%", id: "D5"  },

    { l: "56.85%",  t: "50.45%", w: "5.87%",   h: "4.46%", id: "D6"  },

    { l: "63.44%",  t: "50.45%", w: "7.52%",   h: "4.39%", id: "D7"  },

    { l: "63.44%",  t: "44.82%", w: "7.62%",   h: "5.22%", id: "D8"  },

    { l: "56.95%",  t: "44.68%", w: "5.77%",   h: "4.26%", id: "D9"  },

    { l: "50.67%",  t: "44.68%", w: "5.66%",   h: "4.32%", id: "D10"  },

    { l: "43.98%",  t: "44.75%", w: "5.97%",   h: "4.39%", id: "D11"  },

    { l: "37.9%",   t: "44.68%", w: "5.66%",   h: "4.39%", id: "D12"  },

    { l: "30.69%",  t: "44.68%", w: "6.9%",    h: "4.53%", id: "D13"  },
];


const getDayName = (dateTimeStr?: string): string => {
    if (!dateTimeStr) return '';
    const datePart = dateTimeStr.split(' ')[0];
    if (!datePart) return '';
    const date = new Date(`${datePart}T00:00:00Z`);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
};

const normalizeLink = (link: string): string => {
    let l = link.trim();
    if (!l) return '';
    l = l.replace(/^(https?)\/\//i, '$1://'); // "https//..." -> "https://..."
    if (!/^https?:\/\//i.test(l)) l = `https://${l}`; // add scheme if missing entirely
    return l;
};

const splitLinks = (raw: string): string[] =>
    raw ? raw.split(',').map(normalizeLink).filter(Boolean) : [];

export const transformVendorData = (apiVendors: Assignment[], coordinates: VendorCoordinate[]): Vendor[] => {
    const coordsById = coordinates.reduce((acc, coord) => {
        if (coord.id) {
        acc[coord.id] = coord;
        }
        return acc;
    }, {} as Record<string, VendorCoordinate>);

    return apiVendors.map((vendor, index) => {
        // Find answers safely by their respective question titles
        const findAnswer = (title: string): string => {
        const q = vendor.questions?.find((item: Question) => item.title === title);
        return q ? q.answer : '';
        };

        const xLinkAnswer = findAnswer('Xitter');
        const coordId = vendor['room-or-table-id'] || vendor['context-id'] || '';
        const coords = coordsById[coordId] || coordinates[index] || { l: '0%', t: '0%', w: '0%', h: '0%', id: coordId };
        const vendorId = coords.id || coordId.replace(/\s+/g, '-');

        return {
        'id': vendorId,
        'icon': null,
        'icon-src': findAnswer('Website Image'),
        'name': vendor['application-name'] || '',
        'description': findAnswer('Description'),
        'x-link': splitLinks(xLinkAnswer),
        'other-link': splitLinks(findAnswer('Website') || findAnswer('Derpibooru Link')),
        'deviantart-link': splitLinks(findAnswer('Deviantart')),
        'instagram-link': splitLinks(findAnswer('Instagram')),
        'tumblr-link': [], // Not mapped in the current questionnaire items
        'l': coords.l,
        't': coords.t,
        'w': coords.w,
        'h': coords.h,
        'day': getDayName(vendor['start-time']),
        };
    });
};

// Execution:
//export const vendors_AD = transformVendorData(apiData, adCoords);
//export const vendors = transformVendorData(apiData, vendorCoords);


/*
export const vendors_AD = adCoords.map((coords, i) => {
    const a = byAdTable[`Vendor ${i + 1}`];
    return {
        'icon-src':        a?.questions?.find((q: any) => q.title === "Website Image")?.answer ?? "",
        'name':            a?.["application-name"] ?? "",
        'description':     a?.questions?.find((q: any) => q.title === "Description")?.answer ?? "",
        'x-link':          a?.questions?.find((q: any) => q.title === "Xitter")?.answer ?? "",
        'instagram-link':  a?.questions?.find((q: any) => q.title === "Instagram")?.answer ?? "",
        'deviantart-link': a?.questions?.find((q: any) => q.title === "Deviantart")?.answer ?? "",
        'other-link':      a?.questions?.find((q: any) => q.title === "Website")?.answer ?? "",
        ...coords,
    };
});

export const vendors = vendorCoords.map((coords, i) => {
    const a = byTable[`Vendor ${i + 1}`];
    return {
        'icon-src':        a?.questions?.find((q: any) => q.title === "Website Image")?.answer ?? "",
        'name':            a?.["application-name"] ?? "",
        'description':     a?.questions?.find((q: any) => q.title === "Description")?.answer ?? "",
        'x-link':          a?.questions?.find((q: any) => q.title === "Xitter")?.answer ?? "",
        'instagram-link':  a?.questions?.find((q: any) => q.title === "Instagram")?.answer ?? "",
        'deviantart-link': a?.questions?.find((q: any) => q.title === "Deviantart")?.answer ?? "",
        'other-link':      a?.questions?.find((q: any) => q.title === "Website")?.answer ?? "",
        ...coords,
    };
});
*/