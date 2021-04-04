import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';

type OwnProps = {
  currentWordInfo: any,
  wordImage: any,
  wordAudio: any,
  wordAudioMeaning: any,
  wordAudioExample: any,
};

type PropsType = OwnProps;

const WordDescription: React.FC<PropsType> = ({
  currentWordInfo,
  wordImage,
  wordAudio,
  wordAudioMeaning,
  wordAudioExample,
}: PropsType) => {
  if (!currentWordInfo) {
    return <Preloader />;
  }

  const {
    word,
    transcription,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
  } = currentWordInfo;

  return (
    <div>
      <h3>{word}</h3>
      <h4>{transcription}</h4>
      <h5>{wordTranslate}</h5>
      <audio src={wordAudio}>
        <track kind="captions" />
      </audio>
      <h6>{textMeaning}</h6>
      <h6>{textMeaningTranslate}</h6>
      <audio src={wordAudioMeaning}>
        <track kind="captions" />
      </audio>
      <h6>{textExample}</h6>
      <h6>{textExampleTranslate}</h6>
      <audio src={wordAudioExample}>
        <track kind="captions" />
      </audio>
      <img src={wordImage} alt={word} />
    </div>
  );
};

export default WordDescription;
