import React from 'react';

type OwnProps = {
  wordInfo: any,
};

type PropsType = OwnProps;

const Word: React.FC<PropsType> = ({ wordInfo }: PropsType) => {
  const {
    word,
    transcription,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    image,
    audioMeaning,
    audioExample,
  } = wordInfo;

  return (
    <div>
      <h3>{word}</h3>
      <h4>{transcription}</h4>
      <h5>{wordTranslate}</h5>
      <h6>{textMeaning}</h6>
      <h6>{textMeaningTranslate}</h6>
      <audio src={audioMeaning}>
        <track kind="captions" />
      </audio>
      <h6>{textExample}</h6>
      <h6>{textExampleTranslate}</h6>
      <audio src={audioExample}>
        <track kind="captions" />
      </audio>
      <img src={image} alt={word} />
    </div>
  );
};

export default Word;
