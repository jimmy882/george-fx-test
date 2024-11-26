import { FC } from "react";

interface Props {
    searchTerm: string | null;
    onChange: (searchTerm: string) => void;
}

export const SearchBar: FC<Props> = ({ searchTerm, onChange }) => {
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
