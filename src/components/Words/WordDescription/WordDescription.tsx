import React from 'react';
import { AddDeletedWordIdType, AddHardWordIdType } from '../../../redux/dictionary-reducer';
import Preloader from '../../Common/Preloader/Preloader';

type OwnProps = {
  currentWordInfo: any,
  wordImage: any,
  wordAudio: any,
  wordAudioMeaning: any,
  wordAudioExample: any,
  isTranslationShown: boolean,
  addHardWordId: (wordId: string) => AddHardWordIdType,
  addDeletedWordId: (wordId: string) => AddDeletedWordIdType,
};

type PropsType = OwnProps;

const WordDescription: React.FC<PropsType> = ({
  currentWordInfo,
  wordImage,
  wordAudio,
  wordAudioMeaning,
  wordAudioExample,
  isTranslationShown,
  addHardWordId,
  addDeletedWordId,
}: PropsType) => {
  if (!currentWordInfo) {
    return <Preloader />;
  }

  const {
    id,
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
      { isTranslationShown && <h5>{wordTranslate}</h5>}
      <audio src={wordAudio}>
        <track kind="captions" />
      </audio>
      <h6>{textMeaning}</h6>
      { isTranslationShown && <h6>{textMeaningTranslate}</h6>}
      <audio src={wordAudioMeaning}>
        <track kind="captions" />
      </audio>
      <h6>{textExample}</h6>
      { isTranslationShown && <h6>{textExampleTranslate}</h6>}
      <audio src={wordAudioExample}>
        <track kind="captions" />
      </audio>
      <button
        type="button"
        onClick={() => addHardWordId(id)}
      >
        Добавить в сложные слова
      </button>
      <button
        type="button"
        onClick={() => addDeletedWordId(id)}
      >
        Добавить в удаленные слова
      </button>
      <img src={wordImage} alt={word} />
    </div>
  );
};

export default WordDescription;
