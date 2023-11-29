export default function currencyFilter(value, currency = 'RUB') {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 4,
        minimumFractionDigits: 2
    }).format(value);
}