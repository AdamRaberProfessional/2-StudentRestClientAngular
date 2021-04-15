import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { EditdbComponent } from './editdb/editdb.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentlistComponent,
    EditdbComponent,
    
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
