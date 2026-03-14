const PDFDocument = require('pdfkit');

const generatePrescriptionPDF = async (prescription) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];

      doc.on('data', (data) => buffers.push(data));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // ✅ SAFE DATA EXTRACTION WITH FALLBACKS
      const doctorName = prescription?.doctorId?.userId 
        ? `Dr. ${prescription.doctorId.userId.firstName || ''} ${prescription.doctorId.userId.lastName || ''}`.trim()
        : 'Doctor Name';

      const doctorSpecialty = prescription?.doctorId?.specialization || 'General Practitioner';
      const doctorPhone = prescription?.doctorId?.userId?.phone || 'N/A';
      const doctorEmail = prescription?.doctorId?.userId?.email || 'N/A';

      const patientName = prescription?.patientId?.userId
        ? `${prescription.patientId.userId.firstName || ''} ${prescription.patientId.userId.lastName || ''}`.trim()
        : 'Patient Name';

      const patientEmail = prescription?.patientId?.userId?.email || 'N/A';
      const patientPhone = prescription?.patientId?.userId?.phone || 'N/A';

      const diagnosis = prescription?.diagnosis || 'Not specified';
      const instructions = prescription?.instructions || 'Follow doctor\'s advice';
      const issuedDate = prescription?.issuedDate 
        ? new Date(prescription.issuedDate).toLocaleDateString('en-IN')
        : new Date().toLocaleDateString('en-IN');
      const followUpDate = prescription?.followUpDate
        ? new Date(prescription.followUpDate).toLocaleDateString('en-IN')
        : 'As advised';

      // Header
      doc.fontSize(20).font('Helvetica-Bold').text('HealNow Healthcare', 50, 40);
      doc.fontSize(10).font('Helvetica').text('Professional Medical Prescription', 50, 65);
      doc.moveTo(50, 80).lineTo(550, 80).stroke();

      // Prescription Date
      doc.fontSize(9).text(`Prescription ID: ${prescription._id}`, 50, 95);
      doc.text(`Date Issued: ${issuedDate}`, 50, 110);

      // Doctor Information
      doc.fontSize(11).font('Helvetica-Bold').text('Prescribing Doctor', 50, 135);
      doc.fontSize(10).font('Helvetica');
      doc.text(`Name: ${doctorName}`, 50, 155);
      doc.text(`Specialization: ${doctorSpecialty}`, 50, 172);
      doc.text(`Phone: ${doctorPhone}`, 50, 189);
      doc.text(`Email: ${doctorEmail}`, 50, 206);

      doc.moveTo(50, 220).lineTo(550, 220).stroke();

      // Patient Information
      doc.fontSize(11).font('Helvetica-Bold').text('Patient Information', 50, 240);
      doc.fontSize(10).font('Helvetica');
      doc.text(`Name: ${patientName}`, 50, 260);
      doc.text(`Email: ${patientEmail}`, 50, 277);
      doc.text(`Phone: ${patientPhone}`, 50, 294);

      doc.moveTo(50, 310).lineTo(550, 310).stroke();

      // Diagnosis
      doc.fontSize(11).font('Helvetica-Bold').text('Diagnosis', 50, 330);
      doc.fontSize(10).font('Helvetica').text(diagnosis, 50, 350, { width: 450 });

      // Medicines Table
      doc.fontSize(11).font('Helvetica-Bold').text('Prescribed Medicines', 50, 400);

      const tableTop = 425;
      const col1 = 50;
      const col2 = 180;
      const col3 = 300;
      const col4 = 420;

      // Table Headers
      doc.fontSize(9).font('Helvetica-Bold');
      doc.fillColor('#1a6b63').rect(col1 - 10, tableTop - 15, 450, 20).fill();
      doc.fillColor('white');
      doc.text('Medicine', col1, tableTop - 10);
      doc.text('Dosage', col2, tableTop - 10);
      doc.text('Frequency', col3, tableTop - 10);
      doc.text('Duration', col4, tableTop - 10);

      // Table Data
      doc.font('Helvetica').fillColor('black');
      let yPosition = tableTop + 10;

      if (prescription?.medicines && Array.isArray(prescription.medicines)) {
        prescription.medicines.forEach((medicine, index) => {
          const medName = medicine?.name || 'N/A';
          const medDosage = medicine?.dosage || 'N/A';
          const medFrequency = medicine?.frequency || 'N/A';
          const medDuration = medicine?.duration || 'N/A';

          // Alternate row colors
          if (index % 2 === 0) {
            doc.fillColor('#f5f5f5').rect(col1 - 10, yPosition - 5, 450, 20).fill();
          }

          doc.fillColor('black').fontSize(9);
          doc.text(medName, col1, yPosition);
          doc.text(medDosage, col2, yPosition);
          doc.text(medFrequency, col3, yPosition);
          doc.text(medDuration, col4, yPosition);

          yPosition += 25;
        });
      } else {
        doc.text('No medicines prescribed', col1, yPosition);
        yPosition += 25;
      }

      yPosition += 10;

      // Instructions
      doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
      doc.fontSize(11).font('Helvetica-Bold').text('Instructions', 50, yPosition + 15);
      doc.fontSize(10).font('Helvetica').text(instructions, 50, yPosition + 35, { width: 450 });

      yPosition += 70;

      // Follow-up
      doc.fontSize(11).font('Helvetica-Bold').text('Follow-up Date', 50, yPosition);
      doc.fontSize(10).font('Helvetica').text(followUpDate, 50, yPosition + 20);

      // Footer
      doc.moveTo(50, 730).lineTo(550, 730).stroke();
      doc.fontSize(8).font('Helvetica').fillColor('#999');
      doc.text('This is an electronically generated prescription from HealNow Healthcare.', 50, 745);
      doc.text('Please consult your doctor if you have any questions.', 50, 758);

      doc.end();
    } catch (error) {
      console.error('[PDF Generation] Error:', error.message);
      reject(error);
    }
  });
};

module.exports = { generatePrescriptionPDF };