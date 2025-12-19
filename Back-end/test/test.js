import Tesseract from 'tesseract.js';
import path from 'path';

// Path to your image
const imagePath = path.join('./assets/emoji.png');

console.log('Starting OCR...');

Tesseract.recognize(
  imagePath,       // image file
  'eng',           // language
  { logger: m => console.log(m) }  // optional logging
)
.then(({ data: { text } }) => {
  console.log('OCR complete!');
  console.log('Extracted text:');
  console.log(text);
})
.catch(err => {
  console.error('Error during OCR:', err);
});
