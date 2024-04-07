import React, { FC } from 'react';
import './Card.css';

interface CardProps {
  task: string;
  image: string;
  date: string;
  key: number | string;
}

const Card: FC<CardProps> = ({ task, image, date, key }) => {
  return (
    <button className='btn' value='Click'>
      <img src={image} alt='user photo' className='card-image' />
      <div className='card-name'>{task}</div>
      <div className='card-date'>{date}</div>
    </button>
  );
};

export default Card;
