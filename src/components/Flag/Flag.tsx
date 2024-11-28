import { FC, useState } from "react";
import "./Flag.css";

const DEFAULT_FLAG_SRC = "/flags/default.png";

interface Props {
    countryCode: string;
}

export const Flag: FC<Props> = ({ countryCode }) => {
    const [src, setSrc] = useState(`/flags/${countryCode.toLowerCase()}.png`);

    const handleError = () => {
        setSrc(DEFAULT_FLAG_SRC);
    };

    return (
        <img
            src={src}
            alt={`${countryCode} flag`}
            className="flag"
            onError={handleError}
        />
    );
};
