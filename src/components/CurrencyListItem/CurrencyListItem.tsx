import { FC } from "react";
import "./CurrencyListItem.css";
import { Flag } from "../Flag/Flag.tsx";

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
        return "Rate not available";
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
        <li className="currency-list-item">
            <Flag countryCode={countryCode} />
            <p>{country}</p>
            <p>{currency}</p>
            <p>{formattedRate}</p>
        </li>
    );
};
