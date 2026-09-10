export const PAGE_TYPES = [
  'Homepage',
  'Collection',
  'Product',
  'Landing page',
  'Blog',
  'Cart / checkout',
  'Search',
  'Other',
] as const;

export type PageType = (typeof PAGE_TYPES)[number];

/** Detect page type from Shopify (and general ecommerce) URL conventions. */
export function detectPageType(path: string): PageType {
  const p = path.trim().toLowerCase().split('?')[0];
  if (p === '/' || p === '' || p === '/index' || p === '/home') return 'Homepage';
  if (p.includes('/collections/') || p.startsWith('/collections') || p.includes('/category/') || p.includes('/shop/')) return 'Collection';
  if (p.includes('/products/') || p.includes('/product/')) return 'Product';
  if (p.includes('/blogs/') || p.includes('/blog/') || p.startsWith('/blog') || p.includes('/articles/')) return 'Blog';
  if (p.includes('/cart') || p.includes('/checkout')) return 'Cart / checkout';
  if (p.includes('/search')) return 'Search';
  if (p.includes('/pages/') || p.includes('/lp/') || p.includes('/landing')) return 'Landing page';
  return 'Other';
}
