export type Lang = 'el' | 'en';

export const dictionaries = {
  el: {
    brand: 'HostPilot',
    nav: {
      home: 'Αρχική',
      features: 'Δυνατότητες',
      pricing: 'Τιμολόγηση',
      categories: 'Κατηγορίες',
      areas: 'Περιοχές',
      access: 'Είσοδος / Εγγραφή',
      roleEntry: 'Επιλογή ρόλου',
    },
    common: { language: 'Γλώσσα', dashboard: 'Πίνακας', save: 'Αποθήκευση', actions: 'Ενέργειες' },
    home: {
      title: 'Η πρώτη ελληνική AI + marketplace πλατφόρμα για ακίνητα και λειτουργίες φιλοξενίας',
      subtitle: 'Διαχείριση ακινήτων, αγγελίες, κρατήσεις, επαγγελματίες και επενδυτικά εργαλεία σε ενιαίο περιβάλλον.',
      launch: 'Εκκίνηση: Θεσσαλονίκη και Χαλκιδική',
      ctaPrimary: 'Ξεκίνα ως χρήστης',
      ctaSecondary: 'Δες τις δυνατότητες',
    },
    roles: {
      title: 'Διάλεξε ρόλο για να μπεις στο σωστό περιβάλλον',
      owner: 'Ιδιοκτήτης / Host',
      agent: 'Μεσίτης / Property Manager',
      professional: 'Επαγγελματίας',
      buyer: 'Αγοραστής / Επενδυτής',
    },
    listings: {
      title: 'Αγγελίες Ακινήτων',
      subtitle: 'Ενιαία εμπειρία για long-term, short-term, flexible, Erasmus, sale και buy requests.',
      media: 'Υποστήριξη media: Cover εικόνα, gallery σειράς, φωτογραφίες και video URL.',
    },
    ai: {
      title: 'AI Assistant / Dispatcher',
      subtitle: 'Συνομιλία αριστερά, δομημένη ερμηνεία και προτάσεις δεξιά.',
      input: 'Περιέγραψε τι χρειάζεσαι',
      suggestions: 'Προτεινόμενες ενέργειες',
    },
    investment: {
      title: 'Επενδυτικός Βοηθός / ROI',
      disclaimer: 'Οι εκτιμήσεις είναι ενδεικτικές και δεν αποτελούν χρηματοοικονομική ή επενδυτική συμβουλή.',
      next: 'Προτεινόμενοι επαγγελματίες: μηχανικός, δικηγόρος, συμβολαιογράφος, τράπεζα, εκτιμητής.',
    },
    admin: {
      title: 'Κέντρο Ελέγχου Διαχείρισης',
      subtitle: 'Πλήρης έλεγχος χρηστών, αγγελιών, αιτημάτων, κρατήσεων, πλάνων, AI και συστημικών ρυθμίσεων.',
    },
  },
  en: {
    brand: 'HostPilot',
    nav: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      categories: 'Categories',
      areas: 'Areas',
      access: 'Login / Register',
      roleEntry: 'Role entry',
    },
    common: { language: 'Language', dashboard: 'Dashboard', save: 'Save', actions: 'Actions' },
    home: {
      title: 'The first Greek AI + marketplace platform for property and hosting operations',
      subtitle: 'Property operations, listings, bookings, professionals, and investment tools in one product shell.',
      launch: 'Launch areas: Thessaloniki and Halkidiki',
      ctaPrimary: 'Start by role',
      ctaSecondary: 'View capabilities',
    },
    roles: {
      title: 'Select your role to enter the right workspace',
      owner: 'Owner / Host',
      agent: 'Agent / Property Manager',
      professional: 'Professional',
      buyer: 'Buyer / Investor',
    },
    listings: {
      title: 'Property Listings',
      subtitle: 'Unified experience for long-term, short-term, flexible, Erasmus, sale, and buy requests.',
      media: 'Media support: cover image, ordered gallery, photos and video URL.',
    },
    ai: {
      title: 'AI Assistant / Dispatcher',
      subtitle: 'Conversation on the left, structured interpretation and actions on the right.',
      input: 'Describe what you need',
      suggestions: 'Suggested actions',
    },
    investment: {
      title: 'Investment Assistant / ROI',
      disclaimer: 'Estimates are indicative and not financial or investment advice.',
      next: 'Suggested professionals: engineer, lawyer, notary, bank, valuer.',
    },
    admin: {
      title: 'Admin Control Center',
      subtitle: 'Full control over users, listings, requests, reservations, plans, AI and system settings.',
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Lang];
