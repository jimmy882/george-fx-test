import { useFetch } from "./useFetch.ts";
import {
    CountryInfoAPIResponse,
    EnrichedExchangeRate,
    FxAPIResponse,
} from "../types";

function getEnrichedExchangeRates(
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

export function useCountryExchangeRates() {
    const {
        data: fxResponse,
        isLoading: isFxLoading,
        error: fxError,
    } = useFetch<FxAPIResponse>(
        "https://raw.githubusercontent.com/keriati/george-fx-test/refs/heads/master/fx.json",
    );

    const {
        data: countriesResponse,
        isLoading: isCountriesLoading,
        error: countriesError,
    } = useFetch<CountryInfoAPIResponse[]>(
        "https://restcountries.com/v3.1/all?fields=name,cca2,currencies",
    );

    if (isFxLoading || isCountriesLoading) {
        return { data: null, isLoading: true, error: null };
    }

    if (fxError || countriesError) {
        return {
            data: null,
            isLoading: false,
            error: fxError ?? countriesError,
        };
    }

    if (!fxResponse || !countriesResponse) {
        return { data: null, isLoading: false, error: "No data" };
    }

    const enrichedExchangeRates = getEnrichedExchangeRates(
        countriesResponse,
        fxResponse,
    );

    return {
        data: {
            enrichedExchangeRates,
            baseCurrency: fxResponse.baseCurrency,
        },
        isLoading: false,
        error: null,
    };
}
