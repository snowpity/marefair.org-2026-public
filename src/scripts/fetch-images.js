// scripts/fetch-images.js
import fs from 'fs';
import fetch from 'node-fetch';

const TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const CONCURRENCY = 5;

const main = [
  // Main knicknack
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/2.png',
    path: './src/assets/main/colored/2.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/3.png',
    path: './src/assets/main/colored/3.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/4.png',
    path: './src/assets/main/colored/4.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/5.png',
    path: './src/assets/main/colored/5.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/6.png',
    path: './src/assets/main/colored/6.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/7.png',
    path: './src/assets/main/colored/7.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/bgfull.png',
    path: './src/assets/main/colored/bgfull.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/bgfullMobile.png',
    path: './src/assets/main/colored/bgfullMobile.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/SIGN TOP cropped.png',
    path: './src/assets/main/colored/SIGN TOP cropped.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/colored/signLoop.png',
    path: './src/assets/main/colored/signLoop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/Schedule.png',
    path: './src/assets/main/signs/Schedule.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/CodeOfConductSign.png',
    path: './src/assets/main/signs/CodeOfConductSign.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/Mare_Fair_4_Apply_Sign.png',
    path: './src/assets/main/signs/Mare_Fair_4_Apply_Sign.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/panoiseau.png',
    path: './src/assets/main/signs/venue.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/AboutUsSign.png',
    path: './src/assets/main/signs/about.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/newsSign.png',
    path: './src/assets/main/signs/news.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/newsSignOld.png',
    path: './src/assets/main/signs/newsOld.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/Contact_Signage.png',
    path: './src/assets/main/signs/Contact_Signage.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/Register_Sign.png',
    path: './src/assets/main/signs/Register_Sign.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/SignPostSponsors.png',
    path: './src/assets/main/signs/SignPostSponsors.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/SignPostMascots.png',
    path: './src/assets/main/signs/SignPostMascots.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/Scrapbook.png',
    path: './src/assets/main/signs/Scrapbook.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/Cathedral_sign_resized.png',
    path: './src/assets/main/signs/Events.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/wizard_sign.png',
    path: './src/assets/main/signs/wizard_sign.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/vendorspanel.png',
    path: './src/assets/main/signs/vendor_sign.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/map_sign.png',
    path: './src/assets/main/signs/map_sign.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/MFmusicians.png',
    path: './src/assets/main/signs/MFmusicians.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/main/signs/conbook.png',
    path: './src/assets/main/signs/conbook.png',
  },
];

const news = [
  {
    url: 'https://fair-filer.marefair.org/2026/news/framebottom.png',
    path: './src/assets/news/framebottom.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/news/framesides.png',
    path: './src/assets/news/framesides.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/news/frametop.png',
    path: './src/assets/news/frametop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/news/hear_ye_hear_ye_png_list.png',
    path: './src/assets/news/hear_ye_hear_ye_png_list.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/news/parchment_png_list.png',
    path: './src/assets/news/parchment_png_list.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/news/website_sign.png',
    path: './src/assets/news/website_sign.png',
  },
]

const bg = [
  {
    url: 'https://fair-filer.marefair.org/2026/bg/JUICE.png',
    path: './src/assets/bg/JUICE.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/bg/velvet.png',
    path: './src/assets/bg/velvet.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/bg/wood.png',
    path: './src/assets/bg/wood.png',
  },
]

const coc = [
  {
    url: 'https://fair-filer.marefair.org/2026/COC/ScrollBottomVignette.png',
    path: './src/assets/COC/ScrollBottomVignette.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/COC/ScrollCenter.png',
    path: './src/assets/COC/ScrollCenter.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/COC/Scrolltop.png',
    path: './src/assets/COC/Scrolltop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/COC/DungeonMare.png',
    path: './src/assets/COC/DungeonMare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/COC/bg.png',
    path: './src/assets/COC/bg.png',
  },
]

