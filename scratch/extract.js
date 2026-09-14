const fs = require('fs');
const readline = require('readline');

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\hc219\\.gemini\\antigravity-ide\\brain\\31df7c38-2b92-40c3-9757-f90dfd90ef83\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.includes('"step_index":1530,')) {
      const parsed = JSON.parse(line);
      fs.writeFileSync('c:\\Users\\hc219\\Downloads\\Test 2\\scratch\\old_pixeltrail_1530.txt', parsed.content);
      console.log('Saved 1530, length:', parsed.content.length);
      break;
    }
  }
}
extract();
