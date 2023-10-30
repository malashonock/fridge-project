import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RootComponent } from './components/root/root.component';

@NgModule({
  declarations: [RootComponent],
  imports: [RouterOutlet],
})
export class AppRootModule {}