const venue = [
  {
    url: 'https://fair-filer.marefair.org/2026/venue/white/ROK_BTM.png',
    path: './src/assets/venue/ROK_BTM.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/venue/white/ROK_MID.png',
    path: './src/assets/venue/ROK_MID.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/venue/white/ROK_TOP.png',
    path: './src/assets/venue/ROK_TOP.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/venue/bg.png',
    path: './src/assets/venue/bg.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/venue/rosen.png',
    path: './src/assets/venue/rosen.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/venue/copecharette.png',
    path: './src/assets/venue/parking.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/venue/bits.png',
    path: './src/assets/venue/key.png',
  },
]

const apply = [
  {
    url: 'https://fair-filer.marefair.org/2026/apply/baannerasset.png',
    path: './src/assets/apply/banner.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/apply/header_tileable.png',
    path: './src/assets/apply/header_tileable.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/apply/mare.png',
    path: './src/assets/apply/mare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/apply/pillar_bottom.png',
    path: './src/assets/apply/pillar_bottom.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/apply/pillar_tile.png',
    path: './src/assets/apply/pillar_tile.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/apply/pillar_top.png',
    path: './src/assets/apply/pillar_top.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/apply/COA_Lineup.png',
    path: './src/assets/apply/COA_Lineup.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/apply/bannermobile.png',
    path: './src/assets/apply/bannermobile.png',
  },
]

const contact = [
  {
    url: 'https://fair-filer.marefair.org/2026/contact/back.png',
    path: './src/assets/contact/Tarot_Cards.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/Attendee.png',
    path: './src/assets/contact/Attendee.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/Charity.png',
    path: './src/assets/contact/Charity.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/HPIC.png',
    path: './src/assets/contact/HPIC.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/Public Relation.png',
    path: './src/assets/contact/Public_Relation.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/Scheduling.png',
    path: './src/assets/contact/Scheduling.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/Tech.png',
    path: './src/assets/contact/Tech.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/Music.png',
    path: './src/assets/contact/Music.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/Vendor_Relation.png',
    path: './src/assets/contact/Vendor_Relation.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/Volunteer_Relation.png',
    path: './src/assets/contact/Volunteer_Relation.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/fortune_teller_mare.png',
    path: './src/assets/contact/fortune_teller_mare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/contact/fortune_tellers_table.png',
    path: './src/assets/contact/fortune_tellers_table.png',
  },
]

const about = [
  {
    url: 'https://fair-filer.marefair.org/2026/about/asset_background_01.png',
    path: './src/assets/about/asset_background_01.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/asset_background_02.png',
    path: './src/assets/about/asset_background_02.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/asset_candles.png',
    path: './src/assets/about/asset_candles.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/asset_candles_animated_1451.avif',
    path: './src/assets/about/asset_candles_animated.avif',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/apple-candles-1451.webp',
    path: './src/assets/about/apple-candles-1451.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/newFrames/frame_1.png',
    path: './src/assets/about/asset_frame_01.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/newFrames/frame_2.png',
    path: './src/assets/about/asset_frame_02.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/newFrames/frame_3.png',
    path: './src/assets/about/asset_frame_03.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/newFrames/frame_4.png',
    path: './src/assets/about/asset_frame_04.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/asset_frame_extra_01.png',
    path: './src/assets/about/asset_frame_extra_01.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/asset_frame_extra_02.png',
    path: './src/assets/about/asset_frame_extra_02.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/asset_underline.png',
    path: './src/assets/about/asset_underline.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/about/asset_wax_seal.png',
    path: './src/assets/about/asset_wax_seal.png',
  },
]

const register = [
  {
    url: 'https://fair-filer.marefair.org/2026/register/atlas.png',
    path: './src/assets/register/atlas.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/register/Potion_zeeb.png',
    path: './src/assets/register/Potion_zeeb.png',
  },
]

const comics = [
  {
    url: 'https://fair-filer.marefair.org/2026/comics/comics.png',
    path: './src/assets/comics/comics.png',
  },
]

