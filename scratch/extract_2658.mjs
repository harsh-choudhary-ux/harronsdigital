import fs from 'fs';
import readline from 'readline';

async function extractStep2658() {
  const fileStream = fs.createReadStream('C:\\Users\\hc219\\.gemini\\antigravity-ide\\brain\\4bb48908-cf4f-4ca5-8fed-758848edcb9c\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.includes('"step_index":2658,')) {
      const parsed = JSON.parse(line);
      fs.writeFileSync('c:\\Users\\hc219\\Downloads\\Test 2\\scratch\\step_2658.txt', parsed.tool_calls[0].args.ReplacementContent);
      console.log('Saved step 2658');
      break;
    }
  }
}
extractStep2658();
