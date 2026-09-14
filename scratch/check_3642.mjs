import fs from 'fs';
import readline from 'readline';

async function check3642() {
  const fileStream = fs.createReadStream('C:\\Users\\hc219\\.gemini\\antigravity-ide\\brain\\31df7c38-2b92-40c3-9757-f90dfd90ef83\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.includes('"step_index":3642,')) {
      const parsed = JSON.parse(line);
      console.log('TargetContent:\n', parsed.tool_calls[0].args.TargetContent);
      break;
    }
  }
}
check3642();
