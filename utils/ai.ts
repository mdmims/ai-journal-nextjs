import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import z from 'zod';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexadecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    // sentimentScore: z
    //     .number()
    //     .describe(
    //         'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
    //     ),
  })
);

const getPrompt = async (content: string) => {
  const formattedInstructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
        'Analyze the following journal entry. Follow the instructions and format your response ' +
        'to match the format instructions, no matter what! \n{formattedInstructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formattedInstructions },
  })

  return await prompt.format({
    entry: content,
  })
}

export const analyze = async (content: string) => {
  const input = await getPrompt(content)
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  });
  const result = await model.call(input);

  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
};
