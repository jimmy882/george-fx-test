import { EnrichedExchangeRate } from "../../types";

export function getFilteredItems(
    enrichedExchangeRates: EnrichedExchangeRate[],
    searchTerm: string | null,
) {
    if (!searchTerm) {
        return enrichedExchangeRates;
    }
    return enrichedExchangeRates.filter(({ countryName, currencyCode }) => {
        return (
            countryName.toUpperCase().includes(searchTerm.toUpperCase()) ||
            currencyCode.includes(searchTerm.toUpperCase())
        );
    });
}
