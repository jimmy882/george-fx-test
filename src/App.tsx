import { Stripe } from "./components/Stripe/Stripe.tsx";
import { SearchBar } from "./components/SearchBar/SearchBar.tsx";
import { CurrencyList } from "./components/CurrencyList/CurrencyList.tsx";
import { useQueryParam } from "./hooks/useQueryParam.ts";

function App() {
    const [searchTerm, setSearchTerm] = useQueryParam("search");

    return (
        <>
            <Stripe>
                <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
            </Stripe>
            <CurrencyList searchTerm={searchTerm} />
        </>
    );
}

export default App;
