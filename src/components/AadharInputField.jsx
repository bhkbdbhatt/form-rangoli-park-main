import React, { useState } from 'react';
import { formatAadharInput, validateAadhar } from './utils/aadharUtils';

export default function AadharInputField({ value, onChange, error: externalError, styles }) {
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const { rawDigits, formattedValue } = formatAadharInput(inputValue);

        // Dynamic validation when field is complete (12 digits)
        if (rawDigits.length === 12) {
            // const validation = validateAadhar(rawDigits);
            // setError(validation.isValid ? '' : validation.message);
        } else if (touched && rawDigits.length > 0 && rawDigits.length < 12) {
            setError('૧૨ અંક પૂર્ણ કરો (Please enter complete 12 digits)');
        } else {
            setError('');
        }

        // Call parent handler with raw and formatted values
        onChange({
            target: {
                name: 'complainantAadhar',
                value: formattedValue,
                rawDigits: rawDigits
            }
        });
    };

    const handleBlur = () => {
        setTouched(true);
        const rawDigits = value ? value.replace(/\D/g, '') : '';
        if (rawDigits.length > 0 && rawDigits.length < 12) {
            setError('૧૨ અંક પૂર્ણ કરો (Please enter complete 12 digits)');
        } else if (rawDigits.length === 12) {
            const validation = validateAadhar(rawDigits);
            setError(validation.isValid ? '' : validation.message);
        }
    };

    const displayError = externalError || error;

    return (
        <div style={styles?.inputGroup || defaultStyles.inputGroup}>
            <label style={styles?.label || defaultStyles.label}>
                આધાર કાર્ડ નંબર (Aadhaar Number)
            </label>
            <input
                type="text"
                name="complainantAadhar"
                value={value || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="XXXX-XXXX-XXXX"
                maxLength={14} // 12 digits + 2 hyphens
                style={{
                    ...(styles?.input || defaultStyles.input),
                    borderColor: displayError ? '#d32f2f' : '#ccc',
                    letterSpacing: '1.5px',
                    fontFamily: 'monospace'
                }}
            />
            {displayError && (
                <span style={defaultStyles.errorMessage}>
                    {displayError}
                </span>
            )}
        </div>
    );
}

const defaultStyles = {
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    input: {
        padding: '10px',
        fontSize: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none'
    },
    errorMessage: {
        color: '#d32f2f',
        fontSize: '12px',
        marginTop: '4px'
    }
};