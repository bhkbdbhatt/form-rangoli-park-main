import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import FormFields from './components/FormFields';
import RichTextEditor from './components/RichTextEditor';
import DocumentPreview from './components/DocumentPreview';

export default function App() {
  const [formData, setFormData] = useState({
    complaintNumber: '',
    complainantName: '',
    complainantAge: '',
    spouseName: '',
    address: '',
    complainantMobile: '',
    op1Title: 'હાઉસીંગ કમિશનરશ્રી',
    op1Address: 'ગુજરાત હાઉસીંગ બોર્ડ, મુખ્ય કચેરી, પ્રગતિનગર, નારણપુરા, અમદાવાદ, ગુજરાત – ૩૮૦૦૧૩.',
    op2Title: 'કાર્યપાલક ઈજનેરશ્રી',
    op2Address: 'ગુજરાત હાઉસીંગ બોર્ડ, રાજકોટ વિભાગ, FNF રેસ્ટોરન્ટ પાસે, કટારીયા મોટર્સ પાછળ, ૧૫૦ ફીટ રિંગ રોડ / નવો રિંગ રોડ, રાજકોટ, ગુજરાત – ૩૬૦૦૦૫.',
    op2Mobile: '',
    maintenanceAmountDigits: '',
    maintenanceAmountWords: '',
    receiptNumber: '',
    receiptDate: '',
    compensationAmount: '૧,૦૦,૦૦૦',
    legalCostAmount: '૨૫,૦૦૦',
    place: 'રાજકોટ',
    currentYear: '૨૦૨૬',
    currentDate: ''
  });

  const [notesHtml, setNotesHtml] = useState('વાર્ષિક વ્યાજ સાથે ટ્રાન્સફર મેળવવા તેમજ સેવામાં ગંભીર ખામી સબબ યોગ્ય વળતર અપાવવા વિનંતી છે.');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadPDF = (e) => {
    e.preventDefault();
    const element = document.getElementById('legal-document-blueprint');
    const options = {
      margin: 0.75,
      filename: `Consumer_Complaint_${formData.complainantName || 'Draft'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.formColumn}>
        <h2 style={styles.title}>ગ્રાહક ફરિયાદ દસ્તાવેજ જનરેટર</h2>
        <p style={styles.subtitle}>નીચેના ફોર્મમાં વિગતો ભરો જે દસ્તાવેજમાં આપમેળે ગોઠવાઈ જશે.</p>
        
        <form onSubmit={handleDownloadPDF} style={styles.form}>
          <FormFields formData={formData} handleChange={handleChange} styles={styles} />
          <RichTextEditor notesHtml={notesHtml} setNotesHtml={setNotesHtml} styles={styles} />
          
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>સ્થળ</label>
              <input type="text" name="place" value={formData.place} onChange={handleChange} required style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>તારીખ</label>
              <input type="text" name="currentDate" value={formData.currentDate} onChange={handleChange} style={styles.input} />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            દસ્તાવેજ ડાઉનલોડ કરો (PDF)
          </button>
        </form>
      </div>

      <div style={styles.previewColumn}>
        <h3 style={styles.previewHeader}>Live Visual Document Preview</h3>
        <div style={styles.paperShadow}>
          <DocumentPreview formData={formData} notesHtml={notesHtml} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  appContainer: { display: 'flex', minHeight: '100vh', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f4f6f9', color: '#333' },
  formColumn: { flex: '1', padding: '30px', maxWidth: '500px', backgroundColor: '#ffffff', boxShadow: '2px 0 10px rgba(0,0,0,0.05)', overflowY: 'auto' },
  title: { margin: '0 0 5px 0', fontSize: '22px', color: '#1a202c' },
  subtitle: { margin: '0 0 20px 0', fontSize: '13px', color: '#718096', lineHeight: '1.4' },
  sectionDividerHeader: { fontSize: '14px', color: '#2b6cb0', borderBottom: '1px solid #e2e8f0', paddingBottom: '5px', marginTop: '15px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  row: { display: 'flex', gap: '12px' },
  inputGroup: { flex: '1', display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#4a5568' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0', fontSize: '13px', outline: 'none' },
  textarea: { padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0', fontSize: '13px', minHeight: '60px', resize: 'vertical', fontFamily: 'inherit' },
  editorToolbar: { display: 'flex', gap: '5px', padding: '5px', backgroundColor: '#f7fafc', border: '1px solid #cbd5e0', borderBottom: 'none', borderRadius: '4px 4px 0 0' },
  toolbarBtn: { padding: '4px 8px', fontSize: '12px', cursor: 'pointer', border: '1px solid #cbd5e0', backgroundColor: '#fff', borderRadius: '3px' },
  richEditor: { minHeight: '100px', padding: '10px', border: '1px solid #cbd5e0', borderRadius: '0 0 4px 4px', backgroundColor: '#fff', fontSize: '13px', outline: 'none', overflowY: 'auto' },
  button: { marginTop: '15px', padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' },
  previewColumn: { flex: '1.5', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', backgroundColor: '#e2e8f0' },
  previewHeader: { alignSelf: 'flex-start', margin: '0 0 15px 5%', fontSize: '16px', color: '#4a5568' },
  paperShadow: { width: '90%', maxWidth: '750px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '4px' }
};