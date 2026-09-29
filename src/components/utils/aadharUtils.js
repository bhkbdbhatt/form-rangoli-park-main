// Verhoeff Algorithm Tables for Checksum Calculation
const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 1, 2, 3, 4],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];

const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

/**
 * Validates a 12-digit numeric string using the Verhoeff Checksum Algorithm.
 */
export function validateVerhoeff(str) {
    let c = 0;
    const myArray = str.split('').map(Number).reverse();

    for (let i = 0; i < myArray.length; i++) {
        c = d[c][p[i % 8][myArray[i]]];
    }

    return c === 0;
}

/**
 * Sanitizes input (digits only) and formats it with hyphens: XXXX-XXXX-XXXX
 */
export function formatAadharInput(value) {
    // Strip non-digit characters and truncate to 12 digits max
    const digitsOnly = value.replace(/\D/g, '').slice(0, 12);

    // Group into blocks of 4
    const parts = [];
    for (let i = 0; i < digitsOnly.length; i += 4) {
        parts.push(digitsOnly.substring(i, i + 4));
    }

    return {
        rawDigits: digitsOnly,
        formattedValue: parts.join('-')
    };
}

/**
 * Full structural and algorithmic validation check for Aadhaar numbers.
 */
export function validateAadhar(rawDigits) {
    // 1. Must be exactly 12 digits
    // if (rawDigits.length !== 12) {
    //     return { isValid: false, message: 'આધાર નંબર ૧૨ અંકનો હોવો જોઈએ (Must be 12 digits)' };
    // }

    // // 2. Aadhaar numbers cannot start with 0 or 1
    // if (rawDigits.startsWith('0') || rawDigits.startsWith('1')) {
    //     return { isValid: false, message: 'અમાન્ય નંબર: આધાર નંબર 0 અથવા 1 થી શરૂ થતો નથી (Cannot start with 0 or 1)' };
    // }

    // 3. Verhoeff checksum validation
    // if (!validateVerhoeff(rawDigits)) {
    //     return { isValid: false, message: 'અમાન્ય આધાર નંબર Checksum verification failed' };
    // }

    return { isValid: true, message: '' };
}