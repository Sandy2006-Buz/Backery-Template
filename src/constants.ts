export const WHATSAPP_NUMBER = '7868006687';
export const INSTAGRAM_URL = 'https://www.instagram.com/sweetcrumb_bakery';
export const ADMIN_PASSWORD = 'admin123';
export const CURRENCY = '₹';
export const BAKERY_NAME = 'Sweet Crumb';
export const BAKERY_TAGLINE = 'Baked with Love, Served with a Smile';

export function formatPrice(amount: number): string {
  return `${CURRENCY}${amount.toLocaleString('en-IN')}`;
}
