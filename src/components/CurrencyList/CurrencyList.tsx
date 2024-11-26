import { FC } from "react";
import { CurrencyListItem } from "../CurrencyListItem/CurrencyListItem.tsx";
import { useCountryExchangeRates } from "../../hooks/useCountryExchangeRates.tsx";
import { getFilteredItems } from "./CurrencyListService.ts";

interface Props {
    searchTerm: string;
}

export const CurrencyList: FC<Props> = ({ searchTerm }) => {
    const { data, isLoading, error } = useCountryExchangeRates();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Something went wrong</div>;
    }
    if (!data) {
        return <div>No data</div>;
    }

    const filteredItems = getFilteredItems(
        data.enrichedExchangeRates,
        searchTerm,
    );

    if (!filteredItems.length) {
        return <div>No data</div>;
    }

    return filteredItems.map((item) => (
        <CurrencyListItem
            key={item.countryCode}
            countryCode={item.countryCode}
            country={item.countryName}
            currency={item.currencyCode}
            rate={item.rate}
            baseCurrency={data.baseCurrency}
        />
    ));
};
