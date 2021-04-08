import React from 'react';
import life from '../../assets/icons/life.png';

type PropsType = {
  lifes: number[],
  height: number
};

const Lifes:React.FC<PropsType> = ({ lifes, height } : PropsType) => (
  <div className="lifes-wrapper" style={{ top: `${height}px` }}>
    {lifes.map((item) => <img src={life} alt={`life${item}`} key={`life${item}`} />)}
  </div>
);

export default Lifes;
