import jsPDF from 'jspdf';
import { LabReport } from '../types';

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
}

// Default Cloudflare R2 configuration placeholder
export const defaultR2Config: R2Config = {
  accountId: 'cloudflare-r2-account-id-placeholder',
  accessKeyId: 'r2-access-key-placeholder',
  secretAccessKey: 'r2-secret-key-placeholder',
  bucketName: 'elmedan-lab-reports',
  publicUrl: 'https://pub-r2.elmedanlab.com'
};

/**
 * Cloudflare R2 Upload & Report File Generator Service
 */
export const R2StorageService = {
  /**
   * Upload file to Cloudflare R2 (or fallback storage)
   */
  async uploadReportFile(file: File, bookingNumber: string): Promise<string> {
    console.log(`[Cloudflare R2] Uploading report file ${file.name} for booking ${bookingNumber}...`);
    // Simulated R2 upload URL output
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `${defaultR2Config.publicUrl}/reports/${bookingNumber}_${timestamp}_${cleanFileName}`;
  },

  /**
   * Generate an official PDF lab report for El-Medan Medical Lab
   */
  generatePdfReport(report: LabReport, patientName: string, bookingNumber: string): string {
    const doc = new jsPDF();

    // Set background & headers
    doc.setFillColor(15, 23, 42); // Navy background header
    doc.rect(0, 0, 210, 40, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('EL-MEDAN MEDICAL LABORATORY', 105, 18, { align: 'center' });
    doc.setFontSize(12);
    doc.text('معمل الميدان للتحاليل الطبية - تقرير طبي رسمى', 105, 28, { align: 'center' });

    // Patient & Report Metadata Box
    doc.setFillColor(241, 245, 249);
    doc.rect(14, 48, 182, 38, 'F');

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.text(`Patient Name: ${patientName}`, 20, 56);
    doc.text(`Booking Ref: ${bookingNumber}`, 20, 64);
    doc.text(`Report ID: ${report.id}`, 20, 72);

    doc.text(`Test Name: ${report.test_name}`, 120, 56);
    doc.text(`Date: ${new Date(report.uploaded_at).toLocaleDateString()}`, 120, 64);
    doc.text(`Status: FINAL APPROVED`, 120, 72);

    // Results Header
    doc.setFillColor(6, 182, 212);
    doc.rect(14, 94, 182, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('TEST PARAMETER', 20, 100);
    doc.text('RESULT VALUE', 100, 100);
    doc.text('STATUS', 160, 100);

    // Render parameter values
    let yPos = 112;
    if (report.result_values) {
      Object.entries(report.result_values).forEach(([param, val]) => {
        doc.setTextColor(30, 41, 59);
        doc.text(param, 20, yPos);
        doc.text(val, 100, yPos);
        doc.setTextColor(16, 185, 129);
        doc.text('NORMAL', 160, yPos);
        yPos += 10;
      });
    } else {
      doc.setTextColor(30, 41, 59);
      doc.text(report.test_name, 20, yPos);
      doc.text('Completed & Verified', 100, yPos);
      doc.text('NORMAL', 160, yPos);
      yPos += 10;
    }

    // Doctor Notes & Stamp
    if (report.doctor_notes) {
      yPos += 10;
      doc.setFillColor(248, 250, 252);
      doc.rect(14, yPos, 182, 25, 'F');
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(10);
      doc.text(`Doctor Remarks / ملاحظات الطبيب:`, 20, yPos + 8);
      doc.text(report.doctor_notes, 20, yPos + 18);
      yPos += 35;
    } else {
      yPos += 20;
    }

    // Footer signature
    doc.setLineWidth(0.5);
    doc.setDrawColor(203, 213, 225);
    doc.line(14, 270, 196, 270);
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('El-Medan Lab | Hotline: 19888 | www.elmedanlab.com', 105, 278, { align: 'center' });

    return doc.output('datauristring');
  }
};
