import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ValidatorService } from '../../../shared/services/validatorService';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  
})
export class DynamicPageComponent { 
validatorService=inject(ValidatorService);
private formBuilder=inject(FormBuilder);

myForm:FormGroup = this.formBuilder.group({
 name: ['', Validators.required],
 favoriteGames: this.formBuilder.array( 
  [
    ['Call of Duty',Validators.required],['Gran Turismo',Validators.required]
  ],
Validators.minLength(2) )
});

get favoriteGames():FormArray {
  return this.myForm.get('favoriteGames') as FormArray;
}

favoriteGameControl = this.formBuilder.control('', Validators.required);

onAddFavoriteGame() {
  if(this.favoriteGameControl.invalid) return;
  this.favoriteGames.push(this.formBuilder.control(this.favoriteGameControl.value, Validators.required));
  this.favoriteGameControl.reset();
}
onRemoveFavoriteGame(index: number) {
  this.favoriteGames.removeAt(index);
}

}