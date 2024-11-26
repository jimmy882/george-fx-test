import { useEffect, useState } from "react";

interface HookResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

export function useFetch<T>(url: string): HookResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                const data = (await response.json()) as T;
                setData(data);
                setError(null);
            } catch (error) {
                setError(error as Error);
            }
            setIsLoading(false);
        };
        void fetchData();
    }, [url]);

    return { data, isLoading, error };
}
