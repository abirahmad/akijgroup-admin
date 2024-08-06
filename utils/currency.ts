export function formatCurrency(value: number | bigint | string, isSymbol = true) {
    let currencySymbol;
    const currencyCode = 'BDT';

    switch (currencyCode) {
        case 'BDT':
            currencySymbol = '৳';
            break;
        default:
            currencySymbol = '';
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    if (isNaN(value)) {
        value = '0';
    }

    const formattedValue = formatter.format(parseFloat(value + ''));

    if (isSymbol) {
        return formattedValue.replace(currencyCode, currencySymbol);
    }

    return formattedValue;
}