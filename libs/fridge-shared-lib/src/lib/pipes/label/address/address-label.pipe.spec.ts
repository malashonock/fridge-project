import '@angular/localize/init';

import { AddressLabelPipe } from './address-label.pipe';
import { AnyPipe } from '../../any/any.pipe';

describe('AddressLabelPipe', () => {
  let pipe: AddressLabelPipe;

  beforeEach(() => {
    pipe = new AddressLabelPipe(new AnyPipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('given an empty address, should return null', () => {
    expect(pipe.transform(null)).toBeNull();

    expect(
      pipe.transform({
        country: null,
        city: null,
        street: null,
        buildingNo: null,
        floorNo: null,
        roomNo: null,
      })
    ).toBeNull();
  });

  it('given a non-empty address, should return its string representation', () => {
    expect(
      pipe.transform({
        country: 'Belarus',
        city: 'Minsk',
        street: 'Zhukava Ave.',
        buildingNo: '29',
        floorNo: 3,
        roomNo: '305',
      })
    ).toBe('Belarus, Minsk, Zhukava Ave., bldg. 29, 3 floor, room 305');
  });

  it('given a partially filled address, should return its string representation', () => {
    expect(
      pipe.transform({
        country: null,
        city: 'Minsk',
        street: 'Zhukava Ave.',
        buildingNo: '29',
        floorNo: null,
        roomNo: null,
      })
    ).toBe('Minsk, Zhukava Ave., bldg. 29');
  });
});
