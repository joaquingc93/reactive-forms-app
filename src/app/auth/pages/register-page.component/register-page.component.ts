import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validatorService';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private formBuilder = inject(FormBuilder);
  public validatorService = inject(ValidatorService);

  public myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(ValidatorService.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(ValidatorService.emailPattern)]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(ValidatorService.notOnlySpacesPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ValidatorService.isFieldOneEqualFieldTwo('password', 'confirmPassword')]
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
