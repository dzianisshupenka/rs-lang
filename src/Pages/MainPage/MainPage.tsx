/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const MainPage:React.FC = () => (
  <div className="main">
    <p className="main__text1">Изучайте языки с RSLang бесплатно. Всегда</p>
    <p className="main__text2">Приложение для изучения иностранных слов с техникой интервального повторения, остлеживания индивидуального прогресса и мини-игр</p>
    <div className="main__buttons">
      <ul className="main__buttons-list">
        <li className="main__buttons-list-border"><a href="#">Смотреть видео</a></li>
        <li className="main__buttons-list-border"><a href="#">Начать обучение</a></li>
        <li className="main__buttons-list-border"><a href="#">Наша команда</a></li>
      </ul>
    </div>
  </div>
);
export default MainPage;
