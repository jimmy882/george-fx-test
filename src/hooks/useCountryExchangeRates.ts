import { useFetch } from "./useFetch.ts";
import { CountryInfoAPIResponse, FxAPIResponse } from "../types";
import { getEnrichedExchangeRates } from "../components/CurrencyList/CurrencyListService.ts";

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
