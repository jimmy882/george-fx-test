import { FC, ReactNode, useEffect, useRef } from "react";
import "./Stripe.css";

interface Props {
    children: ReactNode;
}

export const Stripe: FC<Props> = ({ children }) => {
    const stripeRef = useRef<HTMLDivElement>(null);
    const searchStripeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (searchStripeRef.current && stripeRef.current) {
                const stripeBottom =
                    stripeRef.current.getBoundingClientRect().bottom;
                if (stripeBottom <= 0) {
                    searchStripeRef.current.classList.add("fixed");
                } else {
                    searchStripeRef.current.classList.remove("fixed");
                }
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className="stripe" ref={stripeRef}>
                <h1>George FE Test</h1>
            </div>
            <div className="search-stripe" ref={searchStripeRef}>
                {children}
            </div>
        </>
    );
};
