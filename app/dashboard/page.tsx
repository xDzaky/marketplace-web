import { products, stores } from '@/lib/dummy-data';
import RevenueCard, { type RevenuePoint } from '@/components/dashboard/revenue-card';
import DashboardListMini, { type DashboardListItem } from '@/components/dashboard/list-mini';
import DashboardEmpty from '@/components/dashboard/empty';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — Marketplace Web',
  description: 'Unified buyer and seller hub with quick access to deals, downloads, and performance.',
};

export default function DashboardPage() {
  const buyerOrders = getRecentOrders();
  const buyerDownloads = getDownloads();
  const favorites = getFavorites();

  const revenue = getRevenueSeries();
  const topListings = getTopListings();
  const messages = getMessages();
  const customRequests = getCustomRequests();

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-blue-900/15">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Dashboard hub</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back, operator</h1>
        <p className="mt-2 text-sm text-slate-300">
          Monitor acquisitions, fulfilment, and storefront health in one place. Use quick actions below to
          jump into buyer or seller workflows.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RevenueCard title="Last 6 months revenue" subtitle="Seller view" data={revenue} />

        <DashboardListMini
          title="Recent orders"
          subtitle="Buyer view"
          items={buyerOrders}
          empty={<DashboardEmpty title="No orders yet" description="Purchase your first template to see it here." />}
        />

        <DashboardListMini
          title="Downloads"
          items={buyerDownloads}
          empty={<DashboardEmpty title="No downloads yet" description="Files from completed purchases will live here." />}
        />

        <DashboardListMini
          title="Saved listings"
          items={favorites}
          empty={<DashboardEmpty title="No favorites saved" description="Favorite a listing to revisit quickly." />}
        />

        <DashboardListMini
          title="Top listings"
          subtitle="Seller performance"
          items={topListings}
          empty={<DashboardEmpty title="No listings published" description="Publish a product to track performance." />}
        />

        <DashboardListMini
          title="Latest messages"
          items={messages}
          empty={<DashboardEmpty title="Inbox is quiet" description="Conversations with buyers will show up here." />}
        />

        <DashboardListMini
          title="Custom requests"
          items={customRequests}
          empty={<DashboardEmpty title="No custom briefs" description="Enable custom briefs to capture bespoke work." />}
        />
      </div>
    </div>
  );
}

function getRecentOrders(): DashboardListItem[] {
  return products.slice(0, 4).map((product, index) => ({
    id: `order-${product.id}`,
    title: product.title,
    description: `Order #${1423 + index} • ${new Date(product.createdAt).toLocaleDateString()}`,
    href: `/orders/${product.id}`,
    meta: formatPrice(product.priceCents, product.currency),
  }));
}

function getDownloads(): DashboardListItem[] {
  return products.slice(0, 4).map((product) => ({
    id: `download-${product.id}`,
    title: product.title,
    description: 'Download link • Expires in 12 days',
    href: `/downloads/${product.id}`,
    meta: 'ZIP 120MB',
  }));
}

function getFavorites(): DashboardListItem[] {
  return products.slice(4, 8).map((product) => ({
    id: `favorite-${product.id}`,
    title: product.title,
    description: `Saved • ${product.stack.slice(0, 2).join(', ')}`,
    href: `/products/${product.slug}`,
    meta: formatPrice(product.priceCents, product.currency),
  }));
}

function getRevenueSeries(): RevenuePoint[] {
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  return months.map((month, index) => {
    const product = products[index % products.length];
    const volume = Math.round((product.totalSales * product.priceCents) / 10000 + index * 1200);
    return { month, amount: volume };
  });
}

function getTopListings(): DashboardListItem[] {
  return products
    .slice()
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 4)
    .map((product) => ({
      id: `top-${product.id}`,
      title: product.title,
      description: `${product.totalSales.toLocaleString()} customers • Rating ${product.rating.toFixed(1)}`,
      href: `/products/${product.slug}`,
      meta: formatPrice(product.priceCents, product.currency),
    }));
}

function getMessages(): DashboardListItem[] {
  return stores.slice(0, 3).map((store) => ({
    id: `message-${store.id}`,
    title: `Chat with ${store.name}`,
    description: '“Can you share usage metrics before our call?”',
    href: `/chat/${store.id}`,
    meta: '2h ago',
  }));
}

function getCustomRequests(): DashboardListItem[] {
  return [
    {
      id: 'req-1',
      title: 'Fintech KPI Dashboard',
      description: 'Budget $3.5k • Due Oct 30',
      href: '/custom-requests/req-1',
      meta: 'In review',
    },
    {
      id: 'req-2',
      title: 'AI onboarding concierge',
      description: 'Budget $6k • Due Nov 12',
      href: '/custom-requests/req-2',
      meta: 'Quoted',
    },
  ];
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
