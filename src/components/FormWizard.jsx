// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react'; // <-- Added useEffect import
import emailjs from '@emailjs/browser';
import AadharInputField from './AadharInputField';
import DocumentPreview from './DocumentPreview';
import { validateAadhar } from './utils/aadharUtils';


// Initialize EmailJS with your public key
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

export default function FormWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [stepErrors, setStepErrors] = useState({});
    // Define STORAGE_KEY at the top level outside the component
    const STORAGE_KEY = 'rangoli_park_form_data';
    // ✅ CORRECT: Rename initial values object to `initialFormState`
    const initialFormState = {
        // Step 1: Core Identifiers
        complaintNumber: '',
        currentYear: '૨૦૨૬',
        complainantAadhar: '',

        // Step 2: Complainant Profile
        complainantName: '',
        complainantAge: '',
        complainantEmail: '',
        complainantCategory: '',
        isPhysicallyDisabled: false,
        spouseName: '',
        complainantMobile: '',
        address: '',

        // Step 3: Dispute & Financials
        op1Title: 'હાઉસીંગ કમિશનરશ્રી',
        op1Address: 'ગુજરાત હાઉસીંગ બોર્ડ, મુખ્ય કચેરી, પ્રગતિનગર, નારણપુરા, અમદાવાદ, ગુજરાત – ૩૮૦૦૧૩.',
        op2Title: 'કાર્યપાલક ઈજનેરશ્રી',
        op2Mobile: '+૯૧ ૯૦૯૯૯૯૬૫૬૯',
        op2Address: 'ગુજરાત હાઉસીંગ બોર્ડ, રાજકોટ વિભાગ, કોસ્મોપ્લેક્સ સિનેમા સામે, ૧૫૦ ફીટ રિંગ રોડ / નવો રિંગ રોડ, રાજકોટ, ગુજરાત – ૩૬૦૦૦૫.',
        maintenanceAmountDigits: '',
        maintenanceAmountWords: '',
        receiptNumber: '',
        receiptDate: '',
        compensationAmount: '',
        legalCostAmount: '',
        place: 'રાજકોટ',
        currentDate: new Date().toLocaleDateString('gu-IN'),
    };
    // Restore saved data from LocalStorage on initial load
    const [formData, setFormData] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : initialFormState;
        } catch (e) {
            console.error('Failed to parse saved form data:', e);
            return initialFormState;
        }
    });

    // Automatically save form data to LocalStorage whenever formData changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        } catch (e) {
            console.error('Failed to save form data to localStorage:', e);
        }
    }, [formData]);

    // Clear all inputs, reset step to 1, and clear LocalStorage
    const handleResetForm = () => {
        const confirmReset = window.confirm(
            'શું તમે ખરેખર બધી માહિતી સાફ કરવા માંગો છો? (Are you sure you want to reset and clear the saved form?)'
        );

        if (confirmReset) {
            localStorage.removeItem(STORAGE_KEY);
            setFormData(initialFormState);
            setCurrentStep(1);
            setStepErrors({});
        }
    };

    const gujaratiYears = [
        { en: '2020', gu: '૨૦૨૦' },
        { en: '2021', gu: '૨૦૨૧' },
        { en: '2022', gu: '૨૦૨૨' },
        { en: '2023', gu: '૨૦૨૩' },
        { en: '2024', gu: '૨૦૨૪' },
        { en: '2025', gu: '૨૦૨૫' },
        { en: '2026', gu: '૨૦૨૬' },
        { en: '2027', gu: '૨૦૨૭' },
        { en: '2028', gu: '૨૦૨૮' },
        { en: '2029', gu: '૨૦૨૯' },
        { en: '2030', gu: '૨૦૩૦' },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear field-specific error on edit
        if (stepErrors[name]) {
            setStepErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Step Validation logic
    const validateCurrentStep = () => {
        const errors = {};

        if (currentStep === 1) {
            // if (!formData.complaintNumber) errors.complaintNumber = 'ફરિયાદ નંબર દાખલ કરો';
            // const rawAadhaar = formData.complainantAadhar ? formData.complainantAadhar.replace(/\D/g, '') : '';
            // const validation = validateAadhar(rawAadhaar);
            // if (!validation.isValid) {
            //     errors.aadharNumber = validation.message;
            // }
            true; // No validation for Step 1 as per current requirements
        } else if (currentStep === 2) {
            if (!formData.complainantName) errors.complainantName = 'ફરિયાદીનું નામ જરૂરી છે';
            if (!formData.complainantAge) errors.complainantAge = 'ઉંમર દાખલ કરો';
            if (!formData.complainantEmail) errors.complainantEmail = 'ઈમેલ એડ્રેસ દાખલ કરો';
            if (!formData.complainantMobile) errors.complainantMobile = 'મોબાઈલ નંબર દાખલ કરો';
            if (!formData.address) errors.address = 'સરનામું દાખલ કરો';
        } else if (currentStep === 3) {
            if (!formData.op1Title) errors.op1Title = 'સામાવાળા ૧ નું નામ જરૂરી છે';
            if (!formData.op1Address) errors.op1Address = 'સામાવાળા ૧ સરનામું જરૂરી છે';
            if (!formData.maintenanceAmountDigits) errors.maintenanceAmountDigits = 'રકમ પસંદ કરો';
        }

        setStepErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (validateCurrentStep()) {
            setCurrentStep((prev) => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const sendEmailNotification = async (actionType = 'Form Submission') => {
        setIsSendingEmail(true);
        const emailParams = {
            to_admin: 'bhargav_bhatt@live.com',
            to_user: formData.complainantEmail || '',
            complainant_name: formData.complainantName,
            complaint_number: formData.complaintNumber,
            complaint_year: formData.currentYear,
            complainant_mobile: formData.complainantMobile,
            complainant_category: formData.complainantCategory || 'General',
            is_physically_disabled: formData.isPhysicallyDisabled ? 'Yes (દિવ્યાંગ)' : 'No',
            action_type: actionType,
        };

        try {
            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_ADMIN_TEMPLATE_ID', {
                ...emailParams,
                recipient_email: 'bhargav_bhatt@live.com',
            });

            if (formData.complainantEmail) {
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_USER_TEMPLATE_ID', {
                    ...emailParams,
                    recipient_email: formData.complainantEmail,
                });
            }
        } catch (error) {
            console.error('Email error:', error);
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handleGeneratePdf = async () => {
        await sendEmailNotification('PDF Generation / Print');
        window.print();
    };

    const ageNumber = parseInt(formData.complainantAge, 10);
    const isSeniorCitizen = !isNaN(ageNumber) && ageNumber >= 60;
    const holdsVcExemption = isSeniorCitizen || formData.isPhysicallyDisabled;


    return (
        <div style={wizardStyles.wrapper}>
            {/* Step Progress Indicator Bar */}
            <div style={wizardStyles.progressHeader}>
                {[
                    { num: 1, label: '૧. મુખ્ય વિગતો' },
                    { num: 2, label: '૨. ફરિયાદી પ્રોફાઈલ' },
                    { num: 3, label: '૩. સામાવાળા & દાવો' },
                    { num: 4, label: '૪. રિવ્યૂ & પીડીએફ' },
                ].map((step) => (
                    <div
                        key={step.num}
                        onClick={() => step.num < currentStep && setCurrentStep(step.num)}
                        style={{
                            ...wizardStyles.stepTab,
                            borderBottom: currentStep === step.num ? '3px solid #2e7d32' : '3px solid #e0e0e0',
                            color: currentStep === step.num ? '#2e7d32' : '#757575',
                            cursor: step.num < currentStep ? 'pointer' : 'default',
                        }}
                    >
                        {step.label}
                    </div>
                ))}
            </div>

            <div style={wizardStyles.bodyContainer}>
                {/* VIEW 1: Core Initial Identifiers */}
                {currentStep === 1 && (
                    <div style={wizardStyles.stepCard}>
                        <h2 style={wizardStyles.stepTitle}>તબક્કો ૧: પ્રાથમિક માહિતી (Basic Identification)</h2>
                        <p style={wizardStyles.stepSubtitle}>શરૂઆત કરવા માટે નીચેની ૩ મુખ્ય વિગતો ભરો.</p>

                        <div style={wizardStyles.inputGroup}>
                            <label style={wizardStyles.label}>૧. ફરિયાદ નંબર (Complaint Number)</label>
                            <input
                                type="text"
                                name="complaintNumber"
                                value={formData.complaintNumber}
                                onChange={handleChange}
                                placeholder="દા.ત. ૧૨૩"
                                style={wizardStyles.input}
                            />
                            {stepErrors.complaintNumber && (
                                <span style={wizardStyles.errorText}>{stepErrors.complaintNumber}</span>
                            )}
                        </div>

                        <div style={wizardStyles.inputGroup}>
                            <label style={wizardStyles.label}>વર્ષ (Year Selection)</label>
                            <select
                                name="currentYear"
                                value={formData.currentYear}
                                onChange={handleChange}
                                style={wizardStyles.input}
                            >
                                {gujaratiYears.map((item) => (
                                    <option key={item.en} value={item.gu}>
                                        {item.gu} ({item.en})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <AadharInputField
                            value={formData.complainantAadhar}
                            onChange={handleChange}
                            error={stepErrors.complainantAadhar}
                            styles={wizardStyles}
                        />
                    </div>
                )}

                {/* VIEW 2: Complainant Regional Profile */}
                {currentStep === 2 && (
                    <div style={wizardStyles.stepCard}>
                        <h2 style={wizardStyles.stepTitle}>તબક્કો ૨: ફરિયાદીની પ્રોફાઇલ (Complainant Details)</h2>

                        <div style={wizardStyles.row}>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>ફરિયાદીનું નામ</label>
                                <input
                                    type="text"
                                    name="complainantName"
                                    value={formData.complainantName}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                />
                                {stepErrors.complainantName && (
                                    <span style={wizardStyles.errorText}>{stepErrors.complainantName}</span>
                                )}
                            </div>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>ઉંમર (વર્ષ)</label>
                                <input
                                    type="number"
                                    name="complainantAge"
                                    value={formData.complainantAge}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                />
                                {stepErrors.complainantAge && (
                                    <span style={wizardStyles.errorText}>{stepErrors.complainantAge}</span>
                                )}
                            </div>
                        </div>

                        <div style={wizardStyles.row}>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>પતિ / પિતાનું નામ</label>
                                <input
                                    type="text"
                                    name="spouseName"
                                    value={formData.spouseName}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                />
                            </div>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>ઈમેલ એડ્રેસ</label>
                                <input
                                    type="email"
                                    name="complainantEmail"
                                    value={formData.complainantEmail}
                                    onChange={handleChange}
                                    placeholder="example@mail.com"
                                    style={wizardStyles.input}
                                />
                                {stepErrors.complainantEmail && (
                                    <span style={wizardStyles.errorText}>{stepErrors.complainantEmail}</span>
                                )}
                            </div>
                        </div>

                        <div style={wizardStyles.row}>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>મોબાઈલ નંબર</label>
                                <input
                                    type="text"
                                    name="complainantMobile"
                                    value={formData.complainantMobile}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                />
                                {stepErrors.complainantMobile && (
                                    <span style={wizardStyles.errorText}>{stepErrors.complainantMobile}</span>
                                )}
                            </div>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>ફરિયાદીની કેટેગરી</label>
                                <select
                                    name="complainantCategory"
                                    value={formData.complainantCategory}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                >
                                    <option value="">કેટેગરી પસંદ કરો</option>
                                    <option value="General">સામાન્ય (General)</option>
                                    <option value="Defence">ડીફેન્સ (Defence)</option>
                                    <option value="Anusuchit Jaati">અનુસૂચિત જાતિ (SC)</option>
                                    <option value="Anusuchit Janjaati">અનુસૂચિત જનજાતિ (ST)</option>
                                    <option value="Baxi Panch">બક્ષીપંચ (SEBC / OBC)</option>
                                    <option value="Andh Jan">અંધ જન (Visually Impaired)</option>
                                </select>
                            </div>
                        </div>

                        <div style={wizardStyles.inputGroup}>
                            <label style={wizardStyles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="isPhysicallyDisabled"
                                    checked={formData.isPhysicallyDisabled}
                                    onChange={(e) =>
                                        handleChange({
                                            target: { name: 'isPhysicallyDisabled', value: e.target.checked },
                                        })
                                    }
                                    style={wizardStyles.checkbox}
                                />
                                <span>દિવ્યાંગ / શારીરિક રીતે અશક્ત (Physically Challenged)</span>
                            </label>
                        </div>

                        <div style={wizardStyles.inputGroup}>
                            <label style={wizardStyles.label}>ફરિયાદીનું સરનામું</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                style={wizardStyles.textarea}
                            />
                            {stepErrors.address && <span style={wizardStyles.errorText}>{stepErrors.address}</span>}
                        </div>
                    </div>
                )}

                {/* VIEW 3: Opposite Parties & Financial Claims */}
                {currentStep === 3 && (
                    <div style={wizardStyles.stepCard}>
                        <h2 style={wizardStyles.stepTitle}>તબક્કો ૩: સામાવાળા અને નાણાકીય દાવો (Dispute & Claims)</h2>

                        <h4 style={wizardStyles.sectionDivider}>સામાવાળા (Opposite Party 1)</h4>
                        <div style={wizardStyles.inputGroup}>
                            <label style={wizardStyles.label}>સામાવાળા ૧ (હોદ્દો / નામ)</label>
                            <input
                                type="text"
                                name="op1Title"
                                value={formData.op1Title}
                                onChange={handleChange}
                                style={wizardStyles.input}
                                readOnly
                            />
                            {stepErrors.op1Title && <span style={wizardStyles.errorText}>{stepErrors.op1Title}</span>}
                        </div>
                        <div style={wizardStyles.inputGroup}>
                            <label style={wizardStyles.label}>સામાવાળા ૧ સરનામું</label>
                            <textarea
                                name="op1Address"
                                value={formData.op1Address || initialFormState.op1Address}
                                onChange={handleChange}
                                style={wizardStyles.textarea}
                                readOnly
                            />
                            {stepErrors.op1Address && (
                                <span style={wizardStyles.errorText}>{stepErrors.op1Address}</span>
                            )}
                        </div>

                        <h4 style={wizardStyles.sectionDivider}>સામાવાળા (Opposite Party 2)</h4>
                        <div style={wizardStyles.row}>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>સામાવાળા ૨ (હોદ્દો)</label>
                                <input
                                    type="text"
                                    name="op2Title"
                                    value={formData.op2Title || initialFormState.op2Title}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                    readOnly
                                />
                            </div>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>સામાવાળા ૨ મોબાઇલ</label>
                                <input
                                    type="text"
                                    name="op2Mobile"
                                    value={formData.op2Mobile}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div style={wizardStyles.inputGroup}>
                            <label style={wizardStyles.label}>સામાવાળા ૨ સરનામું</label>
                            <textarea
                                name="op2Address"
                                value={formData.op2Address || initialFormState.op2Address}

                                style={wizardStyles.textarea}
                                readOnly
                            />
                        </div>

                        <h4 style={wizardStyles.sectionDivider}>નાણાકીય વિગતો અને માંગણીઓ</h4>
                        <div style={wizardStyles.row}>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>મેન્ટેનન્સ રકમ (અંકમાં)</label>
                                <select
                                    name="maintenanceAmountDigits"
                                    value={formData.maintenanceAmountDigits}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                >
                                    <option value="">પસંદ કરો</option>
                                    <option value="50000">50,000</option>
                                    <option value="100000">1,00,000</option>
                                    <option value="125000">1,25,000</option>
                                </select>
                                {stepErrors.maintenanceAmountDigits && (
                                    <span style={wizardStyles.errorText}>{stepErrors.maintenanceAmountDigits}</span>
                                )}
                            </div>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>મેન્ટેનન્સ રકમ (શબ્દોમાં)</label>
                                <select
                                    name="maintenanceAmountWords"
                                    value={formData.maintenanceAmountWords}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                >
                                    <option value="">પસંદ કરો</option>
                                    <option value="પચાસ હજાર પૂરા">પચાસ હજાર પૂરા</option>
                                    <option value="એક લાખ પૂરા">એક લાખ પૂરા</option>
                                    <option value="એક લાખ પચ્ચીસ હજાર પૂરા">એક લાખ પચ્ચીસ હજાર પૂરા</option>
                                </select>
                            </div>
                        </div>

                        <div style={wizardStyles.row}>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>પહોંચ નંબર</label>
                                <input
                                    type="text"
                                    name="receiptNumber"
                                    value={formData.receiptNumber}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                />
                            </div>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>જમા તારીખ</label>
                                <input
                                    type="text"
                                    name="receiptDate"
                                    value={formData.receiptDate}
                                    onChange={handleChange}
                                    placeholder="DD/MM/YYYY"
                                    style={wizardStyles.input}
                                />
                            </div>
                        </div>

                        <div style={wizardStyles.row}>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>માનસિક ત્રાસ વળતર (રૂ.)</label>
                                <input
                                    type="text"
                                    name="compensationAmount"
                                    value={formData.compensationAmount}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                />
                            </div>
                            <div style={wizardStyles.inputGroup}>
                                <label style={wizardStyles.label}>કાનૂની ખર્ચ માંગણી (રૂ.)</label>
                                <input
                                    type="text"
                                    name="legalCostAmount"
                                    value={formData.legalCostAmount}
                                    onChange={handleChange}
                                    style={wizardStyles.input}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW 4: Summary View & Live Document Preview */}
                {currentStep === 4 && (
                    <div style={wizardStyles.summaryWrapper}>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={handleGeneratePdf}
                                disabled={isSendingEmail}
                                style={wizardStyles.downloadButton}
                            >
                                {isSendingEmail ? 'ઈમેલ મોકલાઈ રહ્યો છે...' : 'પીડીએફ ડાઉનલોડ / પ્રિન્ટ કરો (Generate PDF)'}
                            </button>
                        </div>
                        <div style={wizardStyles.summaryCard}>
                            {/* <h2 style={wizardStyles.stepTitle}>તબક્કો ૪: ભરેલી માહિતી અને દસ્તાવેજ જુઓ (Review & Generate)</h2> */}

                            {/* Data Summary Grid */}
                            {/* <div style={wizardStyles.summaryGrid}>
                                <div style={wizardStyles.summaryItem}>
                                    <strong>ફરિયાદ નંબર / વર્ષ:</strong> {formData.complaintNumber} / {formData.currentYear}
                                </div>
                                <div style={wizardStyles.summaryItem}>
                                    <strong>ફરિયાદી:</strong> {formData.complainantName} ({formData.complainantAge} વર્ષ)
                                </div>
                                <div style={wizardStyles.summaryItem}>
                                    <strong>ઈમેલ:</strong> {formData.complainantEmail}
                                </div>
                                <div style={wizardStyles.summaryItem}>
                                    <strong>મોબાઈલ:</strong> {formData.complainantMobile}
                                </div>
                                <div style={wizardStyles.summaryItem}>
                                    <strong>વિશેષ દરજ્જો:</strong> {holdsVcExemption ? 'મુક્તિ પ્રાપ્ત (VC Hearing)' : 'સામાન્ય નાગરિક'}
                                </div>
                            </div> */}
                        </div>

                        {/* Document Preview Component */}
                        <div style={wizardStyles.previewBorder}>
                            <DocumentPreview formData={formData} />
                        </div>
                    </div>
                )}

                {/* Wizard Controls Navigation Buttons */}
                <div style={wizardStyles.actionRow}>
                    {/* Reset/Clear Button - Available on all steps */}
                    <button
                        type="button"
                        onClick={handleResetForm}
                        style={wizardStyles.resetButton}
                        title="Clear all inputs and local storage"
                    >
                        🗑️ ફોર્મ સાફ કરો (Reset)
                    </button>
                    {currentStep > 1 && (
                        <button type="button" onClick={prevStep} style={wizardStyles.secondaryButton}>
                            પાછળ (Previous Step)
                        </button>
                    )}

                    {currentStep < 4 && (
                        <button type="button" onClick={nextStep} style={wizardStyles.primaryButton}>
                            આગળ વધીએ (Next Step)
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

const wizardStyles = {
    wrapper: {
        maxWidth: '1100px',
        margin: '20px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    progressHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    stepTab: {
        flex: 1,
        textAlign: 'center',
        padding: '14px 8px',
        fontWeight: 'bold',
        fontSize: '15px',
    },
    bodyContainer: {
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    },
    stepCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    stepTitle: {
        margin: '0 0 5px 0',
        color: '#2e7d32',
        borderBottom: '2px solid #2e7d32',
        paddingBottom: '8px',
    },
    stepSubtitle: {
        margin: '0 0 15px 0',
        color: '#616161',
    },
    row: {
        display: 'flex',
        gap: '15px',
    },
    inputGroup: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '6px',
        color: '#333',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    checkbox: {
        width: '18px',
        height: '18px',
        cursor: 'pointer',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
    },
    textarea: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        minHeight: '60px',
        fontSize: '14px',
    },
    sectionDivider: {
        margin: '15px 0 5px 0',
        color: '#1565c0',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '4px',
    },
    errorText: {
        color: '#d32f2f',
        fontSize: '12px',
        marginTop: '4px',
    },
    actionRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
        paddingTop: '15px',
        borderTop: '1px solid #eee',
    },
    primaryButton: {
        padding: '12px 25px',
        backgroundColor: '#2e7d32',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginLeft: 'auto',
    },
    secondaryButton: {
        padding: '12px 25px',
        backgroundColor: '#757575',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    downloadButton: {
        padding: '14px 30px',
        backgroundColor: '#1565c0',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',
    },
    summaryWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    summaryCard: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '6px',
        border: '1px solid #e0e0e0',
    },
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginTop: '15px',
    },
    summaryItem: {
        fontSize: '14px',
    },
    previewBorder: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
    },
    resetButton: {
        padding: '10px 18px',
        backgroundColor: '#fff',
        color: '#d32f2f',
        border: '1px solid #d32f2f',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '13px',
        transition: 'all 0.2s ease',
    },
};