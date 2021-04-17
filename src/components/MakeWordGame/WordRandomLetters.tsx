import React, { useEffect, useState } from 'react';

type PropsType = {
  word: string;
  clickedLetter: string
  clickedTime: number
  inputHandler:(letter: string) => void
};

const WordRandomLetters:React.FC<PropsType> = ({
  word,
  clickedLetter,
  clickedTime,
  inputHandler,
}: PropsType) => {
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

  useEffect(() => {
    if (clickedLetter !== '' && randomWord.includes(clickedLetter)) {
      const index = randomWord.indexOf(clickedLetter);
      onClickHandler(index);
    }
  }, [clickedTime]);

  return (
    <div className="word-letters-wrapper">
      {
      randomWord.map((el, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={el + index}
          role="presentation"
          onClick={() => { inputHandler(el); onClickHandler(index); }}
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
