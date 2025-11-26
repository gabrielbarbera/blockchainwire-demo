import { Circuit, PromoCode, User, UserRole, Release } from './types';

export const CIRCUITS: Circuit[] = [
  {
    id: 'basic-seo',
    name: 'Basic SEO',
    category: 'Wire',
    description: 'Domestic Circuit',
    price: 195.00,
    features: [
      'Publication on Blockchain Wire',
      'Syndicated distribution to unique curated list of Blockchain and Crypto media points and blogs, including BTCWires, CoinOpening, Crypto Press, CoinChapter, Visionary-Finance, and many more',
      'Circuit includes the Blockchain Wire weekly newsletter and social media posts'
    ],
    stats: { countries: 'USA', language: 'English' }
  },
  {
    id: 'pro',
    name: 'Pro',
    category: 'Wire',
    description: 'Domestic Circuit',
    price: 295.00,
    features: [
      'Publication on Google News, BizWire Express, EIN Presswire, MENAFN',
      'Up to 15 crypto news sites',
      'Hundreds of additional placements through editorial syndication'
    ],
    stats: { traffic: '500k+', turnaround: 'Two hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'elite',
    name: 'Elite',
    category: 'Wire',
    description: 'Domestic Circuit',
    price: 395.00,
    features: [
      'Includes all points in the Pro circuit',
      'Publication on top-tier media outlets like AP, Barchart, Benzinga, Business Insider and more'
    ],
    stats: { traffic: '71+ million', turnaround: '24 hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'premium',
    name: 'Premium',
    category: 'Wire',
    description: 'Domestic Circuit',
    price: 495.00,
    features: [
      'Includes all points in the Pro circuit',
      'Additional distribution to premium mainstream news outlets as well as financial institutions via their terminal systems',
      'Additional coverage provided by AP, Barron\'s, Benzinga, Business Insider, Google News Indexing, MarketWatch, Street Insider, and more'
    ],
    stats: { traffic: '82+ million', turnaround: 'Two hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'copper',
    name: 'Copper',
    category: 'Specialty',
    description: 'Specialty Circuit',
    price: 495.00,
    features: [
      'Guaranteed placement on up to 12 Crypto sites BitcoinWorld, Binance, CoinMarketCap and more'
    ],
    stats: { traffic: '300k+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'silver',
    name: 'Silver',
    category: 'Specialty',
    description: 'Specialty Circuit',
    price: 1195.00,
    features: [
      'Includes all points in the Pro circuit',
      'Additional publication on 8 crypto sites, including TheBitTimes, Captain Altcoin, Coincu, and more'
    ],
    stats: { traffic: '730k+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'gold',
    name: 'Gold',
    category: 'Specialty',
    description: 'Specialty Circuit',
    price: 2195.00,
    features: [
      'Includes all points in the Pro circuit',
      'Additional publication on 8 crypto sites, including Coinedition, Coinspeaker, Mpost, and more'
    ],
    stats: { traffic: '4.1M+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'platinum',
    name: 'Platinum',
    category: 'Specialty',
    description: 'Specialty Circuit',
    price: 3295.00,
    features: [
      'Includes all points in the Pro circuit',
      'Additional publication on 8 crypto sites, including Bitcoinist, Hackernoon, NewsBTC, and more'
    ],
    stats: { traffic: '7.9M+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'diamond',
    name: 'Diamond',
    category: 'Specialty',
    description: 'Specialty Circuit',
    price: 5295.00,
    features: [
      'Includes all points in the Pro circuit',
      'Additional publication on 10 crypto sites, including AMB Crypto, Cryptonews, Cryptopolitan, and more'
    ],
    stats: { traffic: '17.4M+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'cointelegraph',
    name: 'Cointelegraph',
    category: 'Individual',
    description: 'Individual Publication',
    price: 7250.00,
    features: [
      'Includes all points in the Pro circuit',
      'Publication on Cointelegraph, the premier news site for all things crypto',
      'Circuit includes comprehensive reporting'
    ],
    stats: { traffic: '9.4M+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'cointelegraph-lite',
    name: 'CoinTelegraph Lite',
    category: 'Individual',
    description: 'Individual Publication',
    price: 4250.00,
    features: [
      'Includes all points in the Pro circuit',
      'Publication on Cointelegraph, the premier news site for all things crypto',
      'Circuit includes comprehensive reporting'
    ],
    stats: { traffic: '9.4M+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'beincrypto',
    name: 'Beincrypto',
    category: 'Individual',
    description: 'Individual Publication',
    price: 1650.00,
    features: [
      'Includes all points in the Pro circuit',
      'Publication on Beincrypto, one of the top news sites in the crypto industry',
      'Circuit includes comprehensive reporting'
    ],
    stats: { traffic: '3.6M+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'bitcoin-com',
    name: 'Bitcoin.com',
    category: 'Individual',
    description: 'Individual Publication',
    price: 1750.00,
    features: [
      'Includes all points in the Pro circuit',
      'Publication on Bitcoin.com, a global leader in the crypto industry since 2015',
      'Circuit includes comprehensive reporting'
    ],
    stats: { traffic: '1.8M+', turnaround: '36 Hours', countries: 'USA', language: 'English' }
  },
  {
    id: 'budget-asia',
    name: 'Budget Asia',
    category: 'International',
    description: 'International Circuit',
    price: 1795.00,
    features: [
      'General Media + all major Blockchain and Crypto media points and blogs around the globe',
      'Countries: Australia, China, Hong Kong, India, Indonesia, Japan, Malaysia, New Zealand, Philippines, Singapore, South Korea, Taiwan, Thailand, Vietnam'
    ],
    stats: { countries: 'Asia-Pacific Region', language: 'English' }
  },
  {
    id: 'budget-europe',
    name: 'Budget Europe',
    category: 'International',
    description: 'International Circuit',
    price: 1995.00,
    features: [
      'General Media + all major Blockchain and Crypto media points and blogs around the globe',
      'Countries: Austria, Belgium, Czech Republic, Denmark, Estonia, Finland, France, Germany, Hungary, Iceland, Ireland, Italy, Latvia, Lithuania, Luxembourg, Netherlands, Norway, Poland, Portugal, Russia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Turkey, UK'
    ],
    stats: { countries: 'Europe', language: 'English, European Languages' }
  },
  {
    id: 'budget-global',
    name: 'Budget Global',
    category: 'International',
    description: 'International Circuit',
    price: 2995.00,
    features: [
      'General Media + all major Blockchain and Crypto media points and blogs around the globe',
      'Global coverage'
    ],
    stats: { countries: 'Asia, Europe, Latin America, North America', language: 'English' }
  },
  {
    id: 'budget-latam',
    name: 'Budget Latin America',
    category: 'International',
    description: 'International Circuit',
    price: 1295.00,
    features: [
      'General Media + all major Blockchain and Crypto media points and blogs around the globe',
      'Countries: Argentina, Bolivia, Brazil, Chile, Colombia, Costa Rica, Cuba, Dominican Republic, Ecuador, El Salvador, Guatemala, Honduras, Mexico, Nicaragua, Panama Paraguay, Peru, Puerto Rico, Uruguay, Venezuela'
    ],
    stats: { countries: 'Latin America', language: 'Spanish, English, Portuguese' }
  }
];

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alex Morgan', email: 'alex.morgan@techvision.com', role: UserRole.ADMIN, status: 'Active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@techvision.com', role: UserRole.USER, status: 'Active' },
  { id: '3', name: 'Michael Chen', email: 'michael.chen@techvision.com', role: UserRole.BILLING, status: 'Active' },
];

export const MOCK_PROMOS: PromoCode[] = [
  {
    code: 'SPRING2024',
    circuit: 'Pro',
    company: 'TechVision Inc',
    discount: '20%',
    remaining: 45,
    dateIssued: '2024-03-15',
    expirationDate: '2025-06-30',
  },
  {
    code: 'BLOCKCHAIN25',
    circuit: 'Elite',
    company: 'TechVision Inc',
    discount: '15%',
    remaining: 12,
    dateIssued: '2024-01-10',
    expirationDate: '2025-12-31',
  },
  {
    code: 'WIRE2024',
    circuit: 'Premium',
    company: 'TechVision Inc',
    discount: '25%',
    remaining: 8,
    dateIssued: '2024-02-01',
    expirationDate: '2025-05-31',
  },
  {
    code: 'NEWCLIENT50',
    circuit: 'Basic SEO',
    company: 'TechVision Inc',
    discount: '50%',
    remaining: 100,
    dateIssued: '2024-04-01',
    expirationDate: '2025-07-31',
  },
  {
    code: 'SUMMER2024',
    circuit: 'Pro',
    company: 'TechVision Inc',
    discount: '30%',
    remaining: 23,
    dateIssued: '2024-05-01',
    expirationDate: '2025-08-31',
  },
  {
    code: 'VIP2024',
    circuit: 'Elite',
    company: 'TechVision Inc',
    discount: '10%',
    remaining: 5,
    dateIssued: '2024-01-05',
    expirationDate: '2025-12-31',
  },
  {
    code: 'LAUNCH2024',
    circuit: 'Premium',
    company: 'TechVision Inc',
    discount: '35%',
    remaining: 15,
    dateIssued: '2024-03-20',
    expirationDate: '2025-06-30',
  },
];

export const MOCK_RELEASES: Release[] = [
  {
    id: '1',
    status: 'Published',
    date: 'Dec 15, 2024, 10:30:00 AM',
    circuitName: 'Premium Global',
    headline: 'TechVision Inc. Launches Revolutionary Blockchain-Based Supply Chain Platform',
    author: 'Alex Morgan'
  },
  {
    id: '2',
    status: 'Scheduled',
    date: 'Dec 20, 2024, 2:00:00 PM',
    circuitName: 'Elite',
    headline: 'CryptoExchange Announces Partnership with Major Financial Institution for Institutional Trading',
    author: 'Sarah Chen'
  },
  {
    id: '3',
    status: 'Draft',
    date: 'not selected',
    circuitName: 'Pro',
    headline: 'DeFi Protocol Secures $50M Series B Funding Round Led by Top VC Firms',
    author: 'Michael Rodriguez'
  },
  {
    id: '4',
    status: 'Published',
    date: 'Dec 10, 2024, 9:15:00 AM',
    circuitName: 'Basic SEO',
    headline: 'New NFT Marketplace Launches with Zero Gas Fees and Carbon-Neutral Transactions',
    author: 'Emily Johnson'
  },
  {
    id: '5',
    status: 'Scheduled',
    date: 'Dec 22, 2024, 11:00:00 AM',
    circuitName: 'Premium',
    headline: 'Blockchain Startup Unveils AI-Powered Smart Contract Auditing Tool',
    author: 'Alex Morgan'
  },
  {
    id: '6',
    status: 'Draft',
    date: 'not selected',
    circuitName: 'Pro',
    headline: 'Major Bank Integrates Cryptocurrency Trading Services for Retail Customers',
    author: 'David Kim'
  },
  {
    id: '7',
    status: 'Published',
    date: 'Dec 5, 2024, 3:45:00 PM',
    circuitName: 'Elite',
    headline: 'Web3 Gaming Platform Raises $30M to Build Next-Generation Metaverse Experience',
    author: 'Jessica Martinez'
  },
  {
    id: '8',
    status: 'Scheduled',
    date: 'Dec 18, 2024, 1:30:00 PM',
    circuitName: 'Premium Global',
    headline: 'Enterprise Blockchain Solution Reduces Supply Chain Costs by 40% in Pilot Program',
    author: 'Alex Morgan'
  }
];