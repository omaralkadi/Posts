import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {initFlowbite} from 'flowbite';
import { NgxSpinnerModule, NgxSpinnerComponent } from "ngx-spinner";

import { Flowbite } from './core/services/Flowbite/flowbite';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Posts');
  constructor(private flowbiteService: Flowbite,private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
