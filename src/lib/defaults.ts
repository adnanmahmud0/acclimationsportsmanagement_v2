import { PageData } from "@/types/cms";

export const DEFAULT_HOME_DATA: PageData = {
  slug: "home",
  title: "Home Page",
  content: {
    hero: {
      title: "Where Economic Precision \n Meets NBA Domination",
      tagline: "A New Kind of Basketball Agency",
      ctaText: "GET STARTED",
      features: ["20+ Years Economic Edge", "Real-Time Salary Cap Forecasting", "Litigation-Grade Strategy", "In-House Analytics", "Lower Fees & More In Your Pocket"],
      cards: [
        { title: "NBA Contract Negotiation", desc: "Data-driven deals with litigation-grade strategy.", type: "shield" },
        { title: "Brand Development", desc: "Turn your talent into a premium economic asset.", type: "trending" },
        { title: "Marketing and Endorsements", desc: "Proprietary analytics ensure you're never underpaid.", type: "handshake" },
        { title: "Holistic Support", desc: "Elite trainers, chefs, wealth advisors & strategists.", type: "trophy" },
      ],
      chart: {
        title: "Projected Career Value Growth",
        data: [
          { year: 1, value: 2.5, label: "Year 1: $2.5M" },
          { year: 4, value: 8.1, label: "Year 4: $8.1M" },
          { year: 8, value: 15.3, label: "Year 8: $15.3M" },
          { year: 12, value: 22.7, label: "Year 12: $22.7M" },
        ]
      }
    },
    oneStopShop: {
      title: "One-Stop Shop for Everything",
      description: "We do it all — contract negotiation, salary-cap strategy, brand & endorsement deals, pre-draft mastery, analytics, and full concierge support.",
      ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
      points: [
        {
          title: "Pre-Draft and NBA Combine Mastery",
          items: ["Data-driven positioning", "Medical evaluation strategy", "Elite scouting access", "Athletic profiling that sets your entire NBA career foundation."]
        },
        {
          title: "Proprietary Salary Cap and Analytical Models",
          items: ["Real-time forecasting", "Luxury-tax modeling", "Endorsement valuation algorithms", "Market value simulations", "In-house analytics that consistently put more money in your pocket."]
        },
        {
          title: "Litigation-Grade NBA Contract Negotiation",
          items: ["Precision tactics", "Courtroom-proven leverage", "Unprecedented leverage", "Better deals at significantly lower fees", "Career-longevity protection"]
        },
        {
          title: "Generational Wealth and Business Empire",
          items: ["Off-court brand architecture", "Endorsement empire building", "Private-jet concierge support", "Elite trainers, CPAs & wealth advisors", "Legacy planning", "Dynamics"]
        }
      ]
    },
    about: {
      title: "About Acclimation Sports Management\nLed by Joe Grekoski",
      subtitle: "I am a certified agent from the National Basketball Players Association (NBPA).",
      description: "Joe Grekoski is the founder of Acclimation Group and Acclimation Sports Management...",
      focusText: "While other agents focus only on basketball, Joe Grekoski built Acclimation Sports Management as the true one-stop shop. You just play basketball. We handle everything else.",
      ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
      profileImage: "/owner/me.jpg",
      backgroundImage: "/graph.png",
      bullets: [
        "Launched Acclimation Group and built it into a premier advisory firm serving top law firms worldwide.",
        "Advised on the sale of IP assets to professional sports teams using advanced social media sentiment analysis.",
        "Featured on CBS News discussing college basketball economics and player valuation.",
        "Expert in determining fair market rates for endorsement deals and NIL valuation.",
        "Brings courtroom-tested economic analysis to NBA contract negotiation.",
        "His goal is clear: to help elite NBA players, college prospects, and 5-star high-school talents succeed."
      ],
      specialties: [
        "Intellectual Property Expert",
        "Personal Brand Valuation Specialist",
        "Endorsement Market Rate Authority",
        "IP Asset Valuation for Professional Sports Teams",
        "Featured on CBS News",
        "You Just Play Basketball",
        "Acclimation Sports Management",
      ]
    },
    contact: {
      title: "Ready to Take the Next Step?",
      tagline: "Any questions or remarks? Just contact us!",
      phone: "512-518-6547",
      phoneTitle: "Joe's Direct Line",
      phoneDesc: "Call or text Joe anytime —\n24/7 for serious inquiries",
      email: "Joseph.Grekoski@AcclimationGroup.com",
      emailTitle: "Email",
      emailDesc: "Fast responses for NBA,\ncollege & high school athletes",
      location: "Acclimation Sports Agency\nFort Lauderdale, Florida 33308",
      locationTitle: "Office Location"
    }
  },
  seo: { title: "Acclimation Sports Management", description: "Elite NBA representation.", keywords: "NBA Agent" }
};
export const DEFAULT_PERSONAL_BRANDING_DATA: PageData = {
  slug: "personal-branding",
  title: "Personal Branding",
  content: {
    personalBranding: {
      title: "Turn Your Talent Into a \n Premium, Monetizable \n Economic Asset",
      tagline: "Personal Brand Development: the art of truly identifying the unique value, data-backed and scaling strategically and carefully.",
      metrics: [
        { title: "Brand Equity", value: "$1.2M" },
        { title: "Social Reach", value: "2.4M" },
        { title: "Endorsement Value", value: "$850K" },
      ],
      services: [
        { title: "Personal Brand Strategy", desc: "Personal brand strategy to guarantee and optimize valuation and monetization." },
        { title: "Endorsement Deal", desc: "Endorsement negotiation and contract review sent to the highest value." },
        { title: "Media Training Programs", desc: "Media training programs to ensure you are ready and strategic and confident." },
      ],
      resultsTitle: "Personal Brand Strategy | Negotiation:",
      highlights: [
        { value: "340%", label: "Brand \n Growth" },
        { value: "$8.2M", label: "Endorsement \n Value Uplift" },
      ],
      ctaText: "SCHEDULE YOUR CALL",
      backgroundImage: "/glove.png"
    }
  },
  seo: {
    title: "Personal Branding | Acclimation Sports",
    description: "Turn your talent into a premium asset.",
    keywords: "Personal Branding, NBA Brand"
  }
};

