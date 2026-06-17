import React from 'react';
import { Button, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const OrbitCard = ({ user }: any) => {
  const initials =
    `${user.firstName?.charAt(0) ?? ''}${user.lastName?.charAt(0) ?? ''}`.toUpperCase();
  const handle = `@${(user.firstName ?? '').toLowerCase()}.${(user.lastName ?? '').toLowerCase()}`;

  return (
    <div className="orbit-card">
      <div className="orbit-card__avatar">
        {initials}
        <span className={`status ${user.isOnline ? 'online' : ''}`} />
      </div>

      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p className="handle">{handle}</p>
      <p className="meta">{user.email}</p>

      <div className="orbit-card__actions">
        <Button variant="contained" size="small" className='message'>
          Message
        </Button>
        <IconButton size="small" className='more'>
          <MoreHorizIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default OrbitCard;