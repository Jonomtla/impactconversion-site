export const formatCurrency = (n: number) => "$" + Math.round(n).toLocaleString();

export const formatRPV = (n: number) => "$" + n.toFixed(2);

export const formatCompact = (n: number) => {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return sign + "$" + (abs / 1_000_000).toFixed(2) + "M";
  if (abs >= 1_000) return sign + "$" + (abs / 1_000).toFixed(0) + "k";
  return sign + "$" + abs.toFixed(0);
};
