import { Component } from '@angular/core';
import { UnitsTest } from "../../students/exam/units-test/units-test";

@Component({
  selector: 'app-exam',
  imports: [UnitsTest],
  templateUrl: './exam.html',
  styleUrl: './exam.css',
})
export class Exam {
ngOnInit() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Reset all
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      // Activate clicked tab
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');

      // Safe way – no error
      if (targetId) {
        document.getElementById(targetId)?.classList.add('active');
      }
    });
  });
}
}

