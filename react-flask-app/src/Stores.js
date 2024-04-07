import { promises as fs } from 'fs';

async function readJsonFile(filePath) {
   
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);

    console.log(json);
  } catch (err) {
    console.error(err);
  }
}

// Replace 'path/to/your/file.json' with the actual file path
const filePath = './StoreData.json';
readJsonFile(filePath);

