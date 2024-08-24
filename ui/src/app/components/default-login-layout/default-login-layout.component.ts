import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {

  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();

  @Output("navigate") onNavigate = new EventEmitter();


  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }

}
