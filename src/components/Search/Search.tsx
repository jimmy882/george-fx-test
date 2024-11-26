import { FC } from "react";
import "./Search.css";

interface Props {
    searchTerm: string | null;
    onChange: (searchTerm: string) => void;
}

export const Search: FC<Props> = ({ searchTerm, onChange }) => {
    return (
        <>
            <label>Search</label>
            <input
                type="text"
                className="search-input"
                onChange={(event) => {
                    onChange(event.target.value);
                }}
                value={searchTerm ?? ""}
            />
        </>
    );
};
