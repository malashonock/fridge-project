import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '@shared/models/fridge/address.interface';
import { AnyPipe } from '../../any/any.pipe';

@Pipe({
  name: 'addressLabel',
  standalone: true,
})
export class AddressLabelPipe implements PipeTransform {
  public constructor(private anyPipe: AnyPipe) {}

  public transform(address: Address | null | undefined): string | null {
    if (this.anyPipe.transform(address) === false) {
      return null;
    }

    const { country, city, street, buildingNo, floorNo, roomNo } = address!;
    const addressSegments: string[] = [];

    country && addressSegments.push(country);
    city && addressSegments.push(city);
    street && addressSegments.push(street);

    buildingNo &&
      addressSegments.push(
        $localize`:@@buildingPrefix:bldg.` + ' ' + buildingNo
      );

    floorNo && addressSegments.push(floorNo + ' ' + $localize`:@@floor:floor`);

    roomNo &&
      addressSegments.push($localize`:@@roomPrefix:room` + ' ' + roomNo);

    return addressSegments.join(', ');
  }
}
