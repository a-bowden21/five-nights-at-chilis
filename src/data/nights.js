/**
 * Night configuration.
 * Each night lists which enemies are active, their starting room,
 * aggression level (1-20), and the path they follow toward the office.
 *
 * Enemies are Italian Brainrot characters:
 *   🥁 Tung Tung Tung Sahur   — the drumming menace, fast and relentless (LEFT side)
 *   🩰 Ballerina Cappuccina   — graceful but deadly, slow and persistent (RIGHT side)
 *   🐟 Tralalero Tralala      — the walking fish, unpredictable (RIGHT side)
 *   🐊 Bombardino Crocodilo   — the explosive croc, aggressive (LEFT side)
 */

export const NIGHTS = [
  {
    night: 1,
    duration: 300,
    powerDrainRate: 1.0,
    enemies: [
      {
        id: 'tungtung',
        name: 'Tung Tung Tung Sahur',
        emoji: '🥁',
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
        id: 'tungtung',
        name: 'Tung Tung Tung Sahur',
        emoji: '🥁',
        startRoom: 'back_alley',
        aggression: 5,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 5,
      },
      {
        id: 'ballerina',
        name: 'Ballerina Cappuccina',
        emoji: '🩰',
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
        id: 'tungtung',
        name: 'Tung Tung Tung Sahur',
        emoji: '🥁',
        startRoom: 'back_alley',
        aggression: 7,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 4,
      },
      {
        id: 'ballerina',
        name: 'Ballerina Cappuccina',
        emoji: '🩰',
        startRoom: 'lobby',
        aggression: 5,
        path: ['lobby', 'bar_area', 'restrooms_hallway', 'right_hallway'],
        moveInterval: 5,
      },
      {
        id: 'tralalero',
        name: 'Tralalero Tralala',
        emoji: '🐟',
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
        id: 'tungtung',
        name: 'Tung Tung Tung Sahur',
        emoji: '🥁',
        startRoom: 'back_alley',
        aggression: 10,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 4,
      },
      {
        id: 'ballerina',
        name: 'Ballerina Cappuccina',
        emoji: '🩰',
        startRoom: 'lobby',
        aggression: 7,
        path: ['lobby', 'bar_area', 'restrooms_hallway', 'right_hallway'],
        moveInterval: 5,
      },
      {
        id: 'tralalero',
        name: 'Tralalero Tralala',
        emoji: '🐟',
        startRoom: 'lobby',
        aggression: 5,
        path: ['lobby', 'party_room_a', 'party_room_b', 'right_hallway'],
        moveInterval: 5,
      },
      {
        id: 'bombardino',
        name: 'Bombardino Crocodilo',
        emoji: '🐊',
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
        id: 'tungtung',
        name: 'Tung Tung Tung Sahur',
        emoji: '🥁',
        startRoom: 'back_alley',
        aggression: 14,
        path: ['back_alley', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 3,
      },
      {
        id: 'ballerina',
        name: 'Ballerina Cappuccina',
        emoji: '🩰',
        startRoom: 'lobby',
        aggression: 10,
        path: ['lobby', 'bar_area', 'restrooms_hallway', 'right_hallway'],
        moveInterval: 4,
      },
      {
        id: 'tralalero',
        name: 'Tralalero Tralala',
        emoji: '🐟',
        startRoom: 'lobby',
        aggression: 8,
        path: ['lobby', 'party_room_a', 'party_room_b', 'right_hallway'],
        moveInterval: 4,
      },
      {
        id: 'bombardino',
        name: 'Bombardino Crocodilo',
        emoji: '🐊',
        startRoom: 'supply_closet',
        aggression: 7,
        path: ['supply_closet', 'kitchen', 'expo_window', 'left_hallway'],
        moveInterval: 5,
      },
    ],
  },
];
