import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';
import { ReportService } from '../../../Service/report-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.html',
  styleUrls: ['./manage-reports.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class ManageReports implements OnInit {

  students: any[] = [];
  exams: any[] = [];
  classes: any[] = [];

  selectedStudentId = '';
  studentReport: any = null;

  chart: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.reportService.getAllStudents().subscribe(s => this.students = s);
    this.reportService.getAllExams().subscribe(e => this.exams = e);
    this.reportService.getAllClasses().subscribe(c => this.classes = c);
  }

  loadStudentReport() {
    if (!this.selectedStudentId) return alert('Choose a student');

    this.reportService.getStudentReport(this.selectedStudentId)
      .subscribe((res: any) => {
        this.studentReport = res;

        this.loadChart(
          `${res.studentName} Summary`,
          ['Highest', 'Lowest', 'Average'],
          [res.highest, res.lowest, Math.round(res.average)]
        );

      });
  }

  loadChart(title: string, labels: string[], values: number[]) {
    if (this.chart) this.chart.destroy();

    const ctx = document.getElementById('reportChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: title,
          data: values,
          backgroundColor: ['#3c8dbc', '#00c0ef', '#f39c12']
        }]
      },
      options: { responsive: true }
    });
  }

  exportPDF() {
    if (!this.studentReport) return alert('Load report first');

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('STUDENT REPORT', 40, 30);
    doc.setFontSize(12);

    doc.text(`Student: ${this.studentReport.studentName}`, 40, 60);
    doc.text(`Class: ${this.studentReport.className}`, 40, 80);
    doc.text(`Average: ${this.studentReport.average}`, 40, 100);

    const rows = this.studentReport.marks.map((x: any) => [
      x.subjectName || x.examName,
      x.mark
    ]);

    autoTable(doc, {
      head: [['EXAM / SUBJECT', 'MARK']],
      body: rows,
      startY: 130
    });

    doc.save(`${this.studentReport.studentName}_Report.pdf`);
  }
}
