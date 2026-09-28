import { defineCollection, z } from 'astro:content';
import type {Sponsor, SponsorCollection} from "@data/Sponsor";

// Define the schema for sponsors
const sponsorCollection = z.object({
  id: z.string(),
  sponsors: z.object({
    badgeId: z.string(),
    badgeName: z.string(),
    sponsorName: z.string(),
   }
  ).array(),
});

const CONTENT_API = import.meta.env.SPONSORS_API;

// Define the sponsors collection
export const sponsors = defineCollection({
  loader: async () => {
    try {
      const response = await fetch(`${CONTENT_API}`);
      if (!response.ok) {
        console.error(`Failed to fetch sponsors: ${response.statusText}`);
        return [];
      }

      const data = await response.json();

      type ApiModel = {
        badge_id: number
        badge_name: string
        answer: string
      }

      const modelMapper = (a: ApiModel): Sponsor => ({
        badgeId: `${a.badge_id}`,
        badgeName: `${a.badge_name}`,
        sponsorName: `${a.answer}`,
      })

      const mareSupporterAndFriends = [
        "Mare Supporter",
        "Mare Latecoomer",
        "Spirit Supporter",
        "Spirit Latecoomer",
      ];

      const sponsors : SponsorCollection[] = [
        {
          id: "Mare Supporter",
          sponsors: data.filter((a: ApiModel) => mareSupporterAndFriends.includes(a.badge_name))
           .map(modelMapper),
        },
        {
          id: "Mare Enjoyer",
          sponsors: data.filter((a: ApiModel) => a.badge_name === "Mare Enjoyer")
           .map(modelMapper),
        },
        {
          id: "Mare Appreciator",
          sponsors: data.filter((a: ApiModel) => a.badge_name === "Mare Appreciator")
           .map(modelMapper),
        },
        {
          id: "Mare Enthusiast",
          sponsors: data.filter((a: ApiModel) => a.badge_name === "Mare Enthusiast")
           .map(modelMapper),
        },
        {
          id: "Mare Admirer",
          sponsors: data.filter((a: ApiModel) => a.badge_name === "Mare Admirer")
           .map(modelMapper),
        },
        {
          id: "Mare Connoisseur",
          sponsors: data.filter((a: ApiModel) => a.badge_name === "Mare Connoisseur")
           .map(modelMapper),
        },
        {
          id: "Mare Aficionado",
          sponsors: data.filter((a: ApiModel) => a.badge_name === "Mare Aficionado")
           .map(modelMapper),
        },
        {
          id: "Mare Fanatic",
          sponsors: data.filter((a: ApiModel) => a.badge_name === "Mare Fanatic")
           .map(modelMapper),
        },
        {
          id: "Mare Schizo",
          sponsors: data.filter((a: ApiModel) => a.badge_name === "Mare Schizo")
           .map(modelMapper),
        },
      ]

      return sponsors
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      return [];
    }
  },
  schema: sponsorCollection,
});
