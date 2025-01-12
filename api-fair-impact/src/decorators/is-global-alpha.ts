import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * Custom decorator to validate that a string contains only global alphabetic characters
 * (letters from languages around the world).
 *
 * @TODO Should still be tested with a variety of languages to ensure it works as expected.
 */
export function IsGlobalAlpha(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isGlobalAlpha',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex = /^[\p{L}\p{M}\s]+$/u;
          return typeof value === 'string' && regex.test(value); // Ensure it's a string and matches the regex
        },
        defaultMessage(args: ValidationArguments) {
          return 'The value contains invalid characters. Only letters from languages around the world are allowed.';
        },
      },
    });
  };
}
