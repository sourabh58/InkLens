const Tesseract = require('tesseract.js');

async function processImage(imagePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      imagePath,
      'eng', // Language code (English in this example)
      { logger: info => console.log(info) } // Optional logger for debugging
    )
      .then(({ data: { text } }) => resolve(text))
      .catch(error => reject(error));
  });
}

module.exports = { processImage };
