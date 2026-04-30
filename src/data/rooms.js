/**
 * Room / camera map configuration for Five Nights at Chili's.
 * 12 rooms total, each with an id, display name, description,
 * decorations (emoji art), and list of adjacent rooms.
 *
 * Layout concept:
 *
 *   LEFT SIDE (Left Door):
 *   [Back Alley] ──► [Kitchen] ──► [Expo Window] ──► [Left Hallway]
 *                        │  │
 *   [Supply Closet] ─────┘  │
 *                            ▼
 *   RIGHT SIDE (Right Door):
 *   [Lobby] ──► [Bar Area] ──► [Restrooms Hallway] ──► [Right Hallway]
 *     │
 *   [Party Room A] ──► [Party Room B] ──► [Right Hallway]
 *
 *   [Left Hallway] ──► OFFICE (left door)
 *   [Right Hallway] ──► OFFICE (right door)
 */

export const ROOMS = [
  {
    id: 'back_alley',
    name: 'CAM 1 — Back Alley',
    adjacent: ['kitchen'],
    description: 'The dumpsters behind the restaurant. Smells like old queso.',
    decor: [
      '🗑️  🗑️        🚪',
      '   💨    🐀      ',
      '🧱🧱🧱🧱🧱🧱🧱🧱',
      '  ☁️   🌙        ',
    ],
  },
  {
    id: 'kitchen',
    name: 'CAM 2 — Kitchen',
    adjacent: ['expo_window', 'supply_closet', 'lobby'],
    description: 'Grills still hot. Sizzling fajita pans left unattended.',
    decor: [
      '🍳 🔥🔥 🍳  🔪🔪',
      '🥩  🌮  🫕  🧅🧄',
      '┌────────────────┐',
      '│  GRILL STATION  │',
      '└────────────────┘',
    ],
  },
  {
    id: 'supply_closet',
    name: 'CAM 3 — Supply Closet',
    adjacent: ['kitchen'],
    description: 'Shelves of hot sauce and cleaning supplies. Very cramped.',
    decor: [
      '🧴🧹🧽  🫙🫙🫙',
      '📦📦📦  🌶️🌶️🌶️',
      '🧯   🪣    💡',
      '─── SHELVES ───',
    ],
  },
  {
    id: 'expo_window',
    name: 'CAM 4 — Expo Window',
    adjacent: ['left_hallway'],
    description: 'Where the food goes out. Heat lamps glowing orange.',
    decor: [
      '🔶🔶🔶 HEAT LAMPS 🔶🔶🔶',
      '🍽️ 🌯  🥗  🍔  🌮  🍽️',
      '┌──────────────────────┐',
      '│    ORDER UP! 🔔      │',
      '└──────────────────────┘',
    ],
  },
  {
    id: 'left_hallway',
    name: 'CAM 5 — Left Hallway',
    adjacent: [],
    side: 'left',
    description: 'The left corridor to your office. Pipes drip overhead...',
    decor: [
      '║ 💧       ║',
      '║  💡  💡  ║',
      '║  ░░░░░░  ║',
      '║← OFFICE  ║',
    ],
  },
  {
    id: 'lobby',
    name: 'CAM 6 — Lobby',
    adjacent: ['bar_area', 'party_room_a'],
    description: 'The front entrance. Pepper Pals standees by the host podium.',
    decor: [
      '🚪        🪧 WELCOME!',
      '  🌶️🌶️🌶️  ← Standees',
      '🪑🪑  📋  🪑🪑',
      '═══ HOST PODIUM ═══',
    ],
  },
  {
    id: 'bar_area',
    name: 'CAM 7 — Bar Area',
    adjacent: ['restrooms_hallway', 'lobby'],
    description: 'Neon signs buzz. Half-empty margarita glasses on the bar.',
    decor: [
      '🍹🍸  🍺  🍹  🥃  🍸',
      '━━━━━ BAR TOP ━━━━━',
      '📺        💡  🎵',
      '🪑 🪑 🪑 🪑 🪑 🪑',
    ],
  },
  {
    id: 'restrooms_hallway',
    name: 'CAM 8 — Restrooms Hallway',
    adjacent: ['right_hallway'],
    description: 'Flickering fluorescent lights. One restroom door is ajar.',
    decor: [
      '💡~~  ~~💡~~  ~~💡',
      '🚹       🚺       ',
      '│ door │   │ door  │',
      '══════════════════',
    ],
  },
  {
    id: 'party_room_a',
    name: 'CAM 9 — Party Room A',
    adjacent: ['party_room_b', 'lobby'],
    description: 'Balloons and streamers. A half-eaten birthday cake.',
    decor: [
      '🎈🎈  🎉  🎈🎈',
      '🎂  🍰  🕯️  🍕',
      '🪑🪑🪑🪑🪑🪑',
      '═══ PARTY TABLE ═══',
    ],
  },
  {
    id: 'party_room_b',
    name: 'CAM 10 — Party Room B',
    adjacent: ['right_hallway'],
    description: 'Abandoned crayons and kids menus. Something moved...',
    decor: [
      '🖍️🖍️  📝  🖍️🖍️',
      '🎁  🧸     🎈',
      '🪑🪑  🪑🪑  🪑',
      '── KIDS CORNER ──',
    ],
  },
  {
    id: 'right_hallway',
    name: 'CAM 11 — Right Hallway',
    adjacent: [],
    side: 'right',
    description: 'The right corridor to your office. You hear breathing...',
    decor: [
      '║       💧 ║',
      '║  💡  💡  ║',
      '║  ░░░░░░  ║',
      '║  OFFICE →║',
    ],
  },
];

/** Quick lookup by room id */
export const ROOM_MAP = Object.fromEntries(ROOMS.map((r) => [r.id, r]));
