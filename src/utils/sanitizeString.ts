const RE_NON_ALPHABETIC = /[^A-Za-z]/g;

export function sanitizeString(input: string | null): string {
    if (!input) {
        return "";
    }
    return input.replace(RE_NON_ALPHABETIC, "");
}
