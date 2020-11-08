import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  @Input() title = 'Default title'
  @Output() close = new EventEmitter<void>()
  @Output() toDelete = new EventEmitter<void>()
  


  constructor() { }

  ngOnInit(): void {
  }

}