const sponsors = [
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/BOT.png',
    path: './src/assets/sponsors/BOT.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/MID.png',
    path: './src/assets/sponsors/MID.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/TOP.png',
    path: './src/assets/sponsors/TOP.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/TavernWall/TavernWall-FairFlyer.png',
    path: './src/assets/sponsors/TavernWall/TavernWall-FairFlyer.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/TavernWall/TavernWall-Table.png',
    path: './src/assets/sponsors/TavernWall/TavernWall-Table.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/TavernWall/TavernWallCenter.png',
    path: './src/assets/sponsors/TavernWall/TavernWallCenter.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/TavernWall/TavernWallInfiniteScroll.png',
    path: './src/assets/sponsors/TavernWall/TavernWallInfiniteScroll.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/TavernWall/BoardBottom.png',
    path: './src/assets/sponsors/TavernWall/BoardBottom.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/TavernWall/BoardCenter.png',
    path: './src/assets/sponsors/TavernWall/BoardCenter.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/sponsors/TavernWall/BoardTop.png',
    path: './src/assets/sponsors/TavernWall/BoardTop.png',
  },
]

const scrapbook = [
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/book_arrow_right.png',
    path: './src/assets/scrapbook/book_arrow_right.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/book_arrow_left.png',
    path: './src/assets/scrapbook/book_arrow_left.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/book_book.png',
    path: './src/assets/scrapbook/book_book.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/animated%20parts/book_frontpage_moving.webp',
    path: './src/assets/scrapbook/animated parts/book_frontpage_moving.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/animated%20parts/book_frontpage_moving_baked.webp',
    path: './src/assets/scrapbook/animated parts/book_frontpage_moving_baked.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/animated%20parts/book_frontpage_static.png',
    path: './src/assets/scrapbook/animated parts/book_frontpage_static.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/animated%20parts/book_frontpage_static_baked.png',
    path: './src/assets/scrapbook/animated parts/book_frontpage_static_baked.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/animated%20parts/book_frontpage_moving.webm',
    path: './src/assets/scrapbook/animated parts/book_frontpage_moving.webm',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/prop_table.png',
    path: './src/assets/scrapbook/prop_table.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/prop_inkpot_brush.png',
    path: './src/assets/scrapbook/prop_inkpot_brush.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/prop_inkpot_eraser.png',
    path: './src/assets/scrapbook/prop_inkpot_eraser.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/prop_quill.png',
    path: './src/assets/scrapbook/prop_quill.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/prop_scroll.png',
    path: './src/assets/scrapbook/prop_scroll.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/book_frontpage_erased_1.png',
    path: './src/assets/scrapbook/book_frontpage_erased_1.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/animated%20parts/blink.webp',
    path: './src/assets/scrapbook/animated parts/blink.webp',
  },
  // Thumbnails
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/thumbnails/thumbnail-coc.png',
    path: './src/assets/scrapbook/thumbnails/thumbnail-coc.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/thumbnails/thumbnail-main.png',
    path: './src/assets/scrapbook/thumbnails/thumbnail-main.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/thumbnails/thumbnail-potions.png',
    path: './src/assets/scrapbook/thumbnails/thumbnail-potions.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/scrapbook/thumbnails/thumbnail-events.png',
    path: './src/assets/scrapbook/thumbnails/thumbnail-events.png',
  },
]

const steam = [
  {
    url: 'https://fair-filer.marefair.org/2026/steam/FortuneTellerAchievement.png',
    path: './src/assets/steam/FortuneTellerAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/HallOfFameAchievement4.png',
    path: './src/assets/steam/HallOfFameAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/NewsAchievement3.png',
    path: './src/assets/steam/NewsAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/NotEnoughBudgetAchievement.png',
    path: './src/assets/steam/NotEnoughBudgetAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/PortalToEquestriaAchievement.png',
    path: './src/assets/steam/PortalToEquestriaAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/ReadCOCAchievement.png',
    path: './src/assets/steam/ReadCOCAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/CheersAchievement.png',
    path: './src/assets/steam/CheersAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/YamchaAchievement.png',
    path: './src/assets/steam/YamchaAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/BoopAchievement.png',
    path: './src/assets/steam/BoopAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/MareErasureAchievement.png',
    path: './src/assets/steam/MareErasureAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/SavePrincessAchievement.png',
    path: './src/assets/steam/SavePrincessAchievement.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/steam/MapAchievement.png',
    path: './src/assets/steam/MapAchievement.png',
  },
]

const mascots = [
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/back_button.webp',
    path: './src/assets/mascots/back_button.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/background.png',
    path: './src/assets/mascots/background.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/change_clothes_button.png',
    path: './src/assets/mascots/change_clothes_button.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/dialog_desktop.png',
    path: './src/assets/mascots/dialog_desktop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/dialog_mobile.png',
    path: './src/assets/mascots/dialog_mobile.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/ring.png',
    path: './src/assets/mascots/ring.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/ring_floor_reflection.png',
    path: './src/assets/mascots/ring_floor_reflection.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/ring_glow.png',
    path: './src/assets/mascots/ring_glow.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/ring_summoned.png',
    path: './src/assets/mascots/ring_summoned.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/summon_transition_flash.png',
    path: './src/assets/mascots/summon_transition_flash.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ff/FF_Summon.webp',
    path: './src/assets/mascots/FF_Summon.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ff/FF.png',
    path: './src/assets/mascots/FF.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ff/FF_boop.png',
    path: './src/assets/mascots/FF_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ff/FF_outfit.png',
    path: './src/assets/mascots/FF_outfit.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ff/FF_outfit_boop.png',
    path: './src/assets/mascots/FF_outfit_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ff/FF_nohat.png',
    path: './src/assets/mascots/FF_nohat.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ff/FF_nohat_boop.png',
    path: './src/assets/mascots/FF_nohat_boop.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/fr/FR_Summon.webp',
    path: './src/assets/mascots/FR_Summon.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/fr/FR.png',
    path: './src/assets/mascots/FR.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/fr/FR_boop.png',
    path: './src/assets/mascots/FR_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/fr/FR_outfit.png',
    path: './src/assets/mascots/FR_outfit.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/fr/FR_outfit_boop.png',
    path: './src/assets/mascots/FR_outfit_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/fr/FR_nude.png',
    path: './src/assets/mascots/FR_nude.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/fr/FR_nude_boop.png',
    path: './src/assets/mascots/FR_nude_boop.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ma/MA_Summon.webp',
    path: './src/assets/mascots/MA_Summon.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ma/MA.png',
    path: './src/assets/mascots/MA.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ma/MA_Boop.png',
    path: './src/assets/mascots/MA_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ma/MA_outfit.png',
    path: './src/assets/mascots/MA_outfit.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ma/MA_outfit_boop.png',
    path: './src/assets/mascots/MA_outfit_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ma/MA_Goth.png',
    path: './src/assets/mascots/MA_Goth.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/ma/MA_Goth_Boop.png',
    path: './src/assets/mascots/MA_Goth_Boop.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/mm/MM_Summon.webp',
    path: './src/assets/mascots/MM_Summon.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/mm/MM.png',
    path: './src/assets/mascots/MM.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/mm/MM_boop.png',
    path: './src/assets/mascots/MM_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/mm/MM_outfit.png',
    path: './src/assets/mascots/MM_outfit.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/mm/MM_outfit_boop.png',
    path: './src/assets/mascots/MM_outfit_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/mm/MM_noglasses.png',
    path: './src/assets/mascots/MM_noglasses.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/mm/MM_noglasses_boop.png',
    path: './src/assets/mascots/MM_noglasses_boop.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/so/SO_Summon.webp',
    path: './src/assets/mascots/SO_Summon.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/so/SO.png',
    path: './src/assets/mascots/SO.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/so/SO_boop.png',
    path: './src/assets/mascots/SO_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/so/SO_outfit.png',
    path: './src/assets/mascots/SO_outfit.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/so/SO_outfit_boop.png',
    path: './src/assets/mascots/SO_outfit_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/so/SO_goth.png',
    path: './src/assets/mascots/SO_goth.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/mascotportraits/so/SO_goth_boop.png',
    path: './src/assets/mascots/SO_goth_boop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/mascots/assets/Title.png',
    path: './src/assets/mascots/Title.png',
  },
]

const events = [
  {
    url: 'https://fair-filer.marefair.org/2026/events/Cathedral3Row.png',
    path: './src/assets/events/Cathedral3Row.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Anonfilly%20glass%20left.png',
    path: './src/assets/events/AnonfillyL.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Anonfilly%20glass%20right.png',
    path: './src/assets/events/AnonfillyR.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Plush%20party.png',
    path: './src/assets/events/PlushParty.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/PlushPlaque.png',
    path: './src/assets/events/PlushPlaque.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/CHARITY.png',
    path: './src/assets/events/CHARITY.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Charity%20Auction.png',
    path: './src/assets/events/Charity Auction.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/CINEMARENIGHT.png',
    path: './src/assets/events/CINEMARENIGHT.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Cinemare%20night.png',
    path: './src/assets/events/Cinemare night.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Cosplay.png',
    path: './src/assets/events/Cosplay.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Cosplay%20Contest.png',
    path: './src/assets/events/Cosplay Contest.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/MAREDIEVALTIMES.png',
    path: './src/assets/events/MAREDIEVALTIMES.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Maredival%20Times.png',
    path: './src/assets/events/Maredival Times.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/MareGallery.png',
    path: './src/assets/events/MareGallery.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Mare%20Gallery.png',
    path: './src/assets/events/Mare Gallery.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/TENDIEGLASS.png',
    path: './src/assets/events/TENDIEGLASS.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/Tendie.png',
    path: './src/assets/events/Tendie.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/nun_mare.png',
    path: './src/assets/events/nun_mare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/mobile/mobileTop.png',
    path: './src/assets/events/mobile/mobileTop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/mobile/mobileMid.png',
    path: './src/assets/events/mobile/mobileMid.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/events/mobile/mobileBot.png',
    path: './src/assets/events/mobile/mobileBot.png',
  }
]

const credits = [
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_pg1_observatory.png',
    path: './src/assets/credits/wizard_pg1_observatory.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_sky.png',
    path: './src/assets/credits/wizard_sky.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_pg2_constellation_fair.png',
    path: './src/assets/credits/wizard_pg2_constellation_fair.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_pg2_constellation_mimosa.png',
    path: './src/assets/credits/wizard_pg2_constellation_mimosa.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_pg2_silhouette.png',
    path: './src/assets/credits/wizard_pg2_silhouette.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_pg2_mare.png',
    path: './src/assets/credits/wizard_pg2_mare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/fleur.png',
    path: './src/assets/credits/fleur.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_pg1_mare.png',
    path: './src/assets/credits/wizard_pg1_mare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_pg2_programmers.png',
    path: './src/assets/credits/wizard_pg2_programmers.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/credits/wizard_pg2_artists.png',
    path: './src/assets/credits/wizard_pg2_artists.png',
  },
]
const misc = [
  {
    url: 'https://fair-filer.marefair.org/2026/misc/mf2026_withdate.png',
    path: './src/assets/misc/mf2026_withdate.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/misc/fun_raiser_daki_card_A.png',
    path: './src/assets/misc/fun_raiser_daki_card_A.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/misc/fun_raiser_daki_card_B.png',
    path: './src/assets/misc/fun_raiser_daki_card_B.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/misc/textured-paper.png',
    path: './src/assets/misc/textured-paper.png',
  },
]

