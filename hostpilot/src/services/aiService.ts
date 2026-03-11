export const aiService = {
  parseDispatcherRequest(text: string) {
    const normalized = text.toLowerCase();
    return {
      category: normalized.includes('ηλεκτρολόγ') ? 'Ηλεκτρολόγοι' : normalized.includes('καθαρισ') ? 'Καθαριστές Airbnb' : 'General',
      urgency: normalized.includes('σήμερα') || normalized.includes('άμεσα') ? 'urgent' : 'normal',
      city: normalized.includes('χαλκιδ') ? 'Halkidiki' : 'Thessaloniki',
      erasmus: normalized.includes('erasmus'),
      investmentIntent: normalized.includes('επενδυ') || normalized.includes('roi'),
    };
  },
};
