import React, { useEffect, useState } from 'react';

type PropsType = {
  word: string;
  inputHandler:(letter: string) => void
};

const WordRandomLetters:React.FC<PropsType> = ({ word, inputHandler }: PropsType) => {
  const [randomWord, setRandomWord] = useState<string[]>([]);

  useEffect(() => {
    const rnd = word.split('').sort(() => Math.random() - 0.5);
    setRandomWord(rnd);
  }, [word]);

  const onClickHandler = (index:number) => {
    const newRandom = randomWord;
    newRandom.splice(index, 1);
    setRandomWord(newRandom);
  };

  return (
    <div className="word-letters-wrapper">
      {
      randomWord.map((el, index) => (
        <div
          role="presentation"
          onClick={() => { inputHandler(el); onClickHandler(index); }}
          onKeyDown={() => { inputHandler(el); onClickHandler(index); }}
          className="word-letter-box"
        >
          {el}
        </div>
      ))
}
    </div>
  );
};

export default WordRandomLetters;
