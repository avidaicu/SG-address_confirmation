import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';

declare var google;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  implements OnInit {
  public searchControl: FormControl;

  addressForm: FormGroup;

  @ViewChild("search", {static: false})
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

    this.addressForm = new FormGroup({
      street_number: new FormControl(),
      route: new FormControl(),
      locality: new FormControl(),
      administrative_area_level_1: new FormControl(),
      country: new FormControl(),
      postal_code: new FormControl()
    });

    this.addressForm.setValue({
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    });

    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            // console.log(addressType);
            // console.log(this.addressForm.value[addressType]);
            if (this.addressForm.value[addressType]) {
              var val = place.address_components[i][this.addressForm.value[addressType]];
              // this.addressForm = val;
              // console.log(this.addressForm.controls);
              console.log(val);
            }
          }


        });
      });
    });
  }

}
