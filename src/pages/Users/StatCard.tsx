import React from "react";

interface StatCardProps {
    title: string;
    count: string;
    type?: string;
}
const StatCard: React.FC<StatCardProps> = ({ title, count, type }) => {
  return (
    <div className={`stat-card ${type || ""}`}>
      <h2>{count}</h2>
      <p>{title}</p>
    </div>
  );
};

export default StatCard;