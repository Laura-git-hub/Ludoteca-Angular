/*import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-prestamo-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './prestamo-edit.component.html',
    styleUrl: './prestamo-edit.component.scss',
})
export class PrestamoEditComponent implements OnInit {
  prestamo: Prestamo;
  
    constructor(
        public dialogRef: MatDialogRef<PrestamoEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private prestamoService: PrestamoService
    ) {}

    ngOnInit(): void {
        this.prestamo = this.data.prestamo ? Object.assign({}, this.data.prestamo) : new Prestamo();
    }

    onSave() {
        this.prestamoService.savePrestamo(this.prestamo).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}*/
