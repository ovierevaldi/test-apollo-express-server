import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Custom validator function to check for spaces
function NoWhitespace(value: string) {
  return !/\s/.test(value);  // Return true if no whitespace
}

// Custom decorator to check if the string contains whitespace
export function IsNoWhitespace(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsNoWhitespace',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return NoWhitespace(value);  // Use the NoWhitespace function
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} cannot contain whitespace`; // Custom error message
        },
      },
    });
  };
}
