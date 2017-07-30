import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  template: `
    <div class="progress-outer">
      <div class="progress-inner" *ngIf="progress < 100" [style.width]="progress + '%'">
      </div>
    </div>`
  ,
  styles: [`
    .progress-outer {
      width: 100%;
      padding: 1px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
    }
  
    .progress-inner {
      white-space: nowrap;
      overflow: hidden;
      padding: 33px 0;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.3));
  
    }
  `]
})
export class ProgressBarComponent {
  
  @Input('progress') progress;
  
  
}
