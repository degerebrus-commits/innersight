// services/generateInsight.ts
export async function generateInsight(signal: string, modulator: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: `${modulator} ${signal}`,
        reflection: "This is a placeholder reflection for testing.",
        action_cue: "Action: Take one small step forward today.",
        journal_prompt: "✍️ What does this dynamic reveal about your path?"
      });
    }, 1000); // fake delay to simulate API call
  });
}
