import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validatorService';

@Component({
  selector: 'app-switches-pages',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './switches-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPagesComponent { 
private formBuilder=inject(FormBuilder);
validatorService=inject(ValidatorService);
myForm=this.formBuilder.group({
  gender: [null, Validators.required],
  wantNotifications: [true],
  termAndConditions: [false, Validators.requiredTrue]
});


  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }

}
