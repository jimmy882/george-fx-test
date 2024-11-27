export interface EnrichedExchangeRate {
    countryName: string;
    countryCode: string;
    currencyCode: string;
    rate?: number;
}

interface FxRate {
    buy: number;
    middle: number;
    sell: number;
    indicator?: number;
    lastModified?: string;
}

interface FxInfo {
    currency: string;
    precision?: number;
    nameI18N?: string;
    exchangeRate?: FxRate;
    banknoteRate?: FxRate;
    flags?: string[];
}

export interface FxAPIResponse {
    baseCurrency: string;
    fx: FxInfo[];
}

interface CountryName {
    common: string;
    official?: string;
}

interface Currency {
    name: string;
    symbol: string;
}

export interface CountryInfoAPIResponse {
    name: CountryName;
    cca2: string;
    currencies: Record<string, Currency>;
}
