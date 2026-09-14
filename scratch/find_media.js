const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/hc219/.gemini/antigravity-ide/brain/4bb48908-cf4f-4ca5-8fed-758848edcb9c/.system_generated/logs/transcript_full.jsonl')
});

rl.on('line', (line) => {
  if (line.includes('"step_index":1528')) {
    const data = JSON.parse(line);
    console.log('Keys in data:', Object.keys(data));
    console.log('Content length:', data.content.length);
    const mediaMatches = data.content.match(/media_[a-zA-Z0-9_\.]+/g);
    console.log('media matches:', mediaMatches);
    const fileMatches = data.content.match(/[A-Za-z0-9_\-\\\/:]+\.(png|jpg|jpeg|webp)/gi);
    console.log('file matches:', fileMatches);
  }
});
