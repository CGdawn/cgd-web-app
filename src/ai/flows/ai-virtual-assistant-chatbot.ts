'use server';
/**
 * @fileOverview An AI virtual assistant chatbot that provides information about CG DAWN's services, company details, and FAQs.
 *
 * - aiVirtualAssistantChatbot - A function that handles the interaction with the AI virtual assistant.
 * - AIVirtualAssistantChatbotInput - The input type for the aiVirtualAssistantChatbot function.
 * - AIVirtualAssistantChatbotOutput - The return type for the aiVirtualAssistantChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIVirtualAssistantChatbotInputSchema = z.object({
  query: z.string().describe('The user’s question for the AI virtual assistant about CG DAWN.'),
});
export type AIVirtualAssistantChatbotInput = z.infer<typeof AIVirtualAssistantChatbotInputSchema>;

const AIVirtualAssistantChatbotOutputSchema = z.object({
  response: z.string().describe('The AI virtual assistant’s answer to the user’s question.'),
});
export type AIVirtualAssistantChatbotOutput = z.infer<typeof AIVirtualAssistantChatbotOutputSchema>;

export async function aiVirtualAssistantChatbot(
  input: AIVirtualAssistantChatbotInput
): Promise<AIVirtualAssistantChatbotOutput> {
  return aiVirtualAssistantChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiVirtualAssistantChatbotPrompt',
  input: {schema: AIVirtualAssistantChatbotInputSchema},
  output: {schema: AIVirtualAssistantChatbotOutputSchema},
  prompt: `You are an AI virtual assistant for "Cyber Generation Dawn (CG DAWN)", a company with the tagline "Creating Tomorrow Today", located in Lagos, Nigeria. The Founder & CEO is Donald Attah. Contact: +234 810 408 2051.

CG DAWN operates in various technological fields, providing innovative solutions. Here is a summary of their core offerings and company information:

Company Information:
- Name: Cyber Generation Dawn (CG DAWN)
- Tagline: Creating Tomorrow Today
- Location: Lagos, Nigeria
- Contact: +234 810 408 2051
- Founder & CEO: Donald Attah
- Core Team: CTO, Lead Developer, Creative Director, Director of Operations, Legal Advisor, 3D Artists, FinTech Developers.
- Website Sections: About us, Mission, Vision, Team showcase, Services, Portfolio/projects, Careers, Contact page, Blog/news section.

Services:
- Game Development: Unity, Unreal Engine, Mobile games, Educational games, PC games.
- 2D & 3D Animation: Motion graphics, Cinematics.
- 3D Visualization.
- Fullstack Web Application Development: Frontend, Backend, APIs, Databases, Cloud systems.
- Robotics: AI robotics, Automation systems, Simulations.
- Tutoring & Mentorship: Programming training, Game development mentorship, Design mentorship.
- VR & AR Solutions: Oculus Quest integration, Immersive training systems, Museum VR experiences, Metaverse environments.
- NFT and Blockchain Development.
- Creative Digital Production.
- AI-driven Solutions: AI chatbots, AI assistants, Machine learning, AI automation.
- Educational Technology.

Your role is to answer user questions about CG DAWN's services, company information, and common FAQs based on the provided context. Be helpful, concise, and professional. If a question goes beyond the scope of this information or you don't know the answer, politely state that you cannot provide that specific detail and suggest they visit the official CG DAWN website or contact support for more detailed inquiries.

User's question: {{{query}}}`,
});

const aiVirtualAssistantChatbotFlow = ai.defineFlow(
  {
    name: 'aiVirtualAssistantChatbotFlow',
    inputSchema: AIVirtualAssistantChatbotInputSchema,
    outputSchema: AIVirtualAssistantChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
