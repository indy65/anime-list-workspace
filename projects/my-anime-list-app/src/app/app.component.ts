import { Component } from '@angular/core';
import { TestComponent } from 'projects/components/src/test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone:true,
  imports:[TestComponent]
})
export class AppComponent {
  title = 'my-anime-list-app';
}
