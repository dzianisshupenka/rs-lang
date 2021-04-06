import React, { useEffect, useState } from 'react';
import bcg1 from '../../assets/images/savanna-backgrounds/Untitled-1.png';
import bcg2 from '../../assets/images/savanna-backgrounds/Untitled-2.png';
import bcg3 from '../../assets/images/savanna-backgrounds/Untitled-3.png';
import bcg4 from '../../assets/images/savanna-backgrounds/Untitled-4.png';
import bcg5 from '../../assets/images/savanna-backgrounds/Untitled-5.png';
import bcg6 from '../../assets/images/savanna-backgrounds/Untitled-6.png';

const SavannaGame:React.FC = () => {
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);
  const [x3, setX3] = useState(0);
  const [x4, setX4] = useState(0);
  const [x5, setX5] = useState(0);
  const [x6, setX6] = useState(0);
  const [top, setTop] = useState(-40);
  const [width, setWidth] = useState(300);
  const [wordInd, setWordInd] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [border, setBorder] = useState(0);

  const MoveDecor = (x: number) => {
    if (x > 120) {
      return x - 15;
    }
    if (x < -120) {
      return x + 15;
    }
    return x + Math.round(Math.random() * 15) - 7;
  };

  const newWord = () => {
    setWidth(0);
    setSpeed(1);
    setTimeout(() => {
      setBorder(3);
    }, 200);
  };

  const move = () => {
    setX1(MoveDecor(x1));
    setX2(MoveDecor(x2));
    setX3(MoveDecor(x3));
    setX4(MoveDecor(x4));
    setX5(MoveDecor(x5));
    setX6(MoveDecor(x6));
  };

  useEffect(() => {
    if (speed > 0 && top < 500) {
      setTop((prev) => prev + speed);
    }
  }, [top]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTop((prev) => prev + 1);
    }, 15);
    return () => clearInterval(timer);
  }, []);

  if (top >= 500) {
    setTop(-40);
    setWidth(300);
    setSpeed(0);
    setBorder(0);
    setWordInd(wordInd + 1);
    move();
  }

  return (
    <div className="savanna-wrapper">
      <img style={{ zIndex: 3, transform: `translateX(${x1}px)` }} src={bcg1} alt="bcg1" />
      <img style={{ zIndex: 3, transform: `translateX(${x2}px)` }} src={bcg2} alt="bcg2" />
      <img style={{ zIndex: 3, transform: `translateX(${x3}px)` }} src={bcg3} alt="bcg3" />
      <img style={{ zIndex: 2, transform: `translateX(${x4}px)` }} src={bcg4} alt="bcg4" />
      <img style={{ zIndex: 1, transform: `translateX(${x5}px)` }} src={bcg5} alt="bcg5" />
      <img style={{ zIndex: 1, transform: `translateX(${x6}px)` }} src={bcg6} alt="bcg6" />
      <div className="game-content">
        <div
          style={{
            top: `${top}px`,
            width: `${width}px`,
            borderRight: `${border}px solid white`,
          }}
          className="active-word"
        >
          game
        </div>
        <div className="savanna-answers">
          <button type="button" onClick={() => newWord()} className="answer-word">ans1</button>
          <button type="button" className="answer-word">ans2</button>
          <button type="button" className="answer-word">ans3</button>
          <button type="button" className="answer-word">ans4</button>
        </div>
      </div>
    </div>
  );
};

export default SavannaGame;
