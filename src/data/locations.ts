export type LocationTier = "tier-1" | "tier-2" | "tier-3" | "strategic";

export type ServiceSlug =
  | "local-visibility"
  | "custom-web-design"
  | "lead-capture-ai-follow-up"
  | "search-data-architecture";

export type ReportSlug =
  | "oregon-market-intel-infrastructure-report"
  | "how-oregon-markets-differ-for-local-service-businesses"
  | "why-speed-wins"
  | "web-agents-intelligence-report";

export type CaseStudySlug = "daley-organics" | "oregon-smb-directory";

export type MarketSignal = {
  value: string;
  label: string;
  detail: string;
};

export type LocationEntry = {
  slug: string;
  name: string;
  region: string;
  tier: LocationTier;
  tierLabel: string;
  opportunity: string;
  marketSummary: string;
  buyerDynamics: string;
  idealFor: string;
  diagnosticFocus: string;
  caution: string;
  priorityMoves: string[];
  signals: MarketSignal[];
  recommendedServices: ServiceSlug[];
  relatedReports: ReportSlug[];
  relatedCaseStudies: CaseStudySlug[];
  nearbyMarkets: string[];
};

export const tierDescriptions: Record<LocationTier, string> = {
  "tier-1": "Highest upside for operators who need better visibility, trust, and response systems fast.",
  "tier-2": "Healthy local demand with room for sharper positioning and steadier conversion infrastructure.",
  "tier-3": "Larger or more saturated markets where differentiation, proof, and cleaner architecture matter more.",
  strategic: "Important supporting markets that should be addressed with tailored messaging rather than copy-pasted statewide tactics.",
};

