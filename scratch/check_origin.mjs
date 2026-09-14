import fs from 'fs';
import readline from 'readline';

async function checkDarkModeOrigin() {
  const fileStream = fs.createReadStream('C:\\Users\\hc219\\.gemini\\antigravity-ide\\brain\\4bb48908-cf4f-4ca5-8fed-758848edcb9c\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.includes('"step_index":264') || line.includes('"step_index":265') || line.includes('"step_index":266')) {
      const parsed = JSON.parse(line);
      if (parsed.tool_calls) {
        for (const call of parsed.tool_calls) {
          console.log('Step', parsed.step_index, 'Call:', call.name, call.args.TargetFile || '');
          if (call.args.ReplacementContent) {
            console.log(call.args.ReplacementContent.slice(0, 400));
          }
        }
      }
    }
  }
}
checkDarkModeOrigin();
