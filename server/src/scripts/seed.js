import mongoose from 'mongoose';
import { config } from '../config/env.js';
import { Project } from '../models/Project.js';
import { Dream } from '../models/Dream.js';
import { VisitorStat } from '../models/VisitorStat.js';

const projectsToSeed = [
  {
    title: 'The Lullaby Lab',
    slug: 'the-lullaby-lab',
    category: 'Sound Invention',
    badge: 'Audio Synthesizer',
    imageUrl: '/images/pip_lullaby_box.png',
    description:
      'A whimsical music box that catches fallen starlight and turns it into gentle chimes and sleepy melodies. Built with brass gears and moon dust so little creatures drift into sweet slumbers without scary noises.',
    features: [
      'Interactive Web Audio synthesis',
      'Real-time star chord progression',
      'Volume and soothing chime generator',
      '100% gentle and whisper-quiet'
    ],
    sortOrder: 1,
    featured: true,
    published: true
  },
  {
    title: 'Nightlight Collection',
    slug: 'nightlight-collection',
    category: 'Glow Engineering',
    badge: 'Bedside Lantern',
    imageUrl: '/images/pip_dream_lantern.png',
    description:
      'Handcrafted bedside lanterns designed by Pip to chase away shadows under the bed. Powered by captured moonlight and sleepy fireflies, each lantern casts a cozy peach and lavender aura across the nursery.',
    features: [
      'Interactive light switch with warm glow aura',
      'Adjustable soft brightness modes',
      'Shadow-calming starlight lens',
      'Cozy room ambiance'
    ],
    sortOrder: 2,
    featured: true,
    published: true
  },
  {
    title: 'Dream Delivery Routes',
    slug: 'dream-delivery-routes',
    category: 'Night Sky Navigation',
    badge: 'Flight Radar 1999',
    imageUrl: '/images/pip_avatar_cloud.png',
    description:
      'The cosmic flight map Pip uses to pilot his cloud across midnight rooftops. Connects the Cloud Castle to the Moon Garden with zero bumpy turbulence so bedtime dreams arrive right on schedule.',
    features: [
      'Interactive destination selector',
      'Real-time flight path calculation',
      'Sticker discovery checkpoint system',
      'Live delivery dispatch status'
    ],
    sortOrder: 3,
    featured: true,
    published: true
  }
];

const dreamsToSeed = [
  {
    title: 'The Cloud Castle Dream',
    slug: 'cloud-castle-dream',
    description:
      'Floating high above sleepy treetops, this castle is made of spun sugar and marshmallow pillows. Sleepers get to slide down rainbow banisters straight into bed.',
    destination: 'Cumulus Heights',
    color: '#9AB2D4', // Powder blue
    rarity: 'Common',
    illustration: 'cloud-castle',
    coordinates: { x: 22, y: 28 },
    deliveryStatus: 'Dispatched via Cloud Express',
    published: true
  },
  {
    title: 'The Moon Garden Dream',
    slug: 'moon-garden-dream',
    description:
      'A secret garden on the silver crescent where silver bellflowers ring soft chimes and sleepy bunnies sip chamomile tea with silver spoons.',
    destination: 'Crescent Crater',
    color: '#CDBCDB', // Lavender
    rarity: 'Rare',
    illustration: 'moon-garden',
    coordinates: { x: 78, y: 20 },
    deliveryStatus: 'Blooming under moonbeams',
    published: true
  },
  {
    title: 'The Tiny Rocket Dream',
    slug: 'tiny-rocket-dream',
    description:
      'A retro wooden rocket ship fueled by bubble-tea fizz that gently orbits the planet Saturn before returning home in time for breakfast pancakes.',
    destination: 'Saturn Rings',
    color: '#F0743E', // Orange
    rarity: 'Rare',
    illustration: 'tiny-rocket',
    coordinates: { x: 85, y: 72 },
    deliveryStatus: 'Drifting at gentle orbital speed',
    published: true
  },
  {
    title: 'The Sleepy Dinosaur Dream',
    slug: 'sleepy-dinosaur-dream',
    description:
      'A giant pastel brontosaurus who wears a gigantic knit nightcap. Children can climb up his soft tail to read bedtime stories under the stars.',
    destination: 'Fern Valley',
    color: '#AAD59E', // Mint green
    rarity: 'Common',
    illustration: 'sleepy-dinosaur',
    coordinates: { x: 18, y: 75 },
    deliveryStatus: 'Snoring softly in the moss',
    published: true
  },
  {
    title: 'The Rainbow Treehouse Dream',
    slug: 'rainbow-treehouse-dream',
    description:
      'A seven-story wooden treehouse wrapped in glowing fairy lights with a rope ladder, telescope balcony, and secret cookie jar.',
    destination: 'Whispering Canopy',
    color: '#F6C3AE', // Peach
    rarity: 'Legendary',
    illustration: 'rainbow-treehouse',
    coordinates: { x: 50, y: 48 },
    deliveryStatus: 'Lanterns glowing warmly',
    published: true
  },
  {
    title: 'The Starfish Balloon Dream',
    slug: 'starfish-balloon-dream',
    description:
      'Gliding through an ocean of deep twilight indigo, riding atop a giant friendly golden starfish balloon carrying sleepy wishes to the stars.',
    destination: 'Starlight Lagoon',
    color: '#FDD848', // Sunshine yellow
    rarity: 'Cosmic',
    illustration: 'starfish-balloon',
    coordinates: { x: 45, y: 85 },
    deliveryStatus: 'Floating gently on midnight currents',
    published: true
  }
];

const seed = async () => {
  if (!config.mongodbUri) {
    console.error(
      '❌ [SEED ERROR] Cannot seed database: MONGODB_URI is not set in server/.env.\n' +
      '   Please add your connection string and run "npm run seed" again.'
    );
    process.exit(1);
  }

  try {
    console.log('🔌 Connecting to MongoDB for seeding...');
    await mongoose.connect(config.mongodbUri, { serverSelectionTimeoutMS: 5000 });
    console.log('✨ Connected. Seeding Pip’s Midnight Observatory records safely...\n');

    // 1. Projects (idempotent upsert by slug)
    let projectsInserted = 0;
    let projectsExisting = 0;
    for (const proj of projectsToSeed) {
      const existing = await Project.findOne({ slug: proj.slug });
      if (!existing) {
        await Project.create(proj);
        projectsInserted++;
      } else {
        projectsExisting++;
      }
    }
    console.log(`📦 Projects: ${projectsInserted} inserted, ${projectsExisting} already up to date.`);

    // 2. Dreams (idempotent upsert by slug)
    let dreamsInserted = 0;
    let dreamsExisting = 0;
    for (const dream of dreamsToSeed) {
      const existing = await Dream.findOne({ slug: dream.slug });
      if (!existing) {
        await Dream.create(dream);
        dreamsInserted++;
      } else {
        dreamsExisting++;
      }
    }
    console.log(`⭐ Dreams:   ${dreamsInserted} inserted, ${dreamsExisting} already up to date.`);

    // 3. Visitor Counter initialized if absent
    const counter = await VisitorStat.findOne({ key: 'observatory_counter' });
    if (!counter) {
      await VisitorStat.create({ key: 'observatory_counter', totalVisits: 1042 });
      console.log('📟 Counter:  Initialized retro odometer at 1,042 visits.');
    } else {
      console.log(`📟 Counter:  Current count is ${counter.totalVisits} visits.`);
    }

    console.log('\n🌟 [SEED SUCCESS] Pip’s Midnight Observatory is seeded and ready!\n');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ [SEED FAILED]:', error.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seed();

