import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';

@NgModule({
  declarations: [SentenceCasePipe],
  imports: [CommonModule],
})
export class SharedModule {}
