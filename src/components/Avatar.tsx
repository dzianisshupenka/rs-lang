import React, { FC } from 'react';

type Props = {
  width: number;
  height: number;
  src: string;
};

const Avatar: FC<Props> = ({ width, height, src }: Props) => (
  <div className="AvatarWrapper">
    <img
      src={src}
      alt="avatar"
      className="AvatarImg"
      style={{ width, height }}
    />
  </div>
);

export default Avatar;
