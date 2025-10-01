'use server';
/**
 * @fileOverview A flow that selects relevant testimonials based on user input.
 *
 * - selectTestimonials - A function that selects testimonials.
 * - SelectTestimonialsInput - The input type for the selectTestimonials function.
 * - SelectTestimonialsOutput - The return type for the selectTestimonials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectTestimonialsInputSchema = z.object({
  legalNeed: z.string().describe('The prospective client\'s specific legal need.'),
  allTestimonials: z.array(z.string()).describe('An array of all available client testimonials.'),
});
export type SelectTestimonialsInput = z.infer<typeof SelectTestimonialsInputSchema>;

const SelectTestimonialsOutputSchema = z.array(z.string()).describe('An array of the most relevant client testimonials.');
export type SelectTestimonialsOutput = z.infer<typeof SelectTestimonialsOutputSchema>;

export async function selectTestimonials(input: SelectTestimonialsInput): Promise<SelectTestimonialsOutput> {
  return selectTestimonialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectTestimonialsPrompt',
  input: {schema: SelectTestimonialsInputSchema},
  output: {schema: SelectTestimonialsOutputSchema},
  prompt: `You are an AI assistant specialized in selecting the most relevant client testimonials for a prospective client based on their legal needs.

Given the prospective client's legal need: {{{legalNeed}}}

And the following list of testimonials:
{{#each allTestimonials}}- {{{this}}}\n{{/each}}

Select only the testimonials that are most relevant to the client's legal need. Return the selected testimonials as a JSON array.
If no testimonials are relevant, return an empty array.
Ensure that the output is a valid JSON array of strings.
`, 
});

const selectTestimonialsFlow = ai.defineFlow(
  {
    name: 'selectTestimonialsFlow',
    inputSchema: SelectTestimonialsInputSchema,
    outputSchema: SelectTestimonialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
