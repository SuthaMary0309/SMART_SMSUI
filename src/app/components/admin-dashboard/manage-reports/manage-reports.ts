import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportService } from '../../../Service/report-service';

@Component({
  selector: 'app-manage-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-reports.html',
  styleUrl: './manage-reports.css',
})
export class ManageReports implements OnInit {
  students: any[] = [];
  classes: any[] = [];
  exams: any[] = [];

  selectedStudent = '';
  selectedExam = '';
  selectedClass = '';

  studentReport: any = null;
  examReport: any = null;
  classReport: any = null;

  chartInstance: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadSelectors();
  }

  loadSelectors() {
    this.reportService.getAllStudents().subscribe((s: any) => this.students = s);
    this.reportService.getAllClasses().subscribe((c: any) => this.classes = c);
    this.reportService.getAllExams().subscribe((e: any) => this.exams = e);
  }

  async loadStudentReport() {
    if(!this.selectedStudent) return;
    this.reportService.getStudentReport(this.selectedStudent).subscribe((r:any) => {
      this.studentReport = r;
      this.renderStudentChart();
    });
  }

  async loadExamReport() {
    if(!this.selectedExam) return;
    this.reportService.getExamReport(this.selectedExam).subscribe((r:any) => {
      this.examReport = r;
      this.renderExamChart();
    });
  }

  async loadClassReport() {
    if(!this.selectedClass || !this.selectedExam) {
      alert('Select class and exam');
      return;
    }
    this.reportService.getClassPerformance(this.selectedClass, this.selectedExam).subscribe((r:any) => {
      this.classReport = r;
      this.renderClassChart();
    });
  }

  renderStudentChart() {
    if(this.chartInstance) { this.chartInstance.destroy(); }
    const labels = this.studentReport.marks.map((m:any) => m.subjectName || m.examName);
    const data = this.studentReport.marks.map((m:any) => m.mark);
    const ctx = (document.getElementById('reportChart') as any);
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Marks', data }] },
      options: {}
    });
  }

  renderExamChart() {
    if(this.chartInstance) { this.chartInstance.destroy(); }
    const labels = this.examReport.students.map((s:any) => s.studentName);
    const data = this.examReport.students.map((s:any) => s.mark);
    const ctx = (document.getElementById('reportChart') as any);
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: `${this.examReport.examName} - Marks`, data }] },
      options: {}
    });
  }

  renderClassChart() {
    if(this.chartInstance) { this.chartInstance.destroy(); }
    const labels = this.classReport.students.map((s:any) => s.studentName);
    const data = this.classReport.students.map((s:any) => s.mark);
    const ctx = (document.getElementById('reportChart') as any);
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: `${this.classReport.examName} - Class Performance`, data }] },
      options: {}
    });
  }

  exportStudentPDF() {
    if(!this.studentReport) return;
    const doc = new jsPDF();
    doc.text(`Student Report - ${this.studentReport.studentName}`, 10, 10);
    autoTable(doc, {
      head: [['Exam / Subject', 'Mark']],
      body: this.studentReport.marks.map((m:any) => [m.examName || m.subjectName, m.mark])
    });
    doc.save(`StudentReport-${this.studentReport.studentName}.pdf`);
  }

  exportExamPDF() {
    if(!this.examReport) return;
    const doc = new jsPDF();
    doc.text(`Exam Report - ${this.examReport.examName}`, 10, 10);
    autoTable(doc, {
      head: [['Student', 'Mark']],
      body: this.examReport.students.map((s:any) => [s.studentName, s.mark])
    });
    doc.save(`ExamReport-${this.examReport.examName}.pdf`);
  }

  exportClassPDF() {
    if(!this.classReport) return;
    const doc = new jsPDF();
    doc.text(`Class Report - ${this.classReport.className} / ${this.classReport.examName}`, 10, 10);
    autoTable(doc, {
      head: [['Student', 'Mark']],
      body: this.classReport.students.map((s:any) => [s.studentName, s.mark])
    });
    doc.save(`ClassReport-${this.classReport.className}-${this.classReport.examName}.pdf`);
  }
}
