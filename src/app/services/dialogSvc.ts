import {
  ApplicationRef,
  createComponent,
  inject,
  Injectable,
  Injector,
  RendererFactory2,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { Dialog } from './dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private doc = inject(DOCUMENT);
  private appRef = inject(ApplicationRef);

  openModal<T extends Dialog>(
    component: Type<T>
  ): {
    close: Function;
  } {
    const dialog = this.doc.createElement('dialog');
    this.doc.body.append(dialog);

    const cmpRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      hostElement: dialog,
    });

    cmpRef.instance.close.subscribe(() => {
      dialog.close();
      dialog.remove();
    });

    dialog.addEventListener('close', (evt) => {
      dialog.remove();
    });

    dialog.showModal();

    return {
      close: () => {},
    };
  }
}
