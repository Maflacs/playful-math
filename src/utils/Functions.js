export const generateOperationAndResults = (
  operation,
  range,
  setOperationText,
  setResults,
  setCorrectAnswer,
  setIsCorrect,
  setWrongAnswerIndex,
  setSelectedResult,
  setH2Text,
  wordList,
  setUserInput
) => {
  if (operation === "read-write") {
    // Generate a random word and shuffle it for the "read-write" operation
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setOperationText(shuffleWord(word));
    setCorrectAnswer(word);
    setIsCorrect(false);
    setWrongAnswerIndex(null);
    setSelectedResult(null);
    setUserInput("");
    setH2Text("");
    return;
  }

  let num1, num2, text, correctResult;
  const maxTries = 100;

  for (let i = 0; i < maxTries; i++) {
    // Generate math operations based on the selected operation type
    switch (operation) {
      case "add-sub":
        if (Math.random() < 0.5) {
          num1 = Math.floor(Math.random() * range) + 1;
          num2 = Math.floor(Math.random() * range) + 1;
          text = `${num1} + ${num2}`;
          correctResult = num1 + num2;
        } else {
          num1 = Math.floor(Math.random() * range) + 1;
          num2 = Math.floor(Math.random() * num1) + 1;
          text = `${num1} - ${num2}`;
          correctResult = num1 - num2;
        }
        break;
      case "mul-div":
        range = 100;
        if (Math.random() < 0.5) {
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = Math.floor(Math.random() * 10) + 1;
          text = `${num1} × ${num2}`;
          correctResult = num1 * num2;
        } else {
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = Math.floor(Math.random() * 10) + 1;
          correctResult = num1 * num2;
          while ( num1 % num2 !== 0 ) {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            correctResult = num1 * num2;
          }
          text = `${num1} ÷ ${num2}`;
          correctResult = num1 / num2;
        }
        break;
      default:
        break;
    }

    // Ensure the correct result is within the specified range
    if (correctResult <= range) break;
  }

  // Generate incorrect results and shuffle them with the correct result
  const generatedResults = [{ value: correctResult, correct: true }];
  while (generatedResults.length < 6) {
    let result;
    do {
      result = Math.floor(Math.random() * range * 2) - range;
    } while (result <= 0 || result > range || generatedResults.some(r => r.value === result));
    generatedResults.push({ value: result, correct: false });
  }

  generatedResults.sort(() => Math.random() - 0.5);
  setOperationText(text);
  setResults(
    generatedResults.map((result, index) => ({
      id: `result${index}`,
      text: result.value.toString(),
      correct: result.correct,
    }))
  );
  setCorrectAnswer(correctResult);
  setIsCorrect(false);
  setWrongAnswerIndex(null);
  setSelectedResult(null);
  setH2Text("");
};

export const handleResultClick = (
  operation,
  userInput,
  correctAnswer,
  index,
  results,
  setSelectedResult,
  setIsCorrect,
  setScore,
  setH2Text,
  setWrongAnswerIndex,
  generateOperationAndResults
) => {
  setSelectedResult(index); 

  // Handle result click for "read-write" operation
  if (operation === "read-write") {
    if (checkUserInput(userInput, correctAnswer)) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);
      setH2Text("😊");
      setTimeout(generateOperationAndResults, 500); 
    } else {
      setIsCorrect(false);
      setH2Text("😢");
    }
  } else {
    // Handle result click for math operations
    if (results[index].correct) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);
      setH2Text("😊");
      setTimeout(generateOperationAndResults, 500); 
    } else {
      setWrongAnswerIndex(index);
      setIsCorrect(false);
      setH2Text("😢");
    }
  }
};

export const handleKeyPress = (
  e,
  operation,
  userInput,
  correctAnswer,
  setIsCorrect,
  setScore,
  setH2Text,
  generateNextProblem,
) => {
  // Handle "Enter" key press for "read-write" operation
  if (e.key === "Enter" && operation === "read-write") {
    if (userInput.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
      setH2Text("😊");
      setTimeout(() => {
        setH2Text("");
        setIsCorrect(false);
        generateNextProblem();
      }, 1000);
    } else {
      setIsCorrect(false);
      setH2Text("😢");
      setTimeout(() => {
        setH2Text("");
      }, 1000);
    }
  }
};

export const playFireworkSound = (record) => {
  // Play firework sound
  const audio = new Audio(record);
  audio.play();
};

export const shuffleWord = (word) => {
  // Shuffle the characters in a word
  const shuffled = word
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
  return shuffled === word ? shuffleWord(word) : shuffled;
};

export const checkUserInput = (userInput, correctAnswer) => {
  // Check if user input matches the correct answer
  return userInput.toLowerCase() === correctAnswer.toLowerCase();
};
