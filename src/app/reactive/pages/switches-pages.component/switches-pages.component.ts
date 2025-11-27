import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-switches-pages',
  imports: [JsonPipe],
  templateUrl: './switches-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPagesComponent { }
