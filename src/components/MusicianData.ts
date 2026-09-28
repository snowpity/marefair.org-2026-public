
import Friday from "@assets/musicians/Friday.png"
import Saturday from "@assets/musicians/Saturday.png"

// Musician icons
import SoundBandit from "@assets/musicians/icons/sound bandit.jpg"
import mcmiag from "@assets/musicians/icons/mcmiag_zebra.jpg"
import Moonlight from "@assets/musicians/icons/moonlightLogoPurple.png"
import DJHSH from "@assets/musicians/icons/DJWIENERHORSESEXHAVER.png"
import Shuffle from "@assets/musicians/icons/shuffle.png"
import ValeFL0 from "@assets/musicians/icons/ValeFl0.png"
import Sylbie from "@assets/musicians/icons/sylbie.png"
import EK from "@assets/musicians/icons/EK.jpg"
import Cantersoft from "@assets/musicians/icons/cantersoft.png"
import GrenHay from "@assets/musicians/icons/Gren Hay.png"
import CantoAcrylic from "@assets/musicians/icons/cantoacrylic.png"
import HorseHeresy from "@assets/musicians/icons/horseHeresy.png"
import BlackWind from "@assets/musicians/icons/BlackWind.png"
import questio from "@assets/musicians/icons/questio.png"

const musicURL = "https://fair-filer.marefair.org/2026/musicians/music/"

