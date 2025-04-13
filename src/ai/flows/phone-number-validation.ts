'use server';

/**
 * @fileOverview Phone number validation flow using GenAI.
 *
 * - validatePhone - A function that validates a phone number.
 * - ValidatePhoneInput - The input type for the validatePhone function.
 * - ValidatePhoneOutput - The return type for the validatePhone function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {validatePhoneNumber, PhoneValidationResult} from '@/services/phone-validation';

const ValidatePhoneInputSchema = z.object({
  phoneNumber: z.string().describe('The phone number to validate.'),
});
export type ValidatePhoneInput = z.infer<typeof ValidatePhoneInputSchema>;

const ValidatePhoneOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the phone number is valid.'),
  carrier: z.string().optional().describe('The carrier of the phone number, if available.'),
});
export type ValidatePhoneOutput = z.infer<typeof ValidatePhoneOutputSchema>;

export async function validatePhone(input: ValidatePhoneInput): Promise<ValidatePhoneOutput> {
  return validatePhoneFlow(input);
}

const validatePhoneFlow = ai.defineFlow<
  typeof ValidatePhoneInputSchema,
  typeof ValidatePhoneOutputSchema
>({
  name: 'validatePhoneFlow',
  inputSchema: ValidatePhoneInputSchema,
  outputSchema: ValidatePhoneOutputSchema,
}, async (input) => {
  const validationResult: PhoneValidationResult = await validatePhoneNumber(input.phoneNumber);
  return {
    isValid: validationResult.isValid,
    carrier: validationResult.carrier,
  };
});