export const locations: LocationEntry[] = [
  {
    slug: "albany",
    name: "Albany",
    region: "Willamette Valley",
    tier: "strategic",
    tierLabel: "Strategic Expansion",
    opportunity: "Manufacturing, trades, and B2B service demand create room for clearer positioning and faster follow-up.",
    marketSummary: "Albany rewards practical operators who can look credible quickly and respond without friction.",
    buyerDynamics: "Buyers are often comparison shopping between Albany, Corvallis, and Salem, so clarity and trust have to land early.",
    idealFor: "Trades, industrial services, health practices, and B2B firms that need stronger local authority without Portland-style bloat.",
    diagnosticFocus: "Map visibility, trust gaps on service pages, and where handoff delays are costing quote requests.",
    caution: "Do not sell Albany like a startup market or a luxury metro. Clear utility wins here before trendiness does.",
    priorityMoves: [
      "Tighten city and service-area relevance across the site and GBP footprint.",
      "Clarify proof, credentials, and process so practical buyers trust the next step.",
      "Reduce reply lag on forms and inbound calls that currently die in inboxes.",
    ],
    signals: [
      {
        value: "Practical",
        label: "Buyer posture",
        detail: "Clear answers and visible proof matter more than clever branding flourishes.",
      },
      {
        value: "Regional",
        label: "Competitive field",
        detail: "Albany competes with nearby valley markets, not just businesses inside the city line.",
      },
      {
        value: "Trust + speed",
        label: "Best first move",
        detail: "Most gains come from credibility cleanup and tighter lead handling.",
      },
    ],
    recommendedServices: ["local-visibility", "custom-web-design", "lead-capture-ai-follow-up"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins"],
    relatedCaseStudies: ["oregon-smb-directory"],
    nearbyMarkets: ["corvallis", "salem", "eugene"],
  },
  {
    slug: "ashland",
    name: "Ashland",
    region: "Southern Oregon",
    tier: "strategic",
    tierLabel: "Strategic Expansion",
    opportunity: "Higher-trust service positioning can outperform generic local SEO when the visual and messaging surface feels premium.",
    marketSummary: "Ashland buyers respond to quality signals faster than to brute-force visibility tactics alone.",
    buyerDynamics: "Culture-heavy, referral-heavy demand means the site has to look intentional while still converting regional search traffic.",
    idealFor: "Professional services, wellness, hospitality-adjacent operators, and premium local brands that need trust before contact.",
    diagnosticFocus: "Design credibility, offer framing, and whether regional search traffic sees enough proof to act.",
    caution: "Do not drag in loud metro design cues or low-end price language that cheapens the offer.",
    priorityMoves: [
      "Upgrade the trust surface so premium buyers do not bounce after the first screen.",
      "Support regional discoverability without flattening Ashland's more selective buyer psychology.",
      "Connect design quality to response systems so premium intent does not get wasted after the click.",
    ],
    signals: [
      {
        value: "Premium",
        label: "Market posture",
        detail: "Higher design quality and cleaner language help buyers decide this is worth their time.",
      },
      {
        value: "Selective",
        label: "Buyer behavior",
        detail: "Visitors screen for legitimacy before they ever submit a form.",
      },
      {
        value: "Brand trust",
        label: "Best first move",
        detail: "The website has to carry more of the trust-building work here.",
      },
    ],
    recommendedServices: ["custom-web-design", "local-visibility", "search-data-architecture"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "web-agents-intelligence-report"],
    relatedCaseStudies: ["oregon-smb-directory"],
    nearbyMarkets: ["medford", "grants-pass", "klamath-falls"],
  },
  {
    slug: "bend",
    name: "Bend",
    region: "Central Oregon",
    tier: "tier-1",
    tierLabel: "Tier 1: High Opportunity",
    opportunity: "Fast-growth service demand, strong home-value economics, and enough competition to reward better systems fast.",
    marketSummary: "Bend has the upside of a larger market without requiring Portland-level overhead if the positioning is disciplined.",
    buyerDynamics: "Buyers move quickly, compare multiple providers, and expect the website to feel current and credible immediately.",
    idealFor: "Growth-oriented trades, outdoor-adjacent services, medical and home services, and operators ready to compound local authority.",
    diagnosticFocus: "Search visibility in high-intent categories, conversion friction on key service pages, and speed-to-lead gaps.",
    caution: "Do not rely on generic luxury language or broad statewide SEO pages. Bend still needs local specificity and proof.",
    priorityMoves: [
      "Win service-category searches and map-pack presence where value per lead is already high.",
      "Make the first ten seconds of the site feel faster, sharper, and more trustworthy than local competition.",
      "Install response systems that keep hot leads from cooling while the team is still in the field.",
    ],
    signals: [
      {
        value: "Fast-growth",
        label: "Market shape",
        detail: "Demand can support stronger ROI when the business captures it cleanly.",
      },
      {
        value: "Higher-value",
        label: "Lead profile",
        detail: "More leads are worth real money, so sloppy intake hurts more.",
      },
      {
        value: "Asymmetric",
        label: "Why it matters",
        detail: "A sharper system can outperform weaker competitors quickly.",
      },
    ],
    recommendedServices: ["local-visibility", "custom-web-design", "lead-capture-ai-follow-up", "search-data-architecture"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins"],
    relatedCaseStudies: ["daley-organics", "oregon-smb-directory"],
    nearbyMarkets: ["salem", "eugene", "klamath-falls"],
  },
  {
    slug: "corvallis",
    name: "Corvallis",
    region: "Willamette Valley",
    tier: "tier-2",
    tierLabel: "Tier 2: Stable Demand",
    opportunity: "Professional services and research-adjacent demand create steady opportunity for clearer local authority.",
    marketSummary: "Corvallis tends to reward competence, clarity, and local fit more than flashy positioning.",
    buyerDynamics: "Buyers often do deeper comparison work, so search presence has to be matched by substance and proof.",
    idealFor: "Professional services, healthcare, education-adjacent firms, and service businesses that need cleaner credibility signals.",
    diagnosticFocus: "Category visibility, page trust gaps, and whether the current site gives cautious buyers enough reason to act.",
    caution: "Do not treat Corvallis like a tiny rural market or a full metro. It sits in a more analytical middle ground.",
    priorityMoves: [
      "Clarify expertise and process so thoughtful buyers can choose with less hesitation.",
      "Strengthen location architecture for the Corvallis-Albany corridor instead of isolating the city in copy.",
      "Use response systems to shorten the gap between inquiry and appointment-setting.",
    ],
    signals: [
      {
        value: "Steady",
        label: "Demand profile",
        detail: "This is less about big spikes and more about reliable capture over time.",
      },
      {
        value: "Analytical",
        label: "Buyer posture",
        detail: "Visitors need more substance before they trust the next step.",
      },
      {
        value: "Proof-led",
        label: "Best first move",
        detail: "Clean proof architecture improves both conversion and local SEO utility.",
      },
    ],
    recommendedServices: ["local-visibility", "custom-web-design", "search-data-architecture"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins"],
    relatedCaseStudies: ["oregon-smb-directory"],
    nearbyMarkets: ["albany", "salem", "eugene"],
  },
  {
    slug: "eugene",
    name: "Eugene",
    region: "Willamette Valley",
    tier: "tier-3",
    tierLabel: "Tier 3: Saturated Or Mixed",
    opportunity: "There is enough search volume and service diversity here to win, but generic positioning gets buried quickly.",
    marketSummary: "Eugene needs sharper specialization and stronger proof than smaller valley markets do.",
    buyerDynamics: "Buyers see many options, so the business has to look distinct and easy to trust within moments.",
    idealFor: "Niche service operators, established firms, and businesses that can claim a clear specialty or authority edge.",
    diagnosticFocus: "Differentiation, SERP overlap with adjacent competitors, and whether the site proves a reason to choose this firm.",
    caution: "Do not publish broad, interchangeable city pages and expect them to rank or convert. Eugene punishes sameness.",
    priorityMoves: [
      "Narrow the positioning around category depth, speed, or a clear local angle.",
      "Use case studies and report content to separate the business from generic service providers.",
      "Make response speed visible and operational, because comparison shoppers often reward the first competent reply.",
    ],
    signals: [
      {
        value: "Crowded",
        label: "Competitive field",
        detail: "More search volume comes with more look-alike options.",
      },
      {
        value: "Comparison-heavy",
        label: "Buyer behavior",
        detail: "Visitors are often evaluating multiple providers at once.",
      },
      {
        value: "Differentiate",
        label: "Best first move",
        detail: "Sharper specialty framing is usually more valuable than broader reach.",
      },
    ],
    recommendedServices: ["custom-web-design", "local-visibility", "lead-capture-ai-follow-up", "search-data-architecture"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins", "web-agents-intelligence-report"],
    relatedCaseStudies: ["oregon-smb-directory", "daley-organics"],
    nearbyMarkets: ["springfield", "corvallis", "salem"],
  },
  {
    slug: "grants-pass",
    name: "Grants Pass",
    region: "Southern Oregon",
    tier: "tier-1",
    tierLabel: "Tier 1: High Opportunity",
    opportunity: "Underserved local service demand, strong buyer intent, and weaker competition create one of the clearest asymmetric plays in Oregon.",
    marketSummary: "Grants Pass is a market where disciplined local infrastructure can outrun generic agencies quickly.",
    buyerDynamics: "Buyers are often looking for the right nearby provider now, not browsing for entertainment or brand affinity later.",
    idealFor: "Trades, home services, health practices, and operators who want booked jobs from local intent rather than vanity traffic.",
    diagnosticFocus: "Map-pack presence, local service-page clarity, and the speed gap between inquiry and real human follow-up.",
    caution: "Do not import Portland tactics, bloated navigation, or abstract messaging into a market that rewards directness and proximity.",
    priorityMoves: [
      "Own nearby high-intent searches with service-area relevance and clean entity signals.",
      "Make the website feel like a trustworthy local operator rather than a template shop.",
      "Close the reply gap so the first serious inquiry becomes a scheduled conversation, not a missed chance.",
    ],
    signals: [
      {
        value: "High-intent",
        label: "Lead quality",
        detail: "A smaller number of local searches can still generate excellent work.",
      },
      {
        value: "Underserved",
        label: "Market gap",
        detail: "There is room to win simply by being clearer and faster than the field.",
      },
      {
        value: "Local-first",
        label: "Best first move",
        detail: "Service-area authority and fast follow-up carry unusual weight here.",
      },
    ],
    recommendedServices: ["local-visibility", "lead-capture-ai-follow-up", "custom-web-design", "search-data-architecture"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins"],
    relatedCaseStudies: ["daley-organics", "oregon-smb-directory"],
    nearbyMarkets: ["medford", "ashland", "klamath-falls"],
  },
  {
    slug: "klamath-falls",
    name: "Klamath Falls",
    region: "Klamath Basin",
    tier: "strategic",
    tierLabel: "Strategic Expansion",
    opportunity: "Lower competition and clearer local intent mean disciplined demand capture can outperform bigger-market playbooks.",
    marketSummary: "Klamath Falls is less about scale and more about not wasting the demand that is already there.",
    buyerDynamics: "Buyers tend to value directness, legitimacy, and whether the business clearly serves the area they live in.",
    idealFor: "Trades, clinics, property services, and local operators who need cleaner demand capture without overbuilding.",
    diagnosticFocus: "Coverage of real service areas, conversion clarity, and whether local leads disappear after the first contact attempt.",
    caution: "Do not overcomplicate the stack. The opportunity is in disciplined basics executed well, not in unnecessary feature theater.",
    priorityMoves: [
      "Clarify service-area signals so nearby searchers know the business actually serves them.",
      "Use direct language and strong local proof instead of trying to sound like a coastal agency brand.",
      "Tighten handoff from inquiry to contact so modest lead volume still converts efficiently.",
    ],
    signals: [
      {
        value: "Disciplined basics",
        label: "Winning pattern",
        detail: "The market rewards competence more than complexity.",
      },
      {
        value: "Lower noise",
        label: "Competitive field",
        detail: "Cleaner execution can stand out without outsized content volume.",
      },
      {
        value: "Coverage",
        label: "Best first move",
        detail: "Service-area clarity often matters before broader authority-building.",
      },
    ],
    recommendedServices: ["local-visibility", "lead-capture-ai-follow-up", "custom-web-design"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins"],
    relatedCaseStudies: ["daley-organics"],
    nearbyMarkets: ["medford", "ashland", "grants-pass"],
  },
  {
    slug: "medford",
    name: "Medford",
    region: "Rogue Valley",
    tier: "tier-3",
    tierLabel: "Tier 3: Saturated Or Mixed",
    opportunity: "A larger Southern Oregon demand pool exists here, but winning it requires sharper trust and more specific positioning.",
    marketSummary: "Medford can support strong service businesses, but broad claims disappear into the noise fast.",
    buyerDynamics: "Buyers compare aggressively across the Rogue Valley and expect both competence and convenience before making contact.",
    idealFor: "Established operators, multi-location businesses, and firms that can back up specialization with proof and better systems.",
    diagnosticFocus: "Differentiation against same-category competitors, friction in the trust surface, and reply speed under real lead volume.",
    caution: "Do not confuse more volume with easier conversion. Medford needs both visible proof and operational sharpness.",
    priorityMoves: [
      "Differentiate around proof, process, or category depth instead of broad service language.",
      "Use design and authority assets to make the site feel more legitimate than generic local competitors.",
      "Install response infrastructure that keeps a larger volume of inbound interest from slipping through.",
    ],
    signals: [
      {
        value: "Valley-wide",
        label: "Search behavior",
        detail: "People compare across nearby cities, not just within Medford itself.",
      },
      {
        value: "Option-rich",
        label: "Buyer posture",
        detail: "Prospects have alternatives and will bounce if trust is weak.",
      },
      {
        value: "Authority",
        label: "Best first move",
        detail: "The business needs proof architecture, not just more pages.",
      },
    ],
    recommendedServices: ["custom-web-design", "local-visibility", "lead-capture-ai-follow-up", "search-data-architecture"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins", "web-agents-intelligence-report"],
    relatedCaseStudies: ["oregon-smb-directory", "daley-organics"],
    nearbyMarkets: ["ashland", "grants-pass", "klamath-falls"],
  },
  {
    slug: "portland",
    name: "Portland",
    region: "Portland Metro",
    tier: "tier-3",
    tierLabel: "Tier 3: Saturated Or Mixed",
    opportunity: "The metro is large enough to justify premium specialization, but generic local-marketing claims will drown in competition.",
    marketSummary: "Portland is only attractive when the offer is narrow, credible, and operationally tight.",
    buyerDynamics: "Buyers are flooded with options and often judge legitimacy before they judge service details.",
    idealFor: "Premium niches, specialist operators, and firms whose offer can support stronger proof and deeper content clustering.",
    diagnosticFocus: "Niche definition, proof architecture, SERP competition, and whether the site feels stronger than the local field.",
    caution: "Do not chase the entire metro with undifferentiated service pages. Portland demands focus, not volume for its own sake.",
    priorityMoves: [
      "Choose a tighter market entry point rather than trying to be everything to everyone.",
      "Build trust with stronger evidence, sharper message hierarchy, and cleaner information architecture.",
      "Use measurement and reporting to stay disciplined instead of mistaking activity for traction.",
    ],
    signals: [
      {
        value: "Saturated",
        label: "Competitive field",
        detail: "This market punishes broad, generic positioning quickly.",
      },
      {
        value: "Specialist",
        label: "Winning posture",
        detail: "Clear category depth beats vague full-service claims.",
      },
      {
        value: "Evidence-heavy",
        label: "Best first move",
        detail: "Proof and analytics discipline matter more than extra page count.",
      },
    ],
    recommendedServices: ["custom-web-design", "search-data-architecture", "local-visibility"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "web-agents-intelligence-report", "why-speed-wins"],
    relatedCaseStudies: ["oregon-smb-directory"],
    nearbyMarkets: ["salem", "albany", "eugene"],
  },
  {
    slug: "roseburg",
    name: "Roseburg",
    region: "Umpqua Valley",
    tier: "tier-2",
    tierLabel: "Tier 2: Stable Demand",
    opportunity: "Smaller-market trust and clarity can compound quickly when the business stops looking generic.",
    marketSummary: "Roseburg rewards the operator who looks local, trustworthy, and responsive without unnecessary complexity.",
    buyerDynamics: "Demand is smaller than in the metros, but it is often closer to an actual buying moment when it arrives.",
    idealFor: "Trades, family-owned service businesses, healthcare practices, and practical operators tired of wasted local demand.",
    diagnosticFocus: "Local trust signals, service-area specificity, and whether contact requests are handled fast enough to matter.",
    caution: "Do not confuse smaller scale with lower value. Smaller markets often make every missed inquiry more expensive.",
    priorityMoves: [
      "Clean up the local trust surface so the business looks established and easy to choose.",
      "Use service-area and nearby-market relevance to capture more valley demand.",
      "Build a direct response path that turns modest lead flow into steady booked work.",
    ],
    signals: [
      {
        value: "Closer intent",
        label: "Lead profile",
        detail: "People searching often want a provider soon, not eventually.",
      },
      {
        value: "Trust-sensitive",
        label: "Buyer behavior",
        detail: "Reassurance and legitimacy still matter even in a smaller market.",
      },
      {
        value: "Compounding",
        label: "Best first move",
        detail: "Steady gains come from local trust plus cleaner response systems.",
      },
    ],
    recommendedServices: ["local-visibility", "lead-capture-ai-follow-up", "custom-web-design"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins"],
    relatedCaseStudies: ["daley-organics", "oregon-smb-directory"],
    nearbyMarkets: ["eugene", "grants-pass", "medford"],
  },
  {
    slug: "salem",
    name: "Salem",
    region: "Willamette Valley",
    tier: "strategic",
    tierLabel: "Strategic Expansion",
    opportunity: "The capital city offers steady service demand, but it needs clearer segmentation than a generic statewide page can provide.",
    marketSummary: "Salem sits between high-volume opportunity and mid-market sameness, which makes disciplined positioning important.",
    buyerDynamics: "Buyers expect competence and convenience, and many compare options across the valley rather than within one city.",
    idealFor: "Multi-service operators, healthcare and home services, and businesses ready to sharpen category pages and proof.",
    diagnosticFocus: "Category focus, page hierarchy, and whether the site is doing enough to feel more credible than regional competitors.",
    caution: "Do not let Salem become a catch-all. It needs clearer market logic than just 'bigger city, bigger page.'",
    priorityMoves: [
      "Tighten the service hierarchy so buyers can self-select without confusion.",
      "Strengthen proof and trust elements that help the site rise above generic regional competition.",
      "Support demand capture with response workflows that reduce lag across multiple inquiry sources.",
    ],
    signals: [
      {
        value: "Broader demand",
        label: "Market shape",
        detail: "Salem can support multiple categories, but not vague presentation.",
      },
      {
        value: "Region-aware",
        label: "Buyer behavior",
        detail: "Searchers often compare Salem options with nearby valley providers.",
      },
      {
        value: "Structure",
        label: "Best first move",
        detail: "A cleaner information architecture is often the fastest win.",
      },
    ],
    recommendedServices: ["custom-web-design", "local-visibility", "lead-capture-ai-follow-up", "search-data-architecture"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "how-oregon-markets-differ-for-local-service-businesses", "why-speed-wins"],
    relatedCaseStudies: ["oregon-smb-directory"],
    nearbyMarkets: ["albany", "corvallis", "portland"],
  },
  {
    slug: "springfield",
    name: "Springfield",
    region: "Lane County",
    tier: "strategic",
    tierLabel: "Strategic Expansion",
    opportunity: "A practical, value-conscious market where direct language and cleaner trust signals can outperform flashier competitors.",
    marketSummary: "Springfield benefits from Eugene proximity, but it should be spoken to on its own terms.",
    buyerDynamics: "Buyers often want the right provider nearby and do not need a long persuasion sequence if the basics are strong.",
    idealFor: "Trades, clinics, and local service businesses that need better conversion clarity more than grand strategy theater.",
    diagnosticFocus: "Service-area clarity, plain-language trust signals, and the handoff between inquiry and actual human contact.",
    caution: "Do not let Springfield become a weak Eugene clone. The tone should feel grounded, practical, and local.",
    priorityMoves: [
      "Tighten local messaging so buyers feel served directly rather than as an afterthought to Eugene.",
      "Use proof and process clarity to lower hesitation for practical, value-conscious customers.",
      "Improve lead handling so nearby demand does not get lost to faster competitors.",
    ],
    signals: [
      {
        value: "Practical",
        label: "Buyer posture",
        detail: "People want confidence and clarity without excess marketing fluff.",
      },
      {
        value: "Adjacent",
        label: "Market position",
        detail: "Springfield benefits from Eugene traffic but needs its own voice.",
      },
      {
        value: "Direct",
        label: "Best first move",
        detail: "A grounded trust surface usually beats bigger brand theater here.",
      },
    ],
    recommendedServices: ["local-visibility", "custom-web-design", "lead-capture-ai-follow-up"],
    relatedReports: ["oregon-market-intel-infrastructure-report", "why-speed-wins"],
    relatedCaseStudies: ["daley-organics", "oregon-smb-directory"],
    nearbyMarkets: ["eugene", "corvallis", "salem"],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
