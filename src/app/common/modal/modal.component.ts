import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { config } from './modal.constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() imageSrc: any;
  @Input() heading: any;
  @Input() subHeading: any;
  @Input() buttonName: any;
  @Output() newItemEvent = new EventEmitter<string>();
  @ViewChild('template')
  private modalContent!: TemplateRef<ModalComponent>;
  private modalRef!: BsModalRef;
  config = config;
  subscriptions: Subscription[] = [];
  constructor(
    private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  openModal() {
    this.modalRef = this.modalService.show(this.modalContent, this.config);
    const _combine = combineLatest(
      this.modalService.onShow,
      this.modalService.onShown,
      this.modalService.onHide,
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());
    this.subscriptions.push(this.modalService.onShow.subscribe(() => {}));
    this.subscriptions.push(this.modalService.onHide.subscribe(() => {}));
  }

  doneEvent(value: string) {
    this.newItemEvent.emit(value);
    this.close();
  }

  close() {
    this.modalRef.hide();
  }
}
