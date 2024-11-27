import { sanitizeString } from "./sanitizeString.ts";
import { describe, expect, it } from "vitest";

describe("sanitizeString", () => {
    it("removes invalid characters", () => {
        const input = '<script>alert("XSS")</script>';
        const output = "scriptalertXSSscript";
        expect(sanitizeString(input)).toBe(output);
    });

    it("returns plain text", () => {
        const input = "ABC";
        const output = "ABC";
        expect(sanitizeString(input)).toBe(output);
    });

    it("returns empty string", () => {
        const input = null;
        const output = "";
        expect(sanitizeString(input)).toBe(output);
    });
});
