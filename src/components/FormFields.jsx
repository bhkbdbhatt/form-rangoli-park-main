import React from 'react';

import AadharInputField from './AadharInputField';

export default function FormFields({ formData, handleChange, styles }) {
  const ageNumber = parseInt(formData.complainantAge, 10);
  const isSeniorCitizen = !isNaN(ageNumber) && ageNumber >= 60;
  const isPhysicallyDisabled = Boolean(formData.isPhysicallyDisabled);
  const holdsVcExemption = isSeniorCitizen || isPhysicallyDisabled;

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

  return (
    <>
      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>ફરિયાદ નંબર</label>
          <input
            type="text"
            name="complaintNumber"
            value={formData.complaintNumber}
            onChange={handleChange}
            placeholder="દા.ત. ૧૨૩"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>વર્ષ (Year Selection)</label>
          <select
            name="currentYear"
            value={formData.currentYear || '૨૦૨૬'}
            onChange={handleChange}
            style={styles.input}
          >
            {gujaratiYears.map((item) => (
              <option key={item.en} value={item.gu}>
                {item.gu} ({item.en})
              </option>
            ))}
          </select>
        </div>
      </div>

      <h3 style={styles.sectionDividerHeader}>Regional Complainant Profile</h3>
      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>ફરિયાદીનું નામ</label>
          <input
            type="text"
            name="complainantName"
            value={formData.complainantName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>ઉંમર (વર્ષ)</label>
          <input
            type="number"
            name="complainantAge"
            value={formData.complainantAge}
            onChange={handleChange}
            required
            style={styles.input}
            min="1"
            max="120"
          />
        </div>
        {/* <div style={styles.inputGroup}>
          <label style={styles.label}>આધાર કાર્ડ નંબર</label>
          <input
            type="number"
            name="complainantAadhar"
            value={formData.complainantAadhar || ''}
            onChange={handleChange}
            required
            style={styles.input}
            min="1"
            max="120"
          />
        </div> */}
      </div>

      {/* Complainant Email Field */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>ફરિયાદીનો ઈમેલ (Email Address)</label>
        <input
          type="email"
          name="complainantEmail"
          value={formData.complainantEmail || ''}
          onChange={handleChange}
          placeholder="example@domain.com"
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>ફરિયાદીની કેટેગરી (Category)</label>
        <select
          name="complainantCategory"
          value={formData.complainantCategory || ''}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">કેટેગરી પસંદ કરો (Select Category)</option>
          <option value="General">સામાન્ય (General)</option>
          <option value="Defence">ડીફેન્સ (Defence)</option>
          <option value="Anusuchit Jaati">અનુસૂચિત જાતિ (Anusuchit Jaati / SC)</option>
          <option value="Anusuchit Janjaati">અનુસૂચિત જનજાતિ (Anusuchit Janjaati / ST)</option>
          <option value="Baxi Panch">બક્ષીપંચ (Baxi Panch / SEBC / OBC)</option>
          <option value="Andh Jan">અંધ જન (Andh Jan / Visually Impaired)</option>
        </select>
      </div>

      <div style={styles.inputGroup}>
        <label
          style={{
            ...styles.label,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            name="isPhysicallyDisabled"
            checked={isPhysicallyDisabled}
            onChange={(e) =>
              handleChange({
                target: {
                  name: 'isPhysicallyDisabled',
                  value: e.target.checked,
                },
              })
            }
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <span>દિવ્યાંગ / શારીરિક રીતે અશક્ત (Physically Challenged / Disabled)</span>
        </label>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>દરજ્જો (Darrajjo Status)</label>
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            backgroundColor: holdsVcExemption ? '#e8f5e9' : '#f5f5f5',
            color: holdsVcExemption ? '#2e7d32' : '#616161',
            border: `1px solid ${holdsVcExemption ? '#a5d6a7' : '#e0e0e0'}`,
          }}
        >
          {holdsVcExemption ? (
            <>
              મુક્તિ પ્રાપ્ત (VC Hearing Allowed):{' '}
              {[
                isSeniorCitizen && 'સીનિયર સીટીઝન (Senior Citizen)',
                isPhysicallyDisabled && 'દિવ્યાંગ / શારીરિક અશક્ત (Physically Challenged)',
              ]
                .filter(Boolean)
                .join(' | ')}
            </>
          ) : (
            'સામાન્ય નાગરિક (General Category)'
          )}
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>પતિ / પિતાનું નામ</label>
          <input
            type="text"
            name="spouseName"
            value={formData.spouseName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <AadharInputField
            value={formData.complainantAadhar}
            onChange={handleChange}
            styles={styles}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>મોબાઈલ નંબર</label>
          <input
            type="text"
            name="complainantMobile"
            value={formData.complainantMobile}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>ફરિયાદીનું સરનામું</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
      </div>

      <h3 style={styles.sectionDividerHeader}>Opposite Parties (OPs) Settings</h3>
      <div style={styles.inputGroup}>
        <label style={styles.label}>સામાવાળા ૧ (હોદ્દો)</label>
        <input
          type="text"
          name="op1Title"
          value={formData.op1Title}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>સામાવાળા ૧ સરનામું</label>
        <textarea
          name="op1Address"
          value={formData.op1Address}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>સામાવાળા ૨ (હોદ્દો)</label>
          <input
            type="text"
            name="op2Title"
            value={formData.op2Title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>સામાવાળા ૨ મોબાઇલ</label>
          <input
            type="text"
            name="op2Mobile"
            value={formData.op2Mobile}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>સામાવાળા ૨ સરનામું</label>
        <textarea
          name="op2Address"
          value={formData.op2Address}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
      </div>

      <h3 style={styles.sectionDividerHeader}>Financial Statement Adjustments</h3>
      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>મેન્ટેનન્સ રકમ (અંકમાં)</label>
          <select
            name="maintenanceAmountDigits"
            value={formData.maintenanceAmountDigits}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">પસંદ કરો (Select)</option>
            <option value="50000">50,000</option>
            <option value="100000">1,00,000</option>
            <option value="125000">1,25,000</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>મેન્ટેનન્સ રકમ (શબ્દોમાં)</label>
          <select
            name="maintenanceAmountWords"
            value={formData.maintenanceAmountWords}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">પસંદ કરો (Select)</option>
            <option value="પચાસ હજાર પૂરા">પચાસ હજાર પૂરા</option>
            <option value="એક લાખ પૂરા">એક લાખ પૂરા</option>
            <option value="એક લાખ પચ્ચીસ હજાર પૂરા">એક લાખ પચ્ચીસ હજાર પૂરા</option>
          </select>
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>પહોંચ નંબર</label>
          <input
            type="text"
            name="receiptNumber"
            value={formData.receiptNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>જમા તારીખ</label>
          <input
            type="text"
            name="receiptDate"
            value={formData.receiptDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>માનસિક ત્રાસ વળતર</label>
          <input
            type="text"
            name="compensationAmount"
            value={formData.compensationAmount}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>કાનૂની ખર્ચ માંગણી</label>
          <input
            type="text"
            name="legalCostAmount"
            value={formData.legalCostAmount}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>
    </>
  );
}