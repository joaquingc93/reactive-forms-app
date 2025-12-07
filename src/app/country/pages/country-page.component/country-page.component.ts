import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/countryService';
import { Country } from '../../interface/country.interface';
import { JsonPipe } from '@angular/common';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
formBuilder=inject(FormBuilder);
countryService=inject(CountryService);
regions=signal(this.countryService.regions);
countriesByRegion=signal<Country[]>([]);
borders=signal<Country[]>([]);
myForm=this.formBuilder.group({
  region: ['',Validators.required],
  country: ['',Validators.required],
  border: ['',Validators.required]
});

 onFormChangedEffect=effect((onCleanup) => {
  const regionSubcription=this.onRegionChanged();
  onCleanup(() => regionSubcription.unsubscribe());
})

onRegionChanged() {

  return this.myForm.get('region')!.valueChanges.pipe(
    tap(()=>this.myForm.get('country')!.reset('')),
    tap(()=>this.myForm.get('border')!.reset('')),
    tap(()=>this.borders.set([])),
    tap(() => this.countriesByRegion.set([])),
    switchMap(region => this.countryService.getCountriesByRegion(region ?? ''))
  )
  
    .subscribe(countries => {
      this.countriesByRegion.set(countries);
    });
  }
  
  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges.pipe(
      tap(()=>this.myForm.get('border')!.reset('')),
      filter((value)=>value!.length>0),
      switchMap(code => this.countryService.getCountryByAlphaCode(code ?? '')) ,
      switchMap(country => this.countryService.getCountryNamesByCodeArray(country?.borders ?? []))  


    )
    .subscribe(borders => {
      this.borders.set(borders);
    });

  }
  
  
  

}
