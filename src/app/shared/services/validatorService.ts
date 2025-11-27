import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  isValidField(form: FormGroup, field: string): boolean | null {

    return form.controls[field]?.errors && form.controls[field]?.touched;
  }

  getFieldError(form: FormGroup, field: string): string | null {

    if(!form.controls[field]) return null;
    const errors = form.controls[field]?.errors || {};
    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'This field is required';
          case 'minlength':
            return `Minimum length is ${errors['minlength'].requiredLength}`;
          case 'min':
            return `Minimum value is ${errors['min'].min}`;
          
      }
      
    }
    return null;
  }

}
