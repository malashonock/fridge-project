import { AbstractControl, ValidationErrors } from '@angular/forms';

import {
  anyOf,
  group,
  oneOrMore,
  zeroOrMore,
  zeroOrOne,
  minCount,
  startWith,
  endWith,
} from 'app/utils/regex/regex';

export class EmailValidator {
  static valid(control: AbstractControl): ValidationErrors | null {
    // Alias character sequences
    const englishLetters = 'A-Za-z';
    const digits = '0-9';
    const alphaNumeric = englishLetters + digits;
    const dot = '\\.';
    const dotOrHyphen = dot + '\\-';
    const specialChars = dotOrHyphen + "!#$%&'*+\\/=?^_`{}|";

    /* Recipient name:
      - can contain English letters and digits
      - can contain special characters
      - can't start or end with a special char
      - can't contain more than 1 special char in a row */
    const recipientName =
      oneOrMore(anyOf(alphaNumeric)) +
      zeroOrMore(
        group(zeroOrOne(anyOf(specialChars)) + oneOrMore(anyOf(alphaNumeric)))
      );

    /* Domain name:
       - can contain English letters and digits
       - can contain special chars: a dot or a hyphen
       - can't start or end with a special char
       - can't contain more than 1 special char in a row */
    const domainName =
      oneOrMore(anyOf(alphaNumeric)) +
      zeroOrMore(
        group(zeroOrOne(anyOf(dotOrHyphen)) + oneOrMore(anyOf(alphaNumeric)))
      );

    /* Top-level domain:
       - must start with a dot
       - domain name can contain only English letters
       - domain name must be at least 2 characters long */
    const topLevelDomain = dot + minCount(anyOf(englishLetters), 2);

    const emailRegExp = new RegExp(
      startWith(recipientName) + '@' + domainName + endWith(topLevelDomain)
    );

    const email = control.value;

    return emailRegExp.test(email)
      ? null
      : {
          invalidEmail: email,
        };
  }
}
