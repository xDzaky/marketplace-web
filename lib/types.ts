export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
};

export type Theme = {
  id: string;
  name: string;
  slug: string;
  palette: string;
  tagline: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type StoreSocial = {
  platform: 'twitter' | 'linkedin' | 'github' | 'website' | 'dribbble';
  url: string;
};

export type Store = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  rating: number;
  reviewCount: number;
  totalSales: number;
  responseTime: string;
  badges: string[];
  socials: StoreSocial[];
};

export type ProductStatus = 'draft' | 'published' | 'archived';

export type Product = {
  id: string;
  slug: string;
  storeId: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  rating: number;
  reviewCount: number;
  totalSales: number;
  featured: boolean;
  stack: string[];
  categoryIds: string[];
  themeIds: string[];
  tagIds: string[];
  demoUrl: string;
  thumbnailUrl: string;
  gallery: string[];
  highlights: string[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
};

export type MarketplaceStats = {
  totalProducts: number;
  totalSellers: number;
  totalDownloads: number;
  satisfactionRate: number;
};

export type DummyDataBundle = {
  categories: Category[];
  themes: Theme[];
  tags: Tag[];
  stores: Store[];
  products: Product[];
  marketplaceStats: MarketplaceStats;
};

