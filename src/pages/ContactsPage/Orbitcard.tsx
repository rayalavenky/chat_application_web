import React from 'react';
import { Button, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const OrbitCard = ({ user }: any) => {
  return (
    <div className="orbit-card">
      <div className="orbit-card__avatar">
        {user.initials}
        <span className={`status ${user.online ? 'online' : ''}`} />
      </div>

      <h3>{user.name}</h3>
      <p className="handle">{user.handle}</p>
      <p className="meta">Sector • {user.mutual} mutual</p>

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