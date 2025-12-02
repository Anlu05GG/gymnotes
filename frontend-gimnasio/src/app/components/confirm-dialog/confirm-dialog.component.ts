import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">
        {{ data.title || 'Confirmar' }}
      </h2>

      <mat-dialog-content class="dialog-content">
        <p>{{ data.message }}</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="dialog-actions">
        <button mat-button class="btn-cancel" [mat-dialog-close]="false">
          Cancelar
        </button>
        <button mat-flat-button class="btn-confirm" [mat-dialog-close]="true">
          Eliminar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      background: linear-gradient(to top, #ffffff, #dadadaff);
      padding: 16px 20px 20px;
      border-radius: 12px;
      box-sizing: border-box;
    }

    .dialog-title {
      margin: 0 0 8px;
      font-size: 1.2rem;
      font-weight: 600;
      color: #1f2937;
    }

    .dialog-content p {
      margin: 0 0 16px;
      color: #374151;
      font-size: 0.95rem;
    }

    .dialog-actions {
      gap: 8px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title?: string; message: string }
  ) {}
}