const charity = [
  {
    url: 'https://fair-filer.marefair.org/2026/charity/CharitySign.png',
    path: './src/assets/charity/CharitySign.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/BackgroundSmall.png',
    path: './src/assets/charity/Background.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/Knight.png',
    path: './src/assets/charity/Knight.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/KnightPickedUp.png',
    path: './src/assets/charity/KnightPickedUp.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/TowerBase.png',
    path: './src/assets/charity/TowerBase.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/TowerInside.png',
    path: './src/assets/charity/TowerInside.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/TowerMiddle.png',
    path: './src/assets/charity/TowerMiddle.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/TowerTopDragonSmall.png',
    path: './src/assets/charity/TowerTopDragon.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/TowerTopHugNoDragon.png',
    path: './src/assets/charity/TowerTopHugNoDragon.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/Logos/FallenOak.png',
    path: './src/assets/charity/Logos/FallenOak.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/Logos/RainbowsEdge.jpg',
    path: './src/assets/charity/Logos/RainbowsEdge.jpg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/Logos/HorsesThatHelp.jpg',
    path: './src/assets/charity/Logos/HorsesThatHelp.jpg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/charity/Logos/PaintedHorse.png',
    path: './src/assets/charity/Logos/PaintedHorse.png',
  }
]
const musicians = [
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/Friday.png',
    path: './src/assets/musicians/Friday.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/Saturday.png',
    path: './src/assets/musicians/Saturday.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/questio.png',
    path: './src/assets/musicians/icons/questio.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/BlackWind.png',
    path: './src/assets/musicians/icons/BlackWind.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/horseHeresy.png',
    path: './src/assets/musicians/icons/horseHeresy.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/cantoacrylic.png',
    path: './src/assets/musicians/icons/cantoacrylic.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/EK.jpg',
    path: './src/assets/musicians/icons/EK.jpg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/Gren%20Hay.png',
    path: './src/assets/musicians/icons/Gren Hay.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/cantersoft.png',
    path: './src/assets/musicians/icons/cantersoft.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/mcmiag_zebra.jpg',
    path: './src/assets/musicians/icons/mcmiag_zebra.jpg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/moonlightLogoPurple.png',
    path: './src/assets/musicians/icons/moonlightLogoPurple.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/DJWIENERHORSESEXHAVER.png',
    path: './src/assets/musicians/icons/DJWIENERHORSESEXHAVER.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/MCP.png',
    path: './src/assets/musicians/icons/MCP.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/ValeFl0.png',
    path: './src/assets/musicians/icons/ValeFl0.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/shuffle.png',
    path: './src/assets/musicians/icons/shuffle.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/shuffle.png',
    path: './src/assets/musicians/icons/shuffle.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/sound%20bandit.jpg',
    path: './src/assets/musicians/icons/sound bandit.jpg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/icons/sylbie.png',
    path: './src/assets/musicians/icons/sylbie.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2026/musicians/Musicianmare.png',
    path: './src/assets/musicians/Musicianmare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/Musicianpagenote.png',
    path: './src/assets/musicians/Musicianpagenote.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/corpy.png',
    path: './src/assets/musicians/corpy.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/foreground.png',
    path: './src/assets/musicians/foreground.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/musicbox_NOTplaying.png',
    path: './src/assets/musicians/musicbox_NOTplaying.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/musicians/musicbox_playing.png',
    path: './src/assets/musicians/musicbox_playing.png',
  },
]

const schedules = [
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorsExp.png',
    path: './src/assets/schedules/RatingsVectorsExp.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorsQuestionable.png',
    path: './src/assets/schedules/RatingsVectorsQuestionable.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorsSafe.png',
    path: './src/assets/schedules/RatingsVectorsSafe.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorsSuggestive.png',
    path: './src/assets/schedules/RatingsVectorsSuggestive.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/schedules/RatingsUnratedFun.png',
    path: './src/assets/schedules/RatingsVectorsUnrated.png',
  },
]

const vendors = [
  {
    url: 'https://fair-filer.marefair.org/2026/vendor/stalls2b.png',
    path: './src/assets/vendors/stalls2b.png',
  },
]

