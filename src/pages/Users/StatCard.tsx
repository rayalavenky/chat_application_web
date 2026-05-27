import React from "react";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

interface StatCardProps {
  title: string;
  count: string;
  type?: string;
}
const StatCard: React.FC<StatCardProps> = ({ title, count, type }) => {
  return (
    <div className={`stat-card ${type || ""}`}>
      <div className={`stat-icon-wrapper ${type || ""}`}>
        {type === 'total' && <PeopleAltOutlinedIcon className="stat-icon"/>}
        {type === 'active' && <GroupAddOutlinedIcon className="stat-icon"/>}
        {type === 'suspended' && <GroupRemoveOutlinedIcon className="stat-icon"/>}
        {type === 'pending' && <EmailOutlinedIcon className="stat-icon"/>}
      </div>
      <div>
        <h2>{count}</h2>
        <p>{title.toLocaleUpperCase()}</p>
      </div>
    </div>
  );
};

export default StatCard;
