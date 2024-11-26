import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { sanitizeInput } from "../utils/sanitizeInput.ts";

type HookResult = [string | null, (value: string) => void];

export function useQueryParam(key: string): HookResult {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );

    const setQueryParam = useCallback(
        (value: string) => {
            const sanitizedValue = sanitizeInput(value);
            if (sanitizedValue) {
                searchParams.set(key, sanitizedValue);
            }
            if (!sanitizedValue) {
                searchParams.delete(key);
            }
            void navigate({ search: searchParams.toString() });
        },
        [key, navigate, searchParams],
    );

    return [searchParams.get(key), setQueryParam];
}
