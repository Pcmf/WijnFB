import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@NgModule({
    imports: [
            MatInputModule,
            MatButtonModule,
            MatSelectModule,
            MatIconModule,
            MatFormFieldModule,
            MatDialogModule,
            MatToolbarModule,
            MatTableModule,
            MatMenuModule,
            MatCardModule,
            DragDropModule,
            MatCheckboxModule,
            MatSliderModule,
            MatSidenavModule,
            MatListModule,
            MatSnackBarModule,
            MatButtonToggleModule
        ],
        exports: [
            MatInputModule,
            MatButtonModule,
            MatSelectModule,
            MatIconModule,
            MatFormFieldModule,
            MatDialogModule,
            MatToolbarModule,
            MatTableModule,
            MatMenuModule,
            MatCardModule,
            DragDropModule,
            MatCheckboxModule,
            MatSliderModule,
            MatSidenavModule,
            MatListModule,
            MatSnackBarModule,
            MatButtonToggleModule
        ]
})

export class MaterialModule { }
