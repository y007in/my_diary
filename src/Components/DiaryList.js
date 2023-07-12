import React from "react";
import "./css/DiaryList.css";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ diary, onDelete, onEdit }) => {
  return (
    <div className="DiaryList">
      {diary.map((item) => (
        <DiaryItem
          key={item.id}
          {...item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default DiaryList;
