import {
    CountryInfoAPIResponse,
    EnrichedExchangeRate,
    FxAPIResponse,
} from "../../types";

export function getFilteredItems(
    enrichedExchangeRates: EnrichedExchangeRate[],
    searchTerm: string,
) {
    return enrichedExchangeRates.filter(({ countryName, currencyCode }) => {
        return (
            countryName.toUpperCase().includes(searchTerm.toUpperCase()) ||
            currencyCode.includes(searchTerm.toUpperCase())
        );
    });
}

export function getEnrichedExchangeRates(
    countriesResponse: CountryInfoAPIResponse[],
    fxResponse: FxAPIResponse,
): EnrichedExchangeRate[] {
    const filteredCountries = countriesResponse.filter((country) => {
        return Object.keys(country.currencies).length > 0;
    });
    return filteredCountries.map((country) => {
        const fxInfo = fxResponse.fx.find((fx) =>
            Object.keys(country.currencies).includes(fx.currency),
        );

        return {
            countryName: country.name.common,
            countryCode: country.cca2,
            currencyCode: Object.keys(country.currencies)[0],
            rate: fxInfo?.exchangeRate?.middle,
        };
    });
}
