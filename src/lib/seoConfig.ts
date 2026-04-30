export type SeoRouteConfig = {
    title: string;
    description: string;
    keywords?: readonly string[];
    image?: string;
    noIndex?: boolean;
};

export const seoSiteConfig = {
    name: "Acclimation Sports Management",
    url: "https://www.acclimationsportsmanagement.com",
    twitterHandle: "@AcclimationSM",
    description:
        "Acclimation Sports Management provides NBA representation, NIL strategy, salary cap analytics, and career management for elite basketball talent.",
    defaultImage: "/og-image.png",
    defaultImageAlt: "Acclimation Sports Management – NBA Agency & Basketball Representation",
    keywords: [
        "Acclimation Sports Management",
        "NBA agency",
        "basketball representation",
        "NIL strategy",
        "salary cap analytics",
        "sports management",
        "contract negotiation",
        "NBA draft preparation",
        "Joe Grekoski",
        "basketball agent",
    ],
} as const;

export const seoRoutes = {
    "/": {
        title: "NBA Representation, NIL Strategy & Salary Cap Analytics",
        description:
            "Acclimation Sports Management helps NBA players, college prospects, and elite high-school talent with representation, NIL strategy, salary cap analysis, and long-term career planning.",
        keywords: [
            "NBA representation",
            "basketball agency",
            "elite sports management",
            "NBA player agent",
            "college basketball NIL",
        ],
    },
    "/contact": {
        title: "Contact Us",
        description:
            "Connect with Joe Grekoski and the Acclimation team for elite NBA representation and data-driven career advocacy.",
        keywords: [
            "contact NBA agent",
            "Joe Grekoski contact",
            "basketball agent phone",
            "sports agency Fort Lauderdale",
            "NBA representation inquiry",
        ],
    },

    "/contract-negotiation": {
        title: "Litigation-Grade Contract Negotiation",
        description:
            "Data-driven contract deals with proprietary in-house salary-cap models. Expert representation that maximizes guaranteed money, incentives, and long-term player security.",
        keywords: [
            "NBA contract negotiation",
            "sports contract lawyer",
            "guaranteed money NBA",
            "rookie contract negotiation",
            "veteran NBA extension",
        ],
    },
    "/personal-branding": {
        title: "Personal Brand Domination",
        description:
            "Transforming talent into a premium, monetizable economic asset through professional brand development and strategic marketing.",
        keywords: [
            "NBA player personal brand",
            "athlete brand development",
            "basketball player marketing",
            "sports personal branding",
            "athlete monetization strategy",
        ],
    },
    "/salary-cap": {
        title: "Proprietary Salary Cap Analytics",
        description:
            "Proprietary analytical models and expert salary cap strategy to optimize every contract and maximize career earnings.",
        keywords: [
            "NBA salary cap analysis",
            "salary cap expert",
            "luxury tax strategy",
            "NBA contract optimization",
            "salary cap modeling",
        ],
    },
    "/marketing-endorsements": {
        title: "Elite Endorsements & Marketing",
        description:
            "Maximizing off-court income through shoe deals, NIL, and legacy partnerships for elite basketball talent.",
        keywords: [
            "NBA endorsement deals",
            "shoe deal negotiation",
            "NIL deal athlete",
            "basketball sponsorship",
            "athlete endorsement strategy",
        ],
    },
    "/pre-draft": {
        title: "Elite Pre-Draft Mastery",
        description:
            "Elite draft preparation, Combine mastery, and expert strategy for top basketball prospects entering the NBA Draft.",
        keywords: [
            "NBA Combine preparation",
            "pre-draft training",
            "NBA draft prospect",
            "draft strategy basketball",
            "pro day preparation",
        ],
    },
    "/holistic-concierge": {
        title: "One-Stop Holistic Concierge",
        description:
            "Elite trainers, personal chefs, private jets, and wealth management support for the modern NBA athlete.",
        keywords: [
            "NBA athlete concierge",
            "basketball player lifestyle management",
            "private chef athlete",
            "NBA wealth management",
            "sports concierge service",
        ],
    },
    "/high-school-talent": {
        title: "Elite High School NIL Strategy",
        description:
            "Multi-million dollar NIL deal strategy and professional career planning for top-ranked prep basketball prospects.",
        keywords: [
            "high school basketball NIL",
            "prep basketball agent",
            "high school NIL deal",
            "elite basketball prospect",
            "basketball recruiting agency",
        ],
    },
    "/nba-players": {
        title: "Active NBA Athlete Representation",
        description:
            "Veteran representation focused on wealth architecture, contract extensions, and post-career financial security for active NBA athletes.",
        keywords: [
            "active NBA player agent",
            "NBA contract extension",
            "veteran NBA representation",
            "NBA player wealth management",
            "NBA endorsement representation",
        ],
    },
    "/college-prospects": {
        title: "College to NBA Draft Pipeline",
        description:
            "Maximize NIL deals, develop a professional brand, and prepare for the NBA with elite off-court support for top college basketball prospects.",
        keywords: [
            "college basketball agent",
            "college NIL deal",
            "college to NBA pipeline",
            "college basketball draft prep",
            "NCAA athlete representation",
        ],
    },
    "/wnba": {
        title: "WNBA Advocacy & Representation",
        description:
            "Capitalize on the historic new WNBA CBA. Expert negotiation and representation that maximizes earnings and brand value for WNBA athletes.",
        keywords: [
            "WNBA agent",
            "WNBA representation",
            "WNBA CBA 2026",
            "women's basketball contract",
            "WNBA NIL deal",
        ],
    },
    "/two-way-contracts": {
        title: "Strategic Two-Way Advantage",
        description:
            "Maximize the strategic value and progression of Two-Way agreements. Expert negotiation for undrafted gems and rising prospects.",
        keywords: [
            "NBA two-way contract",
            "two-way deal negotiation",
            "G League to NBA",
            "undrafted NBA player",
            "two-way contract strategy",
        ],
    },
    "/g-league-elite": {
        title: "NBA G League Fast Track",
        description:
            "Rules, salaries, and the fast track from G League prospects to the NBA. Expert advocacy for athletes rising to the NBA stage.",
        keywords: [
            "G League agent",
            "NBA G League representation",
            "G League salary",
            "G League to NBA call-up",
            "G League prospect strategy",
        ],
    },
} as const satisfies Record<string, SeoRouteConfig>;

export type SeoRoutePath = keyof typeof seoRoutes;

export const seoDefaultRoute = seoRoutes["/"];
