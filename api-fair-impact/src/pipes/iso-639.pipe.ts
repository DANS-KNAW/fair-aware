import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/**
 * Defines a pipe that validates that a given value conforms to the ISO 639 code standard.
 */
@Injectable()
export class ParseISO639Pipe implements PipeTransform<string> {
  transform(value: any) {
    if (typeof value !== 'string' || value.length !== 2) {
      throw new BadRequestException(
        'Validation failed: ISO 639 code must be a string of exactly 2 characters.',
      );
    }
    return value;
  }
}
