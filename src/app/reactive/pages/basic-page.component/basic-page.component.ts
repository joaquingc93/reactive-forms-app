import { JsonPipe } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validatorService';


@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  
})
export class BasicPageComponent { 
private formBuilder=inject(FormBuilder);
validatorService=inject(ValidatorService);

myForm:FormGroup=this.formBuilder.group({
  name:['',[Validators.required, Validators.minLength(3)]],
  price:[0,[Validators.min(0.5)]],
  inStorage:[0,[Validators.min(1)]],
});

onSave(){
  if(this.myForm.invalid){
    this.myForm.markAllAsTouched();
    return;
  }
  console.log(this.myForm.value);
}

}
