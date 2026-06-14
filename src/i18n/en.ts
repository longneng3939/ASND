export interface Translation {
  nav: {
    home: string;
    artists: string;
    schedule: string;
    news: string;
    audition: string;
    about: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    viewArtists: string;
    featuredTitle: string;
    featuredSubtitle: string;
    scheduleTitle: string;
    scheduleSubtitle: string;
  };
  artists: {
    title: string;
    subtitle: string;
    groups: string;
    soloists: string;
    discography: string;
    members: string;
    debut: string;
    all: string;
  };
  schedule: {
    title: string;
    subtitle: string;
    noEvents: string;
  };
  news: {
    title: string;
    subtitle: string;
    readMore: string;
    noNews: string;
  };
  audition: {
    title: string;
    subtitle: string;
    description: string;
    requirements: string;
    applyNow: string;
    emailUs: string;
    fields: {
      name: string;
      email: string;
      birth: string;
      position: string;
      message: string;
      file: string;
      submit: string;
    };
    positions: string[];
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    ceo: string;
    founded: string;
    location: string;
    vision: string;
    visionText: string;
  };
  contact: {
    title: string;
    subtitle: string;
    business: string;
    press: string;
    fan: string;
    address: string;
    phone: string;
    email: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
  };
  footer: {
    rights: string;
    family: string;
    privacy: string;
    terms: string;
  };
  common: {
    loading: string;
    error: string;
    back: string;
    learnMore: string;
    viewAll: string;
    language: string;
  };
}

export const en: Translation = {
  nav: {
    home: "Home",
    artists: "Artists",
    schedule: "Schedule",
    news: "News",
    audition: "Audition",
    about: "About",
    contact: "Contact",
  },
  home: {
    heroTitle: "Achieve Something\nNever Done Before",
    heroSubtitle: "ASND Label — A new beginning for K-pop",
    viewArtists: "View Artists",
    featuredTitle: "Our Artists",
    featuredSubtitle: "Meet the talented artists under ASND Label",
    scheduleTitle: "Upcoming Schedule",
    scheduleSubtitle: "Stay tuned for upcoming events and releases",
  },
  artists: {
    title: "Artists",
    subtitle: "Discover our family of artists",
    groups: "Groups",
    soloists: "Soloists",
    discography: "Discography",
    members: "Members",
    debut: "Debut",
    all: "All Artists",
  },
  schedule: {
    title: "Schedule",
    subtitle: "Check out upcoming events and releases",
    noEvents: "No upcoming events at this time.",
  },
  news: {
    title: "News",
    subtitle: "Latest updates from ASND Label",
    readMore: "Read More",
    noNews: "No news articles yet.",
  },
  audition: {
    title: "Audition",
    subtitle: "Join ASND Label — Your journey starts here",
    description:
      "ASND Label is looking for talented individuals who dream of becoming the next K-pop star. If you have passion, talent, and the drive to achieve something never done before, we want to hear from you.",
    requirements: "Requirements",
    applyNow: "Apply Now",
    emailUs: "Email Us Your Application",
    fields: {
      name: "Name",
      email: "Email",
      birth: "Date of Birth",
      position: "Position",
      message: "Tell us about yourself",
      file: "Upload Portfolio",
      submit: "Submit Application",
    },
    positions: ["Vocal", "Rap", "Dance", "Acting", "Producer", "Songwriter"],
  },
  about: {
    title: "About ASND",
    subtitle: "Achieve Something Never Done Before",
    description:
      "ASND Label is a South Korean entertainment company founded on January 26, 2025. Our name embodies our mission: to Achieve Something Never Done Before. We are home to fromis_9 and Wendy, and we strive to create groundbreaking music and content that resonates with fans worldwide.",
    ceo: "CEO",
    founded: "Founded",
    location: "Location",
    vision: "Our Vision",
    visionText:
      "To be a global entertainment company that discovers and nurtures unique talents, creating music and content that inspires the world.",
  },
  contact: {
    title: "Contact",
    subtitle: "Get in touch with ASND Label",
    business: "Business Inquiries",
    press: "Press & Media",
    fan: "Fan Correspondence",
    address: "Address",
    phone: "Phone",
    email: "Email",
    formName: "Your Name",
    formEmail: "Your Email",
    formSubject: "Subject",
    formMessage: "Message",
    formSubmit: "Send Message",
    formSuccess: "Thank you for your message. We will get back to you soon.",
  },
  footer: {
    rights: "All rights reserved.",
    family: "Family Sites",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
  common: {
    loading: "Loading...",
    error: "Something went wrong.",
    back: "Back",
    learnMore: "Learn More",
    viewAll: "View All",
    language: "Language",
  },
};