export const DEFAULT_SALARY_CAP_DATA: PageData = {
  slug: "salary-cap",
  title: "Salary Cap Analytics",
  content: {
    salaryCap: {
      title: "Master the Salary Cap. \n Maximize Every Dollar.",
      subtitle: "Proprietary analytical models and expert salary cap strategy that put more money in your pocket.",
      engineTitle: "The Acclimation Salary Cap Engine",
      cardTitles: [
        "Live Salary Cap Forecasting",
        "Luxury Tax Stress Testing",
        "Endorsement & NIL Valuation",
        "Contract Optimization Simulator"
      ],
      points: [
        "In-house salary cap forecasts",
        "Custom analytical projections",
        "Bird Rights optimization",
      ],
      ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
      backgroundImage: "/graph.png"
    }
  },
  seo: {
    title: "Salary Cap Analytics | Acclimation Sports",
    description: "Proprietary analytical models and expert salary cap strategy.",
    keywords: "NBA Salary Cap, Analytics"
  }
};

export const DEFAULT_MARKETING_ENDORSEMENTS_DATA: PageData = {
  slug: "marketing-endorsements",
  title: "Marketing & Endorsements",
  content: {
    marketingEndorsements: {
      title: "Marketing and \n Endorsement Deals",
      tagline: "We build and monetize your personal brand so you earn maximum value from endorsements, sponsorships, and marketing opportunities.",
      items: [
        { title: "Professional brand valuation", desc: "Analysis of market value", iconType: "chart" },
        { title: "Media training", desc: "Personal branding development", iconType: "mic" },
        { title: "Endorsement Negotiation", desc: "Strategic contract review", iconType: "handshake" },
        { title: "Network Access", desc: "Global brand connections", iconType: "network" },
      ],
      transitionQuote: "Whether you're chasing your first major shoe deal or expanding your brand, we make sure you're never undervalued.",
      readyHeading: "Ready to unlock your full potential?",
      ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
      backgroundImage: "/fullbuscatecoart.png"
    }
  },
  seo: {
    title: "Marketing & Endorsements | Acclimation Sports",
    description: "Build and monetize your personal brand.",
    keywords: "Athlete Marketing, NBA Endorsements",
    faqs: []
  }
};

export const DEFAULT_PRE_DRAFT_DATA: PageData = {
  slug: "pre-draft",
  title: "Pre-Draft Mastery",
  content: {
    preDraft: {
      title: "Pre-Draft and NBA \n Combine Mastery",
      tagline: "Our Pre-Draft and NBA Combine Mastery program prepares elite prospects to rise on draft boards and enter the NBA with maximum value.",
      points: [
        "PROFESSIONAL PLAYER VALUATION REPORT",
        "CUSTOMIZED NBA COMBINE TRAINING",
        "TARGETED WORKOUTS WITH NBA TEAMS",
        "MEDIA TRAINING & INTERVIEW PREP",
        "MEDICAL EVALUATION STRATEGY"
      ],
      ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
      backgroundImage: "/baskateballplayer.png"
    }
  },
  seo: {
    title: "Pre-Draft & NBA Combine Mastery | Acclimation Sports",
    description: "Prepare to rise on draft boards.",
    keywords: "NBA Draft, Pre-Draft Training"
  }
};

export const DEFAULT_HOLISTIC_CONCIERGE_DATA: PageData = {
  slug: "holistic-concierge",
  title: "Holistic Concierge",
  content: {
    holisticConcierge: {
      title: "One-Stop Holistic \n Concierge Support",
      tagline: "We manage your entire off-court world so you can | focus only on dominating the game.",
      services: [
        { iconType: "dumbbell", title: "Elite Physical Training", desc: "Access to world-class trainers and state-of-the-art facilities to optimize your performance." },
        { iconType: "plane", title: "Luxury Travel", desc: "Private jet charters and VIP logistics for seamless travel." },
        { iconType: "utensils", title: "Gourmet Nutrition", desc: "Personal chefs crafting meals tailored to your diet and training schedule." },
        { iconType: "tv", title: "Media & Brand Management", desc: "Strategic media training and brand partnerships to build your empire." },
        { iconType: "piggybank", title: "Wealth Management", desc: "Expert financial advisors ensuring your money grows and lasts." },
        { iconType: "headphones", title: "24/7 Concierge", desc: "Round-the-clock support for any request, anytime, anywhere." },
      ],
      ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
      backgroundImage: "/foodsearvice.png"
    }
  },
  seo: {
    title: "Holistic Concierge | Acclimation Sports",
    description: "Manage your entire off-court world.",
    keywords: "Athlete Concierge, Sports Management"
  }
};
