export const generateOperationAndResults = (operation, range, setOperationText, setResults, setCorrectAnswer, setIsCorrect, setWrongAnswerIndex, setSelectedResult, setH2Text) => {
    let num1, num2, text, correctResult;
  
    do {
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
          if (Math.random() < 0.5) {
            num1 = Math.floor(Math.random() * range) + 1;
            num2 = Math.floor(Math.random() * range) + 1;
            text = `${num1} × ${num2}`;
            correctResult = num1 * num2;
          } else {
            do {
              num1 = Math.floor(Math.random() * range) + 1;
              num2 = Math.floor(Math.random() * range) + 1;
            } while (num1 % num2 !== 0);
            text = `${num1} ÷ ${num2}`;
            correctResult = num1 / num2;
          }
          break;
        default:
          break;
      }
    } while (correctResult > range);
  
    const generatedResults = [{ value: correctResult, correct: true }];
    for (let i = 0; i < 5; i++) {
      let result;
      do {
        result = correctResult + (Math.floor(Math.random() * 5) + 1);
      } while (generatedResults.some((r) => r.value === result));
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
    setSelectedResult(null); // Reset the selected result
    setH2Text("");
  };
  
  export const handleResultClick = (index, results, setSelectedResult, setIsCorrect, setScore, setH2Text, setWrongAnswerIndex, generateOperationAndResults) => {
    setSelectedResult(index);
    if (results[index].correct) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);
      setH2Text("😊");
      setTimeout(() => generateOperationAndResults(), 500); // Delay the new question generation
    } else {
      setWrongAnswerIndex(index);
      setIsCorrect(false);
      setH2Text("😢");
    }
  };
  
  export const playFireworkSound = (record) => {
    const audio = new Audio(record);
    audio.play();
  };
