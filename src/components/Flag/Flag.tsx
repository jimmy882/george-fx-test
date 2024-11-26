import { FC, useState } from "react";
import "./Flag.css";

interface Props {
    countryCode: string;
}

export const Flag: FC<Props> = ({ countryCode }) => {
    const [src, setSrc] = useState(`/flags/${countryCode.toLowerCase()}.png`);

    const handleError = () => {
        setSrc("/flags/default.png");
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
