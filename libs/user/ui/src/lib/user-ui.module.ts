import { NgModule } from '@angular/core';

import { UserRoleLabelPipe } from './pipes/user-role-label/user-role-label.pipe';

const pipes = [UserRoleLabelPipe];

@NgModule({
  imports: [pipes],
  exports: [pipes],
})
export class UserUiModule {}
