// Image file utilities module
import {
  checkFileExists,
  insistDirectoryExists,
  resizeFile
} from '../utilities/imageFile';

// Path module
import path from 'path';

describe('test image file utilities', () => {
  it('checks file exists', async () => {
    const inputFile = path.join(
      __dirname,
      '../../assets/full/encenadaport.jpeg'
    );
    const fileExists = await checkFileExists(inputFile);
    expect(fileExists).toBe(true);
  });

  it('insists directory exists', async () => {
    const outputDir = path.join(__dirname, '../../assets/thumbnail/');
    await expectAsync(insistDirectoryExists(outputDir)).toBeResolved();
  });

  it('resizes image file asset', async () => {
    const inputFile = path.join(
      __dirname,
      '../../assets/full/encenadaport.jpeg'
    );
    const outputFile = path.join(
      __dirname,
      '../../assets/thumbnail/encenadaport-100w-100h.jpeg'
    );
    const thumbnailFile = await resizeFile(inputFile, 100, 100, outputFile);
    expect(thumbnailFile).toEqual(outputFile);
  });
});