export const musicians = [
    {
        art: Friday,
    },
    /*
    {
        name: "Canto Acrylic",
        desc: "Prepare your flanks for Canto Acrylic! At a pitch only dogs should hear, he’s got music for you to mosh, drink, and shake some ass to! Come get it [redacted]! XP",
        music: musicURL + "ConquerSGLFINAL3.mp3",
        musicName: "Conuquer",
        art: CantoAcrylic,
        time: "08:30 PM",
        'youtube-link': "https://youtube.com/@cantoacrylic",
        'bandcamp-link': "https://cantoacrylic.bandcamp.com/",
    },
    */
    { // Wild Card // Vagueposting
        name: "???",
        desc: "Vagueposting final boss",
        music: musicURL + "wind.mp3",
        musicName: "Vagueposting?",
        art: questio,
        time: "09:15 PM",
    },
    {
        name: "Green Hay",
        desc: `we are Green Hay!! Here to play our anti-Twilight, pro-Trixie propaganda for all your lil pony ears to hear! Formed of PrinceWhateverer and MelodyBrony we plan to sprinkle some of our own tunes in the mix as well! We hope you enjoy our loud and energetic nonsense ;D `,
        music: musicURL + "Green%20Hay%20-%2001%20Equestrian%20Idiot%20V2.wav",
        musicName: "Wildfire",
        art: GrenHay,
        time: "9:45 PM",
        'bandcamp-link': [
            "https://princewhateverer.bandcamp.com/",
            "https://melodybrony.bandcamp.com/"
        ],
    },
    {
        name: "ElectroKaplosion",
        desc: "I pretend like I can make music and video games sometimes. I really love mares. Mare music for mare schizos.",
        music: musicURL + "EK_Sample.mp3",
        musicName: "Untitled",
        art: EK,
        time: "10:45 PM",
        'youtube-link': "https://www.youtube.com/@ElectroKaplosion",
        'bandcamp-link': "https://electrokaplosion.bandcamp.com/",
    },
    {
        name: "DJ Moonlight Strike",
        desc: "Bringing hella fresh scratches and hella cringe pony beats, DJ Moonlight Strike turns up the night with a barrage of nostalgic bangers. The records will spin, the fun will be doubled, and the beautiful songs of our favorite multi-colored mares will take you right to Equestria and make you remember why you fell in love with the show in the first place. It will truly be \"The Best Rave Ever\"",
        music: musicURL + "moonlightSampleMare.mp3",
        musicName: "Untitled",
        art: Moonlight,
        time: "11:15 PM",
        'youtube-link': "https://soundcloud.com/moonlightstrike",
    },
    {
        name: "Sound Bandit",
        desc: "sound bandit makes pony music plays it sometimes sings it so yeah",
        music: musicURL + "MAKE%20SOMETHING%20-%20Sound%20Bandit.mp3",
        musicName: "MAKE SOMETHING",
        art: SoundBandit,
        time: "12:00 AM",
        'youtube-link': "https://www.youtube.com/@SoundBandit",
        'bandcamp-link': "https://soundbandit.bandcamp.com/",
        'soundcloud-link': "https://soundcloud.com/soundbandit",
        'other-link': "https://soundbandit.stream/"
    },
    {
        name: "mycutiemarkisagun",
        desc: "808s & Fluttershy YAY.wav shitposting. Lofi brony cringe compilation hip-hop. **PONY SEX.** [make sure that's bold font, it'll get their attention] There will be no clips of Billy Mays selling Oxy-Clean, because Billy Mays *(rest in power)* was not a mare. You know who is a mare tho? 76ers power forward LEBRON JAMES. Holy fuck wow we got bron. Pinkie Pie is Best Pony, praise be upon her. Imagine that one gif of Pinkie dancing right now. ![Pinkie Buckball](https://derpicdn.net/img/view/2016/9/3/1241047.gif) No not that one, the other one. ![smexy](https://derpicdn.net/img/view/2013/4/20/303132.gif) This bio is zebra agitprop. 4, 8, 15, 16, 23, 42, 1138",
        music: musicURL + "THE_DEFINITION.mp3",
        musicName: "THE DEFINITION",
        art: mcmiag,
        time: "12:30 AM",
        'bandcamp-link': "https://free-zebras-and-black-power.bandcamp.com",
    },

    {
        art: Saturday,
    },
    {
        name: "BlackWind",
        desc: `We are a brand new California-based supergroup with an assorted variety of classic Rock, Metal and Punk songs with lyrics about some colourful miniature-size horses that are (you)rs! We consist of guitarist & vocalist The Black Queen and drummer Whirlwind! On support, Cantersoft joins us on bass guitar, with some special guests including Canto Acrylic, PonerOne, and more! This Bio was prompted using Sparkle AI - We thank you for your mare cookies used to train our data centers, not like you had a choice! Oops forgot to edit that part out...`,
        music: musicURL + "blackwind.mp3",
        musicName: "HeLuna (So Long & Sleep Tight)",
        art: BlackWind,
        time: "08:00 PM",
        'youtube-link': [
            "https://www.youtube.com/@TheBlackQueen",
            "https://www.youtube.com/channel/UCxH3y7TLkw25KQHkYk_6vMg"
        ],
        'bandcamp-link': [
            "https://theblackqueenmusic.bandcamp.com/",
            "https://whirlwindstudios.bandcamp.com/"
        ]
    },
    {
        name: "Cantersoft",
        desc: "I'm a pony macaroni, that's all you need to know. Come to my set and dance to FiM classics and pony parodies of popular songs! 🦄",
        music: musicURL + "I%20Think%20Im%20A%20Pone%20Now.flac",
        musicName: "I Think I'm a Pone Now",
        art: Cantersoft,
        time: "08:45 PM",
        'youtube-link': "https://www.youtube.com/@Cantersoft",
        'bandcamp-link': "https://cantersoft.bandcamp.com/",
    },
    {
        name: "Horse Heresy",
        desc: `Ready thy mares for the mighty power that Horse Heresy shall bring unto the stage! We are six sweaty, greasy, and devoted bronies, sworn to thunderous riffs, shrieking synths, and heart-pounding rock.

Our music sets the crowd to dancing, the mares to moaning, and the bronies to clapping! Come one, come all, and join us for a night of glorious noise.

We hope to behold thee there tonight!
`,
        music: musicURL + "11%20Horse%20Heresy.wav",
        musicName: "Untitled",
        art: HorseHeresy,
        time: "09:15 PM",
        'youtube-link': "https://www.youtube.com/@HorseHeresyBand",
        'bandcamp-link': "https://horseheresy.bandcamp.com/",
        'spotify-link': "https://open.spotify.com/artist/6o8QwagNEXK2y7eiR52NON",
    },
    {
        name: "Sylv~r",
        desc: "Silver Sky aka; SyLv~r is a new horse music producer, all original music ranging from EDM, Electropop, House, Glitchstep and more. Come join them for their debut live performance! 🦄",
        music: musicURL + "everypony%20wants%20you%20to%20stay%20(so%20stay).mp3",
        musicName: "Everypony wants you to stay (so stay)",
        art: Sylbie,
        time: "10:00 PM",
        'youtube-link': "https://www.youtube.com/@SyLzky",
        'bandcamp-link': "https://sylzky.bandcamp.com/",
    },
    {
        name: "Shuffle",
        desc: `Hard kicks, heavy bass, and euphoric melodies...get ready for hard dance poni poni tracks from Shuffle :)`,
        music: musicURL + "shuffle_returns_intro.wav",
        musicName: "Shuffle Returns",
        art: Shuffle,
        time: "10:30 PM",
        'youtube-link': "https://www.youtube.com/@shuffle2129/",
    },
    {
        name: "Vale & Fl0",
        desc: "Recharge your vril at Kung FL0 Panda’s fun and enjoyable edm set featuring originals by Vale and FL0 and certified horse classics.",
        music: musicURL + "vale_and_fl0_intro.mp3",
        musicName: "Vale and Fl0 Intro",
        art: ValeFL0,
        time: "11:15 PM",
        'youtube-link': "https://www.youtube.com/@valefl0",
    },
    {
        name: "HorseSchnitzelHaver",
        desc: `HorseSexHaver, born on the 26th of July 1932, Is an ensamble of sensory instruments patented and invented by the Serbian Nationalist writer Dobrica Ćosić, after he fell down a flight of stairs and landed right in RainbowDash´s ponut.
Listening to HorseSexHavers music has been compared to a light European cleanse of the lower footing. Further, we have a summary in HorseSexHavers own words:
“THE FOG IS COMING AAAA IT BURNS IT BURNS THE VOICE UNDER MY SCALP THE VOICE UNDER MY SCALP THE VOICE UNDER MY SCALP THE VOICE UNDER MY SCALP THE VOICE UNDER MY SCALP THE VOICE UNDER MY SCALP.”
░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░
░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░
░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░
░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░
░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░
█░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█
█░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█
░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░
░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░
░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░
░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░
░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░
░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░
░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░
░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░ six seven enehahhahasnemhsehamsehm

also the funny schnitzel guy is there too - DJ Wiener Schnitzel

yeah add that too - HorseSexHaver`,
        music: musicURL + "hsh.wav",
        musicName: "Untitled",
        art: DJHSH,
        time: "12:00 AM",
        'youtube-link': [
            "https://www.youtube.com/@HorseSexHaver",
            "https://www.youtube.com/@DJWienerSchnitzel"
        ],
    },
]