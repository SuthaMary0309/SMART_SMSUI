import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportService } from '../../../Service/report-service';
import { EmailService } from '../../../Service/email-service';

Chart.register(...registerables);

@Component({
  selector: 'app-manage-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-reports.html',
  styleUrl: './manage-reports.css'
})
export class ManageReports implements OnInit {
  @ViewChild('reportChart') chartRef!: ElementRef<HTMLCanvasElement>;
  students: any[] = [];
  selectedStudentId = '';
  studentReport: any = null;
  chart: Chart | null = null;
  currentLang = 'en';
  isLoading = false;
  isSending = false;

  translations: any = {
    en: { title: 'Student Report', selectStudent: 'Select Student', loadReport: 'Load Report', exportPdf: 'Export PDF', sendEmail: 'Send Email', name: 'Name', class: 'Class', email: 'Email', phone: 'Phone', marks: 'Marks', grade: 'Grade', subject: 'Subject', highest: 'Highest', lowest: 'Lowest', average: 'Average', noData: 'N/A', loading: 'Loading...', sending: 'Sending...' },
    ta: { title: 'Student Report', selectStudent: 'Select Student', loadReport: 'Load Report', exportPdf: 'Export PDF', sendEmail: 'Send Email', name: 'Name', class: 'Class', email: 'Email', phone: 'Phone', marks: 'Marks', grade: 'Grade', subject: 'Subject', highest: 'Highest', lowest: 'Lowest', average: 'Average', noData: 'N/A', loading: 'Loading...', sending: 'Sending...' },
    si: { title: 'Student Report', selectStudent: 'Select Student', loadReport: 'Load Report', exportPdf: 'Export PDF', sendEmail: 'Send Email', name: 'Name', class: 'Class', email: 'Email', phone: 'Phone', marks: 'Marks', grade: 'Grade', subject: 'Subject', highest: 'Highest', lowest: 'Lowest', average: 'Average', noData: 'N/A', loading: 'Loading...', sending: 'Sending...' }
  };

  get t() { return this.translations[this.currentLang]; }

  constructor(private reportService: ReportService, private emailService: EmailService) {}

  ngOnInit(): void { this.loadStudents(); }

  loadStudents() {
    this.reportService.getAllStudents().subscribe({
      next: (res) => this.students = res || [],
      error: (err) => console.error('Failed to load students', err)
    });
  }

  changeLang(lang: string) {
    this.currentLang = lang;
    if (this.studentReport) setTimeout(() => this.createChart(), 100);
  }

  loadStudentReport() {
    if (!this.selectedStudentId) { alert('Please select a student'); return; }
    this.isLoading = true;
    this.reportService.getStudentReport(this.selectedStudentId).subscribe({
      next: (res: any) => { this.studentReport = res; this.isLoading = false; setTimeout(() => this.createChart(), 100); },
      error: () => { this.isLoading = false; alert('Failed to load report'); }
    });
  }

  createChart() {
    if (!this.chartRef?.nativeElement || !this.studentReport) return;
    if (this.chart) this.chart.destroy();
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;
    const marks = this.studentReport.marks || [];
    const labels = marks.map((m: any) => m.subjectName || m.examName || 'Subject');
    const data = marks.map((m: any) => m.mark || 0);
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length ? labels : [this.t.noData],
        datasets: [{ label: this.studentReport.studentName || 'Student', data: data.length ? data : [0], backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(236, 72, 153, 0.8)', 'rgba(20, 184, 166, 0.8)'], borderRadius: 8 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: { display: true, text: this.t.marks + ' - ' + (this.studentReport.studentName || ''), color: '#fff', font: { size: 16, weight: 'bold' } } }, scales: { y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#fff' } }, x: { grid: { display: false }, ticks: { color: '#fff' } } } }
    });
  }

  getGrade(mark: number): string {
    if (mark === null || mark === undefined) return this.t.noData;
    if (mark >= 90) return 'A+';
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B+';
    if (mark >= 60) return 'B';
    if (mark >= 50) return 'C';
    return 'F';
  }

  exportPDF() {
    if (!this.studentReport) { alert('Load report first'); return; }
    const doc = new jsPDF();
    const r = this.studentReport;
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('EduLink School', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text(this.t.title, 105, 32, { align: 'center' });
    doc.setDrawColor(59, 130, 246);
    doc.line(20, 38, 190, 38);
    doc.setFontSize(12);
    doc.text(this.t.name + ': ' + (r.studentName || this.t.noData), 20, 50);
    doc.text(this.t.class + ': ' + (r.className || this.t.noData), 20, 60);
    doc.text(this.t.email + ': ' + (r.email || this.t.noData), 120, 50);
    doc.text(this.t.phone + ': ' + (r.phone || this.t.noData), 120, 60);
    const rows = (r.marks || []).map((m: any) => [m.subjectName || m.examName || this.t.noData, m.mark ?? this.t.noData, this.getGrade(m.mark)]);
    autoTable(doc, { head: [[this.t.subject, this.t.marks, this.t.grade]], body: rows.length ? rows : [[this.t.noData, this.t.noData, this.t.noData]], startY: 75, headStyles: { fillColor: [59, 130, 246], textColor: 255 }, bodyStyles: { textColor: [30, 41, 59] }, alternateRowStyles: { fillColor: [241, 245, 249] } });
    const finalY = (doc as any).lastAutoTable?.finalY || 120;
    doc.setTextColor(255, 255, 255);
    doc.text(this.t.highest + ': ' + (r.highest ?? this.t.noData), 20, finalY + 15);
    doc.text(this.t.lowest + ': ' + (r.lowest ?? this.t.noData), 80, finalY + 15);
    doc.text(this.t.average + ': ' + (r.average ? Math.round(r.average) : this.t.noData), 140, finalY + 15);
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text('Generated: ' + new Date().toLocaleDateString(), 105, 285, { align: 'center' });
    doc.save((r.studentName || 'Student') + '_Report.pdf');
  }

  sendEmail() {
    if (!this.studentReport?.email) { alert('No email address available'); return; }
    this.isSending = true;
    const r = this.studentReport;
    const marksDetails = (r.marks || []).map((m: any) => (m.subjectName || m.examName || 'Subject') + ': ' + (m.mark ?? 'N/A') + ' (' + this.getGrade(m.mark) + ')').join('\n');
    const body = 'Dear ' + (r.studentName || 'Student') + ',\n\nYour Academic Report Card:\n\n' + this.t.class + ': ' + (r.className || 'N/A') + '\n\n' + this.t.marks + ' Details:\n' + (marksDetails || 'No marks available') + '\n\nSummary:\n' + this.t.highest + ': ' + (r.highest || 'N/A') + '\n' + this.t.lowest + ': ' + (r.lowest || 'N/A') + '\n' + this.t.average + ': ' + (r.average ? Math.round(r.average) : 'N/A') + '\n\nBest Regards,\nEduLink School';
    this.emailService.sendEmail({ to: r.email, subject: 'Report Card - ' + (r.studentName || 'Student'), body: body }).subscribe({
      next: () => { this.isSending = false; alert('Email sent successfully!'); },
      error: () => { this.isSending = false; alert('Failed to send email'); }
    });
  }
}
