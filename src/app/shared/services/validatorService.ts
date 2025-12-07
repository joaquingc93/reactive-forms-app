import { Injectable } from '@angular/core';
import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  
  static namePattern: string = '^[a-zA-Z]+\\s[a-zA-Z]+$';
  static emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern: string = '^[a-zA-Z0-9]+$';

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
  isValidField(form: FormGroup, field: string): boolean | null {

    return form.controls[field]?.errors && form.controls[field]?.touched;
  }

  getFieldError(form: FormGroup, field: string): string | null {

    if(!form.controls[field]) return null;
    const errors = form.controls[field]?.errors || {};
    this.getErrorText(errors);
    return null;
  }
  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index]?.errors && formArray.controls[index]?.touched;
    
  }

  getFieldErrorInArray(formArray: FormArray, index: number): string | null {

    if(formArray.controls.length===0) return null;
    const errors = formArray.controls[index]?.errors || {};
    return this.getErrorText(errors);


  }

  getErrorText(errors:ValidationErrors):string | null {

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Minimum length is ${errors['minlength'].requiredLength}`;
        case 'min':
          return `Minimum value is ${errors['min'].min}`;
        case 'email':
          return 'Invalid email format';
        case 'pattern':
          return this.getPatternError(errors['pattern']);
        case 'notEqual':
          return 'Passwords must match';
      }
      
    }
    return null;

  }

  private getPatternError(patternError: any): string {
    const pattern = patternError.requiredPattern;
    
    if (pattern === ValidatorService.namePattern) {
      return 'Name must be in format: FirstName LastName';
    }
    if (pattern === ValidatorService.emailPattern) {
      return 'Invalid email format';
    }
    if (pattern === ValidatorService.notOnlySpacesPattern) {
      return 'Field cannot contain only spaces';
    }
    return 'Invalid format';
  }

}
