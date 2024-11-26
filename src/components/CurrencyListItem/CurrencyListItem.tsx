import { FC } from "react";

interface Props {
    countryCode: string;
    country: string;
    currency?: string;
    rate?: number;
    baseCurrency: string;
}

function formatExchangeRate(
    baseCurrency: string,
    rate: number | undefined,
    currency: string | undefined,
) {
    if (!rate || !currency) {
        return "FX Rate unavailable";
    }
    return `1 ${baseCurrency} = ${rate.toString()} ${currency}`;
}

export const CurrencyListItem: FC<Props> = ({
    countryCode,
    country,
    currency,
    rate,
    baseCurrency,
}) => {
    const formattedRate = formatExchangeRate(baseCurrency, rate, currency);
    return (
        <div>
            <p>{country}</p>
            <p>{countryCode}</p>
            <p>{currency}</p>
            <p>{formattedRate}</p>
        </div>
    );
};
