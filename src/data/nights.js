/**
 * Night configuration.
 * Each night lists which enemies are active, their starting room,
 * aggression level (1-20), and the path they follow toward the office.
 *
 * Enemies are the Pepper Pals from Chili's:
 *   🌶️ Pepper   — the main red pepper, sneaky and fast (LEFT side)
 *   🫑 Sage     — the green bell pepper, slow but persistent (RIGHT side)
 *   🔥 Cayenne  — the fiery orange pepper, aggressive (LEFT side)
 *   🌿 Chili    — the small green chili, unpredictable (RIGHT side)
 */

export const NIGHTS = [
  {
    night: 1,
    duration: 300,
    powerDrainRate: 1.0,
    enemies: [
      {
        id: 'pepper',
        name: 'Pepper',
        emoji: '🌶️',
        startRoom: 'back_alley',
        aggression: 3,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 5,
      },
    ],
  },
  {
    night: 2,
    duration: 300,
    powerDrainRate: 1.1,
    enemies: [
      {
        id: 'pepper',
        name: 'Pepper',
        emoji: '🌶️',
        startRoom: 'back_alley',
        aggression: 5,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 5,
      },
      {
        id: 'sage',
        name: 'Sage',
        emoji: '🫑',
        startRoom: 'lobby',
        aggression: 3,
        path: ['lobby', 'bar_area', 'restrooms_hallway', 'right_hallway'],
        moveInterval: 6,
      },
    ],
  },
  {
    night: 3,
    duration: 300,
    powerDrainRate: 1.2,
    enemies: [
      {
        id: 'pepper',
        name: 'Pepper',
        emoji: '🌶️',
        startRoom: 'back_alley',
        aggression: 7,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 4,
      },
      {
        id: 'sage',
        name: 'Sage',
        emoji: '🫑',
        startRoom: 'lobby',
        aggression: 5,
        path: ['lobby', 'bar_area', 'restrooms_hallway', 'right_hallway'],
        moveInterval: 5,
      },
      {
        id: 'chili',
        name: 'Chili',
        emoji: '🌿',
        startRoom: 'lobby',
        aggression: 3,
        path: ['lobby', 'party_room_a', 'party_room_b', 'right_hallway'],
        moveInterval: 6,
      },
    ],
  },
  {
    night: 4,
    duration: 300,
    powerDrainRate: 1.3,
    enemies: [
      {
        id: 'pepper',
        name: 'Pepper',
        emoji: '🌶️',
        startRoom: 'back_alley',
        aggression: 10,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 4,
      },
      {
        id: 'sage',
        name: 'Sage',
        emoji: '🫑',
        startRoom: 'lobby',
        aggression: 7,
        path: ['lobby', 'bar_area', 'restrooms_hallway', 'right_hallway'],
        moveInterval: 5,
      },
      {
        id: 'chili',
        name: 'Chili',
        emoji: '🌿',
        startRoom: 'lobby',
        aggression: 5,
        path: ['lobby', 'party_room_a', 'party_room_b', 'right_hallway'],
        moveInterval: 5,
      },
      {
        id: 'cayenne',
        name: 'Cayenne',
        emoji: '🔥',
        startRoom: 'supply_closet',
        aggression: 4,
        path: ['supply_closet', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 6,
      },
    ],
  },
  {
    night: 5,
    duration: 360,
    powerDrainRate: 1.5,
    enemies: [
      {
        id: 'pepper',
        name: 'Pepper',
        emoji: '🌶️',
        startRoom: 'back_alley',
        aggression: 14,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 3,
      },
      {
        id: 'sage',
        name: 'Sage',
        emoji: '🫑',
        startRoom: 'lobby',
        aggression: 10,
        path: ['lobby', 'bar_area', 'restrooms_hallway', 'right_hallway'],
        moveInterval: 4,
      },
      {
        id: 'chili',
        name: 'Chili',
        emoji: '🌿',
        startRoom: 'lobby',
        aggression: 8,
        path: ['lobby', 'party_room_a', 'party_room_b', 'right_hallway'],
        moveInterval: 4,
      },
      {
        id: 'cayenne',
        name: 'Cayenne',
        emoji: '🔥',
        startRoom: 'supply_closet',
        aggression: 7,
        path: ['supply_closet', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 5,
      },
    ],
  },
];
