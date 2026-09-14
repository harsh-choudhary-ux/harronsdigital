const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/hc219/.gemini/antigravity-ide/brain/4bb48908-cf4f-4ca5-8fed-758848edcb9c/.system_generated/logs/transcript_full.jsonl')
});

rl.on('line', (line) => {
  if (line.includes('"step_index":1528')) {
    const data = JSON.parse(line);
    console.log(JSON.stringify(data).slice(0, 1000));
    console.log(JSON.stringify(data).slice(-1000));
  }
});
