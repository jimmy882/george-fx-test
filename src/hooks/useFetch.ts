import { useEffect, useState } from "react";

interface HookResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

export function useFetch<T>(
    url: string,
    fetchData: (url: string) => Promise<T>,
): HookResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const setDataWithLoading = async () => {
            setIsLoading(true);
            try {
                const data = await fetchData(url);
                setData(data);
                setError(null);
            } catch (error) {
                setError(error as Error);
            }
            setIsLoading(false);
        };
        void setDataWithLoading();
    }, [fetchData, url]);

    return { data, isLoading, error };
}
