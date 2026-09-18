import React from 'react';

export default function FormFields({ formData, handleChange, styles }) {
  return (
    <>
      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>ફરિયાદ નંબર</label>
          <input type="text" name="complaintNumber" value={formData.complaintNumber} onChange={handleChange} placeholder="દા.ત. ૧૨૩" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>વર્ષ</label>
          <input type="text" name="currentYear" value={formData.currentYear} onChange={handleChange} style={styles.input} />
        </div>
      </div>

      <h3 style={styles.sectionDividerHeader}>Regional Complainant Profile</h3>
      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>ફરિયાદીનું નામ</label>
          <input type="text" name="complainantName" value={formData.complainantName} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>ઉંમર (વર્ષ)</label>
          <input type="text" name="complainantAge" value={formData.complainantAge} onChange={handleChange} required style={styles.input} />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>પતિ / પિતાનું નામ</label>
          <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>મોબાઈલ નંબર</label>
          <input type="text" name="complainantMobile" value={formData.complainantMobile} onChange={handleChange} required style={styles.input} />
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>ફરિયાદીનું સરનામું</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required style={styles.textarea} />
      </div>

      <h3 style={styles.sectionDividerHeader}>Opposite Parties (OPs) Settings</h3>
      <div style={styles.inputGroup}>
        <label style={styles.label}>સામાવાળા ૧ (હોદ્દો)</label>
        <input type="text" name="op1Title" value={formData.op1Title} onChange={handleChange} required style={styles.input} />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>સામાવાળા ૧ સરનામું</label>
        <textarea name="op1Address" value={formData.op1Address} onChange={handleChange} required style={styles.textarea} />
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>સામાવાળા ૨ (હોદ્દો)</label>
          <input type="text" name="op2Title" value={formData.op2Title} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>સામાવાળા ૨ મોબાઇલ</label>
          <input type="text" name="op2Mobile" value={formData.op2Mobile} onChange={handleChange} style={styles.input} />
        </div>
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>સામાવાળા ૨ સરનામું</label>
        <textarea name="op2Address" value={formData.op2Address} onChange={handleChange} required style={styles.textarea} />
      </div>

      <h3 style={styles.sectionDividerHeader}>Financial Statement Adjustments</h3>
      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>મેન્ટેનન્સ રકમ (અંકમાં)</label>
          <input type="text" name="maintenanceAmountDigits" value={formData.maintenanceAmountDigits} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>મેન્ટેનન્સ રકમ (શબ્દોમાં)</label>
          <input type="text" name="maintenanceAmountWords" value={formData.maintenanceAmountWords} onChange={handleChange} required style={styles.input} />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>પહોંચ નંબર</label>
          <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>જમા તારીખ</label>
          <input type="text" name="receiptDate" value={formData.receiptDate} onChange={handleChange} required style={styles.input} />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>માનસિક ત્રાસ વળતર</label>
          <input type="text" name="compensationAmount" value={formData.compensationAmount} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>કાનૂની ખર્ચ માંગણી</label>
          <input type="text" name="legalCostAmount" value={formData.legalCostAmount} onChange={handleChange} required style={styles.input} />
        </div>
      </div>
    </>
  );
}
