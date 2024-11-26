import { FC } from "react";

interface Props {
    searchTerm: string;
    onChange: (searchTerm: string) => void;
}

export const SearchBar: FC<Props> = ({ searchTerm, onChange }) => {
    return (
        <div>
            <label>Search</label>
            <input
                type="text"
                className="search-input"
                onChange={(event) => {
                    onChange(event.target.value);
                }}
                value={searchTerm}
            />
        </div>
    );
};
