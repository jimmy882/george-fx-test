import { useState } from "react";
import { Stripe } from "./components/Stripe/Stripe.tsx";
import { SearchBar } from "./components/SearchBar/SearchBar.tsx";
import { CurrencyList } from "./components/CurrencyList/CurrencyList.tsx";

function App() {
    const [searchTerm, setSearchTerm] = useState<string>("");

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
