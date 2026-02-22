export type Company = {
    id: string;
    name: string;
    industry: string;
    description: string;
    location: string;
    foundedYear: number;
    score: number;
    website?: string;
};

export const MOCK_COMPANIES: Company[] = [
    {
        id: "comp-001",
        name: "Stripe",
        industry: "Fintech",
        description: "Payment infrastructure for the internet — APIs for online commerce and subscription billing.",
        location: "San Francisco, CA",
        foundedYear: 2010,
        score: 99,
        website: "https://stripe.com"
    },
    {
        id: "comp-002",
        name: "Plaid",
        industry: "Fintech",
        description: "Data network powering the fintech ecosystem, connecting apps to users' bank accounts.",
        location: "San Francisco, CA",
        foundedYear: 2013,
        score: 92,
        website: "https://plaid.com"
    },
    {
        id: "comp-003",
        name: "Brex",
        industry: "Fintech",
        description: "AI-powered spend platform for startups and enterprises — cards, banking and expense management.",
        location: "San Francisco, CA",
        foundedYear: 2017,
        score: 88,
        website: "https://brex.com"
    },
    {
        id: "comp-004",
        name: "Joby Aviation",
        industry: "Aerospace",
        description: "Developing an electric vertical take-off and landing (eVTOL) aircraft for urban air mobility.",
        location: "Santa Cruz, CA",
        foundedYear: 2009,
        score: 95,
        website: "https://www.jobyaviation.com"
    },
    {
        id: "comp-005",
        name: "Rocket Lab",
        industry: "Aerospace",
        description: "End-to-end space services company providing launch, spacecraft and space systems.",
        location: "Long Beach, CA",
        foundedYear: 2006,
        score: 94,
        website: "https://www.rocketlabusa.com"
    },
    {
        id: "comp-006",
        name: "Planet Labs",
        industry: "Aerospace",
        description: "Operates the largest fleet of Earth-imaging satellites to monitor global change daily.",
        location: "San Francisco, CA",
        foundedYear: 2010,
        score: 89,
        website: "https://www.planet.com"
    },
    {
        id: "comp-007",
        name: "Climeworks",
        industry: "Climate Tech",
        description: "Pioneer of direct air capture technology removing CO₂ from the atmosphere at scale.",
        location: "Zurich, Switzerland",
        foundedYear: 2009,
        score: 97,
        website: "https://climeworks.com"
    },
    {
        id: "comp-008",
        name: "Rivian",
        industry: "Climate Tech",
        description: "Electric vehicle manufacturer building adventure trucks, SUVs and delivery vans.",
        location: "Irvine, CA",
        foundedYear: 2009,
        score: 91,
        website: "https://rivian.com"
    },
    {
        id: "comp-009",
        name: "Northvolt",
        industry: "Climate Tech",
        description: "European manufacturer of sustainable lithium-ion batteries for electric vehicles and energy storage.",
        location: "Stockholm, Sweden",
        foundedYear: 2016,
        score: 93,
        website: "https://northvolt.com"
    },
    {
        id: "comp-010",
        name: "Recursion Pharmaceuticals",
        industry: "Healthcare",
        description: "Clinical-stage biotech decoding biology using AI and automation to radically accelerate drug discovery.",
        location: "Salt Lake City, UT",
        foundedYear: 2013,
        score: 96,
        website: "https://www.recursion.com"
    },
    {
        id: "comp-011",
        name: "Tempus",
        industry: "Healthcare",
        description: "AI-powered precision medicine company analyzing clinical and molecular data to improve cancer care.",
        location: "Chicago, IL",
        foundedYear: 2015,
        score: 90,
        website: "https://www.tempus.com"
    },
    {
        id: "comp-012",
        name: "Veeva Systems",
        industry: "Healthcare",
        description: "Cloud software and data solutions for the global life sciences industry.",
        location: "Pleasanton, CA",
        foundedYear: 2007,
        score: 87,
        website: "https://www.veeva.com"
    },
    {
        id: "comp-013",
        name: "Adyen",
        industry: "Fintech",
        description: "Global payments platform letting businesses accept payments anywhere with a single integration.",
        location: "Amsterdam, Netherlands",
        foundedYear: 2006,
        score: 85,
        website: "https://www.adyen.com"
    },
    {
        id: "comp-014",
        name: "Relativity Space",
        industry: "Aerospace",
        description: "Building 3D-printed rockets and autonomous factories to make humanity multi-planetary.",
        location: "Long Beach, CA",
        foundedYear: 2015,
        score: 98,
        website: "https://www.relativityspace.com"
    },
    {
        id: "comp-015",
        name: "Suki AI",
        industry: "Healthcare",
        description: "AI voice assistant for clinicians that dramatically reduces documentation burden and burnout.",
        location: "Redwood City, CA",
        foundedYear: 2017,
        score: 86,
        website: "https://www.suki.ai"
    },
    {
        id: "comp-016",
        name: "Carbon Engineering",
        industry: "Climate Tech",
        description: "Canadian clean energy company developing Direct Air Capture and AIR TO FUELS technology.",
        location: "Squamish, BC, Canada",
        foundedYear: 2009,
        score: 92,
        website: "https://carbonengineering.com"
    },
    {
        id: "comp-017",
        name: "Ripple",
        industry: "Fintech",
        description: "Enterprise blockchain solutions enabling global payments and liquidity for financial institutions.",
        location: "San Francisco, CA",
        foundedYear: 2012,
        score: 84,
        website: "https://ripple.com"
    },
    {
        id: "comp-018",
        name: "Insitro",
        industry: "Healthcare",
        description: "Machine learning-driven drug discovery combining biology and data science to transform R&D.",
        location: "South San Francisco, CA",
        foundedYear: 2018,
        score: 93,
        website: "https://insitro.com"
    },
    {
        id: "comp-019",
        name: "Turntide Technologies",
        industry: "Climate Tech",
        description: "Smart motor systems that slash energy waste in commercial buildings and agriculture.",
        location: "San Jose, CA",
        foundedYear: 2013,
        score: 83,
        website: "https://turntide.com"
    },
    {
        id: "comp-020",
        name: "Astranis",
        industry: "Aerospace",
        description: "Building small, next-generation geostationary satellites to bring internet to the unconnected.",
        location: "San Francisco, CA",
        foundedYear: 2015,
        score: 90,
        website: "https://www.astranis.com"
    },
    {
        id: "comp-021",
        name: "Sylvera",
        industry: "Climate Tech",
        description: "Carbon credit ratings and analytics platform helping buyers and sellers navigate the voluntary carbon market.",
        location: "London, UK",
        foundedYear: 2020,
        score: 88,
        website: "https://www.sylvera.com"
    },
    {
        id: "comp-022",
        name: "Stripe Capital",
        industry: "Fintech",
        description: "Data-driven financing for Stripe platform businesses — fast funding with no paperwork.",
        location: "San Francisco, CA",
        foundedYear: 2019,
        score: 81,
        website: "https://stripe.com/capital"
    },
    {
        id: "comp-023",
        name: "Nuvation Bio",
        industry: "Healthcare",
        description: "Clinical-stage oncology company targeting underserved cancer subtypes with novel therapeutics.",
        location: "San Francisco, CA",
        foundedYear: 2018,
        score: 94,
        website: "https://www.nuvationbio.com"
    },
    {
        id: "comp-024",
        name: "Orbex",
        industry: "Aerospace",
        description: "European launch company developing a carbon-neutral micro-launcher for small satellites.",
        location: "Forres, Scotland",
        foundedYear: 2015,
        score: 86,
        website: "https://orbex.space"
    },
    {
        id: "comp-025",
        name: "Pachama",
        industry: "Climate Tech",
        description: "Uses satellite data and AI to verify forest carbon projects and restore natural ecosystems.",
        location: "San Francisco, CA",
        foundedYear: 2018,
        score: 89,
        website: "https://pachama.com"
    },
    {
        id: "comp-026",
        name: "Mesh Payments",
        industry: "Fintech",
        description: "Spend management platform giving finance teams total control over company payments.",
        location: "Tel Aviv, Israel",
        foundedYear: 2018,
        score: 82,
        website: "https://meshpayments.com"
    },
    {
        id: "comp-027",
        name: "Aprea Therapeutics",
        industry: "Healthcare",
        description: "Clinical-stage biopharmaceutical focused on reactivating mutant p53 tumor suppressor protein.",
        location: "Boston, MA",
        foundedYear: 2012,
        score: 79,
        website: "https://www.aprea.com"
    },
    {
        id: "comp-028",
        name: "D-Wave Quantum",
        industry: "Aerospace",
        description: "Commercial quantum computing company delivering quantum solutions for optimization problems.",
        location: "Burnaby, BC, Canada",
        foundedYear: 1999,
        score: 91,
        website: "https://www.dwavesys.com"
    },
    {
        id: "comp-029",
        name: "Zero Carbon",
        industry: "Climate Tech",
        description: "Green hydrogen production company turning renewable power into clean fuel at industrial scale.",
        location: "London, UK",
        foundedYear: 2020,
        score: 87,
        website: "https://www.zerocarbon.green"
    },
    {
        id: "comp-030",
        name: "Garner Health",
        industry: "Healthcare",
        description: "Guides employees to the highest-quality doctors, cutting healthcare costs and improving care.",
        location: "New York, NY",
        foundedYear: 2019,
        score: 85,
        website: "https://www.getgarner.com"
    }
];

export const INDUSTRIES = Array.from(new Set(MOCK_COMPANIES.map(c => c.industry))).sort();
