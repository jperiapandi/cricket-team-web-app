import { OutputEmitterRef } from '@angular/core';

export interface Dialog {
  close: OutputEmitterRef<void>;
}
