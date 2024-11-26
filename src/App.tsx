import { Stripe } from "./components/Stripe/Stripe.tsx";
import { Search } from "./components/Search/Search.tsx";
import { CurrencyList } from "./components/CurrencyList/CurrencyList.tsx";
import { useQueryParam } from "./hooks/useQueryParam.ts";

function App() {
    const [searchTerm, setSearchTerm] = useQueryParam("search");

    return (
        <>
            <Stripe>
                <Search searchTerm={searchTerm} onChange={setSearchTerm} />
            </Stripe>
            <CurrencyList searchTerm={searchTerm} />
        </>
    );
}

export default App;
