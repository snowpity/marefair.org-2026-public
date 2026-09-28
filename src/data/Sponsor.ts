/**
 * Interface for Sponsor data
 */
export interface Sponsor {
    badgeId: string
    badgeName: string
    sponsorName: string
}

export interface SponsorCollection {
    id: string,
    sponsors: Sponsor[]
}
