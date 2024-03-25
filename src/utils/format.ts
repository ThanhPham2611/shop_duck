export const FormatCurrency = (currency: number) => {
  const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
  });

  return formatter.format(currency)
}