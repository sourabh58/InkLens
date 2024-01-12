const { processImage } = require('./imageProcessor');

// Example usage
const imagePath = './images/sample2.jpg'; // Replace with the actual path to your image

processImage(imagePath)
  .then(text => {
    // Define regex patterns for questions and subquestions
    const questionRegex = /^(\d+\.)(.*)/;
    const subquestionRegex = /^([eO@©\d®Oo].*(?=\d|$))/;

    // Split the text into lines
    const lines = text.split('\n');

    // Variables to keep track of the current question and subquestions
    let currentQuestion = null;
    let subquestions = [];

    // Loop through each line
    for (const line of lines) {
      const questionMatch = line.match(questionRegex);
      const subquestionMatch = line.match(subquestionRegex);

      if (questionMatch) {
        // If a new question is found, print the previous question and its subquestions
        if (currentQuestion !== null) {
          console.log(`${currentQuestion.split('->').slice(0, -1).join('->')} ->`);
          for (const subquestion of subquestions) {
            console.log(`  ${subquestion}`);
          }
        }

        // Set the current question to the new question
        currentQuestion = `${questionMatch[1]} -> ${questionMatch[2]}`;
        // Reset the subquestions array
        subquestions = [];
      } else if (subquestionMatch) {
        // If a subquestion is found, add it to the subquestions array
        subquestions.push(`${subquestionMatch[1]} -> ${subquestionMatch[2]}`);
      }
    }

    // Print the last question and its subquestions after the loop
    if (currentQuestion !== null) {
      console.log(`${currentQuestion.split('->').slice(0, -1).join('->')} ->`);
      for (const subquestion of subquestions) {
        console.log(`  ${subquestion}`);
      }
    }
  })
  .catch(error => {
    console.error('Error processing image:', error);
  });
