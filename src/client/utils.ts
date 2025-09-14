/**
 * Formátuje české 9-místné telefonní číslo do tvaru "723 721 333".
 * - Odstraní všechny nečíselné znaky.
 * - Po očistění musí zůstat přesně 9 číslic, jinak vyhodí chybu.
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
    if (typeof phoneNumber !== 'string') {
        throw new TypeError('Očekávám string s číslem (např. "723721333").');
    }

    // odstranit vše kromě číslic
    const digits = phoneNumber.replace(/\D/g, '');

    console.log(digits.length);
    
    if (digits.length !== 9) {
        throw new Error('Telefonní číslo musí obsahovat přesně 9 číslic.');
    }

    // rozdělit do trojic
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
};


export const formtaDate = (dateAsString: string): string =>{
return new Date(dateAsString).toLocaleDateString("cs-CZ");
}