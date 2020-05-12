import { NgModule } from '@angular/core';
import { ProTrackSharedLibsModule } from './shared-libs.module';
import { BtgrpAlertComponent } from './alert/alert.component';
import { BtgrpAlertErrorComponent } from './alert/alert-error.component';
import { BtgrpLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [ProTrackSharedLibsModule],
  declarations: [BtgrpAlertComponent, BtgrpAlertErrorComponent, BtgrpLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [BtgrpLoginModalComponent],
  exports: [ProTrackSharedLibsModule, BtgrpAlertComponent, BtgrpAlertErrorComponent, BtgrpLoginModalComponent, HasAnyAuthorityDirective]
})
export class ProTrackSharedModule {}
