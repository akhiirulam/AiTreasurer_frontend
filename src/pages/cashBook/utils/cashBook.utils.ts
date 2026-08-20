/**
 * Format an amount as Indian Rupees.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format an ISO date string for display.
 *
 * Example:
 * 2024-12-06T00:00:00.000Z
 * → 06 Dec 2024
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Format account category for display.
 *
 * Example:
 * current_asset
 * → Current Asset
 */
export const formatAccountCategory = (category?: string): string => {
  if (!category) {
    return "";
  }

  return category
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

/**
 * Create a readable period label.
 *
 * Examples:
 * From 01 Jan 2024 – 31 Jan 2024
 * From 01 Jan 2024
 * Until 31 Jan 2024
 * All transactions
 */
export const formatPeriodLabel = (
  from: string | null | undefined,
  to: string | null | undefined,
): string => {
  if (from && to) {
    return `${formatDate(from)} – ${formatDate(to)}`;
  }

  if (from) {
    return `From ${formatDate(from)}`;
  }

  if (to) {
    return `Until ${formatDate(to)}`;
  }

  return "All transactions";
};
