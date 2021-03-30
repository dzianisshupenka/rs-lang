import React, { useState } from 'react';
import Avatar from '../../components/Avatar';

// todo file deletes onChange. Fix it.
export default function SetAvatar() {
  async function setAvatarhandler(e: any, calllback: Function) {
    const file = e.target.files[0];
    if (file && file.size) {
      const reader = new FileReader();
      reader.onload = async () => {
        calllback(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      calllback('');
    }
  }
  const [avatarSrc, setavatarSrc] = useState('');
  return (
    <>
      <Avatar src={avatarSrc} width={180} height={180} />
      <label htmlFor="fileInput" className="LabelAsButton">
        {' '}
        Chose avatar
        <input
          name="avatar"
          accept="image/*"
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => setAvatarhandler(e, setavatarSrc)}
        />
      </label>
    </>
  );
}
