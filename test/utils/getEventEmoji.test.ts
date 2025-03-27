import { describe, it, expect } from 'vitest';
import getEventEmoji from '../../src/utils/getEventEmoji';

describe('getEventEmoji', () => {
  it('returns correct emoji for known event types', () => {
    expect(getEventEmoji('Dinner')).toBe('🍽️');
    expect(getEventEmoji('Workshop')).toBe('💻');
    expect(getEventEmoji('Brunch')).toBe('☕');
    expect(getEventEmoji('Tour')).toBe('🚌');
    expect(getEventEmoji('Meetup')).toBe('🤝');
    expect(getEventEmoji('Party')).toBe('🎉');
    expect(getEventEmoji('Conference')).toBe('🗣️');
    expect(getEventEmoji('Other')).toBe('❓');
    expect(getEventEmoji('Coliving')).toBe('🏠');
    expect(getEventEmoji('Breakfast')).toBe('🥐');
    expect(getEventEmoji('Lunch')).toBe('🍱');
    expect(getEventEmoji('Hack')).toBe('🛠️');
  });

  it('returns default emoji for unknown event types', () => {
    expect(getEventEmoji('Nonexistent')).toBe('❓');
    expect(getEventEmoji('')).toBe('❓');
    expect(getEventEmoji('random event')).toBe('❓');
  });
});
