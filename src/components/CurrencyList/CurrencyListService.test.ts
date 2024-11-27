import { describe, expect, it } from "vitest";
import {
    CountryInfoAPIResponse,
    EnrichedExchangeRate,
    FxAPIResponse,
} from "../../types";
import {
    getEnrichedExchangeRates,
    getFilteredItems,
} from "./CurrencyListService.ts";

describe("getFilteredItems", () => {
    const enrichedExchangeRates: EnrichedExchangeRate[] = [
        {
            countryName: "United States",
            countryCode: "US",
            currencyCode: "USD",
            rate: 1.0,
        },
        {
            countryName: "Canada",
            countryCode: "CA",
            currencyCode: "CAD",
            rate: 1.25,
        },
    ];

    it("returns all items when search term is empty", () => {
        const result = getFilteredItems(enrichedExchangeRates, "");
        expect(result).toEqual(enrichedExchangeRates);
    });

    it("filters items by country name", () => {
        const result = getFilteredItems(enrichedExchangeRates, "Canada");
        expect(result).toEqual([
            {
                countryName: "Canada",
                countryCode: "CA",
                currencyCode: "CAD",
                rate: 1.25,
            },
        ]);
    });

    it("filters items by currency code", () => {
        const result = getFilteredItems(enrichedExchangeRates, "CAD");
        expect(result).toEqual([
            {
                countryName: "Canada",
                countryCode: "CA",
                currencyCode: "CAD",
                rate: 1.25,
            },
        ]);
    });

    it("should be case insensitive", () => {
        const result = getFilteredItems(enrichedExchangeRates, "states");
        expect(result).toEqual([
            {
                countryName: "United States",
                countryCode: "US",
                currencyCode: "USD",
                rate: 1.0,
            },
        ]);
    });

    it("returns an empty array if no matches are found", () => {
        const result = getFilteredItems(enrichedExchangeRates, "XYZ");
        expect(result).toEqual([]);
    });

    it("returns all items with substring", () => {
        const result = getFilteredItems(enrichedExchangeRates, "a");
        expect(result).toEqual([
            {
                countryName: "United States",
                countryCode: "US",
                currencyCode: "USD",
                rate: 1.0,
            },
            {
                countryName: "Canada",
                countryCode: "CA",
                currencyCode: "CAD",
                rate: 1.25,
            },
        ]);
    });
});

describe("getEnrichedExchangeRates", () => {
    const countriesResponse: CountryInfoAPIResponse[] = [
        {
            name: { common: "United States" },
            cca2: "US",
            currencies: { USD: { name: "United States dollar", symbol: "$" } },
        },
        {
            name: { common: "Canada" },
            cca2: "CA",
            currencies: { CAD: { name: "Canadian dollar", symbol: "$" } },
        },
    ];

    const fxResponse: FxAPIResponse = {
        baseCurrency: "USD",
        fx: [
            {
                currency: "USD",
                exchangeRate: { buy: 1.1, sell: 0.9, middle: 1.0 },
            },
            {
                currency: "CAD",
                exchangeRate: { buy: 1.3, sell: 1.2, middle: 1.25 },
            },
        ],
    };

    it("returns enriched exchange rates", () => {
        const result = getEnrichedExchangeRates(countriesResponse, fxResponse);
        expect(result).toEqual([
            {
                countryName: "United States",
                countryCode: "US",
                currencyCode: "USD",
                rate: 1.0,
            },
            {
                countryName: "Canada",
                countryCode: "CA",
                currencyCode: "CAD",
                rate: 1.25,
            },
        ]);
    });

    it("filters out countries without currencies", () => {
        const countriesResponseWithNoCurrencies: CountryInfoAPIResponse[] = [
            {
                name: { common: "United States" },
                cca2: "US",
                currencies: {},
            },
        ];
        const result = getEnrichedExchangeRates(
            countriesResponseWithNoCurrencies,
            fxResponse,
        );
        expect(result).toEqual([]);
    });

    it("returns undefined when exchange rates are missing", () => {
        const fxResponseWithMissingRates: FxAPIResponse = {
            baseCurrency: "USD",
            fx: [],
        };
        const result = getEnrichedExchangeRates(
            countriesResponse,
            fxResponseWithMissingRates,
        );
        expect(result).toEqual([
            {
                countryName: "United States",
                countryCode: "US",
                currencyCode: "USD",
                rate: undefined,
            },
            {
                countryName: "Canada",
                countryCode: "CA",
                currencyCode: "CAD",
                rate: undefined,
            },
        ]);
    });
});
