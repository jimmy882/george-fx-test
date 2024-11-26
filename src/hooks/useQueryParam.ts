import { useCallback, useState } from "react";
import { sanitizeString } from "../utils/sanitizeString.ts";

type HookResult = [string, (value: string) => void];

export function useQueryParam(key: string): HookResult {
    const [searchString, setSearchString] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return sanitizeString(searchParams.get(key));
    });

    const setQueryParam = useCallback(
        (value: string) => {
            const sanitizedValue = sanitizeString(value);
            const url = new URL(window.location.href);
            url.searchParams.set(key, sanitizedValue);
            window.history.pushState({}, "", url.toString());
            setSearchString(sanitizedValue);
        },
        [key],
    );

    return [searchString, setQueryParam];
}
