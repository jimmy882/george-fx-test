import { FC, ReactNode, useEffect, useRef } from "react";
import "./Stripe.css";

interface Props {
    children: ReactNode;
}

const HIDDEN_CLASS = "hidden";
const FIXED_CLASS = "fixed";

export const Stripe: FC<Props> = ({ children }) => {
    const stripeRef = useRef<HTMLDivElement>(null);
    const searchStripeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!searchStripeRef.current || !stripeRef.current) {
                return;
            }
            const stripeBottom =
                stripeRef.current.getBoundingClientRect().bottom;

            if (stripeBottom <= 0) {
                stripeRef.current.classList.add(HIDDEN_CLASS);
                searchStripeRef.current.classList.add(FIXED_CLASS);
                return;
            }
            stripeRef.current.classList.remove(HIDDEN_CLASS);
            searchStripeRef.current.classList.remove(FIXED_CLASS);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className="stripe-header" ref={stripeRef}>
                <h1>George FE Test</h1>
            </div>
            <div className="stripe-search" ref={searchStripeRef}>
                {children}
            </div>
        </>
    );
};
