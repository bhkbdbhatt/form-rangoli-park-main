// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

app.post('/api/send-complaint-email', async (req, res) => {
    const { formData, actionType } = req.body;

    const recipients = ['bhargav_bhatt@live.com'];
    if (formData.complainantEmail) {
        recipients.push(formData.complainantEmail);
    }

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: recipients.join(','),
        subject: `Consumer Forum Complaint: ${formData.complainantName} (${formData.currentYear}) - ${actionType}`,
        html: `
      <h2>ગ્રાહક ફરિયાદ ફોર્મ વિગતો (${actionType})</h2>
      <p><strong>ફરિયાદીનું નામ:</strong> ${formData.complainantName}</p>
      <p><strong>ફરિયાદ નંબર / વર્ષ:</strong> ${formData.complaintNumber} / ${formData.currentYear}</p>
      <p><strong>ઈમેલ:</strong> ${formData.complainantEmail}</p>
      <p><strong>મોબાઈલ:</strong> ${formData.complainantMobile}</p>
      <p><strong>કેટેગરી:</strong> ${formData.complainantCategory || 'General'}</p>
      <p><strong>દિવ્યાંગ / શારીરિક અશક્ત:</strong> ${formData.isPhysicallyDisabled ? 'હા' : 'ના'}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));