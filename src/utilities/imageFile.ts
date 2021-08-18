// Node's File System module
import { promises as fsPromises } from 'fs';

// asynchronous function to check if file exists
const checkFileExists = async (fileResourceName: string): Promise<boolean> => {
  try {
    await fsPromises.open(fileResourceName, 'r');
    return true;
  } catch (err) {
    return false;
  }
};

// asynchronous function to read file contents
const readFileContents = async (fileResourceName: string): Promise<Buffer> => {
  const fileContents = await fsPromises.readFile(fileResourceName);
  return fileContents;
};

export { checkFileExists, readFileContents };
