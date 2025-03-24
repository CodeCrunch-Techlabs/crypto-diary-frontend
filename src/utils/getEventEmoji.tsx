function getEventEmoji(eventType: string) {
    const emojiMap = {
      'Dinner': '🍽️',
      'Workshop': '💻',
      'Brunch': '☕',
      'Tour': '🚌',
      'Meetup': '🤝',
      'Party': '🎉',
      'Conference': '🗣️',
      'Other': '❓',
      'Coliving': '🏠',
      'Breakfast': '🥐',
      'Lunch': '🍱',
      'Hack': '🛠️'
    };

    return emojiMap[eventType as keyof typeof emojiMap] || '❓';
}

export default getEventEmoji;