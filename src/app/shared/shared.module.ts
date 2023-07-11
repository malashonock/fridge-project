import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentenceCasePipe } from './pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from './pipes/split-camel-case/split-camel-case.pipe';

@NgModule({
  declarations: [SentenceCasePipe, SplitCamelCasePipe],
  imports: [CommonModule],
})
export class SharedModule {}
