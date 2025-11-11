/**
 * Funkce pro získání validního návzu souboru
 * @param fileName 
 * @returns 
 */
export function slugify(str: string): string {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 .-]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}

/**
 * Slouží pro namapování stavu přihlášky na český text
 * @param state 
 * @returns 
 */
export function getStatusText(state: string) {
    switch (state) {
        case "pending":
            return "Čeká na vyřízení";
        case "approved":
            return "Schváleno";
        case "rejected":
            return "Zamítnuto";
        case "paid":
            return "Zaplaceno";
        default:
            return state;
    }
}