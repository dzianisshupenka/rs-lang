/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Switch } from '@material-ui/core';
import { AppStateType } from '../../../redux/store';
import styles from '../Words.module.css';
import './Modal.css';
import SettingsIcon from '../../Common/SettingsIcon';
import {
  setIsTranslationShown, SetIsTranslationShownType,
  setIsHardWordsBtnShown, SetIsHardWordsBtnShownType,
  setIsDeleteWordBtnShown, SetIsDeleteWordBtnShownType,
} from '../../../redux/textbook-settings-reducer';

type MapStateToPropsType = {
  isTranslationShown: boolean,
  isHardWordsBtnShown: boolean,
  isDeleteWordBtnShown: boolean,
};

type MapDispatchToPropsType = {
  setIsTranslationShown: (isTranslationShown: boolean) => SetIsTranslationShownType,
  setIsHardWordsBtnShown: (isHardWordsBtnShown: boolean) => SetIsHardWordsBtnShownType,
  setIsDeleteWordBtnShown: (isDeleteWordBtnShown: boolean) => SetIsDeleteWordBtnShownType,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const TextbookSettings: React.FC<PropsType> = ({
  isTranslationShown,
  isHardWordsBtnShown,
  isDeleteWordBtnShown,
  setIsTranslationShown,
  setIsHardWordsBtnShown,
  setIsDeleteWordBtnShown,
}: PropsType) => (
  <span className={styles.settings}>
    <a href="#win1" className="button button-blue">
      <SettingsIcon width="25px" />
      Настройки
    </a>
    <a href="#x" className="overlay" id="win1" />
    <div className="popup">
      <FormControlLabel
        control={(
          <Switch
            checked={isTranslationShown}
            onChange={(event) => setIsTranslationShown(event.target.checked)}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
            )}
        label="Отображать перевод слова и предложений с ним"
        value="Отображать перевод слова и предложений с ним"
        labelPlacement="start"
      />
      <FormControlLabel
        control={(
          <Switch
            checked={isHardWordsBtnShown}
            onChange={(event) => setIsHardWordsBtnShown(event.target.checked)}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
            )}
        label={'Отображать кнопку "Добавить в Сложные слова"'}
        value={'Отображать кнопку "Добавить в Сложные слова"'}
        labelPlacement="start"
      />
      <FormControlLabel
        control={(
          <Switch
            checked={isDeleteWordBtnShown}
            onChange={(event) => setIsDeleteWordBtnShown(event.target.checked)}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
            )}
        label={'Отображать кнопку "Добавить в Удалeнные слова"'}
        value={'Отображать кнопку "Добавить в Удалeнные слова"'}
        labelPlacement="start"
      />
      <a className="close" title="Закрыть" href="#close" />
    </div>
  </span>
);

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isTranslationShown: state.textbookSettings.isTranslationShown,
  isHardWordsBtnShown: state.textbookSettings.isHardWordsBtnShown,
  isDeleteWordBtnShown: state.textbookSettings.isDeleteWordBtnShown,
});

export default connect(mapStateToProps, {
  setIsTranslationShown, setIsHardWordsBtnShown, setIsDeleteWordBtnShown,
})(TextbookSettings);