const map = [
  {
    url: 'https://fair-filer.marefair.org/2026/map/mapbg.png',
    path: './src/assets/map/mapbg.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/map.png',
    path: './src/assets/map/map.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/soiree_name.png',
    path: './src/assets/map/Path/soiree_name.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/mimosa_name.png',
    path: './src/assets/map/Path/mimosa_name.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/matinee_name.png',
    path: './src/assets/map/Path/matinee_name.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/funraiser_name.png',
    path: './src/assets/map/Path/funraiser_name.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/fair_flyer_name.png',
    path: './src/assets/map/Path/fair_flyer_name.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/hoof_print.png',
    path: './src/assets/map/Path/hoof_print.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/left_footprint.png',
    path: './src/assets/map/Path/left_footprint.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/path1.svg',
    path: './src/assets/map/Path/path1.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/path2.svg',
    path: './src/assets/map/Path/path2.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/path3.svg',
    path: './src/assets/map/Path/path3.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/path4.svg',
    path: './src/assets/map/Path/path4.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/Path/path5.svg',
    path: './src/assets/map/Path/path5.svg',
  },

  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/16_shuttle_entrance.svg',
    path: './src/assets/map/MAP_SVG/16_shuttle_entrance.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/1_front_desk.svg',
    path: './src/assets/map/MAP_SVG/1_front_desk.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/5_bat_pony_bordello.svg',
    path: './src/assets/map/MAP_SVG/5_bat_pony_bordello.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/9_crypt_of_undead_cons.svg',
    path: './src/assets/map/MAP_SVG/9_crypt_of_undead_cons.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/11_dark_lord_anon_oc_dungeon.svg',
    path: './src/assets/map/MAP_SVG/11_dark_lord_anon_oc_dungeon.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/10_fair_flyer_fairy_ring.svg',
    path: './src/assets/map/MAP_SVG/10_fair_flyer_fairy_ring.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/6_florb_wizard_tower.svg',
    path: './src/assets/map/MAP_SVG/6_florb_wizard_tower.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/14_gatormare_charity_hoard.svg',
    path: './src/assets/map/MAP_SVG/14_gatormare_charity_hoard.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/8_info_desk.svg',
    path: './src/assets/map/MAP_SVG/8_info_desk.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/20_fun_raiser_levitation_station.svg',
    path: './src/assets/map/MAP_SVG/20_fun_raiser_levitation_station.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/18_mare_gallery.svg',
    path: './src/assets/map/MAP_SVG/18_mare_gallery.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/17_mare_square.svg',
    path: './src/assets/map/MAP_SVG/17_mare_square.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/3_mare_stage.svg',
    path: './src/assets/map/MAP_SVG/3_mare_stage.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/7_marechandise.svg',
    path: './src/assets/map/MAP_SVG/7_marechandise.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/12_nasapone_tinkering_tent.svg',
    path: './src/assets/map/MAP_SVG/12_nasapone_tinkering_tent.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/normalize_svgs.py',
    path: './src/assets/map/MAP_SVG/normalize_svgs.py',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/2_registration.svg',
    path: './src/assets/map/MAP_SVG/2_registration.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/13_renegade_stage.svg',
    path: './src/assets/map/MAP_SVG/13_renegade_stage.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/19_sunbeam_sanctum.svg',
    path: './src/assets/map/MAP_SVG/19_sunbeam_sanctum.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/21_twin_vestiary.svg',
    path: './src/assets/map/MAP_SVG/21_twin_vestiary.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/4_vendor_stalls.svg',
    path: './src/assets/map/MAP_SVG/4_vendor_stalls.svg',
  },
  {
    url: 'https://fair-filer.marefair.org/2026/map/MAP_SVG/15_janny_closet.svg',
    path: './src/assets/map/MAP_SVG/15_janny_closet.svg',
  },
]

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.arrayBuffer();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(url, retries) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetchWithTimeout(url, TIMEOUT_MS);
    } catch (err) {
      lastErr = err;
      console.warn(`Attempt ${attempt}/${retries} failed for ${url}: ${err.message}`);
      if (attempt < retries) await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
  throw lastErr;
}

async function downloadOne({ url, path, isReplace }) {
  if (fs.existsSync(path) && !isReplace) {
    console.log(`Already exists: ${path}`);
    return;
  }
  if (fs.existsSync(path) && isReplace) {
    console.log(`Already exists, will be replaced: ${path}`);
  }

  console.log(`Downloading: ${url}`);
  try {
    const buffer = await fetchWithRetry(url, MAX_RETRIES);
    fs.mkdirSync(path.split('/').slice(0, -1).join('/'), { recursive: true });
    fs.writeFileSync(path, Buffer.from(buffer));
    console.log(`Saved: ${path}`);
  } catch (err) {
    console.error(`FAILED after ${MAX_RETRIES} attempts: ${url} — ${err.message}`);
    // decide: throw to fail the build, or swallow to let build continue
    throw err;
  }
}

// simple concurrency pool
async function fetchImages(imageList) {
  const queue = [...imageList];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const item = queue.shift();
      await downloadOne(item);
    }
  });
  await Promise.all(workers);
}

fetchImages(main);
fetchImages(news);
fetchImages(bg);
fetchImages(coc);
fetchImages(venue);
fetchImages(apply);
fetchImages(contact);
fetchImages(about);
fetchImages(register);
fetchImages(comics);
fetchImages(steam);
fetchImages(sponsors);
fetchImages(mascots);
fetchImages(scrapbook);
fetchImages(events);
fetchImages(misc);
fetchImages(credits);
fetchImages(charity);
fetchImages(schedules);
fetchImages(vendors);
fetchImages(map);
fetchImages(musicians);
