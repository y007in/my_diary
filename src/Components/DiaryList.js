import React, { useState, useEffect } from "react";
import "./css/DiaryList.css";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ diary, onDelete, onEdit }) => {
  const [isList, setIsList] = useState(false);
  useEffect(() => {
    setIsList(diary.length === 0); // todo 배열의 길이에 따라 isList 업데이트
  }, [diary]);
  return (
    <div className="DiaryList">
      {isList ? (
        <p className="noDiary">일기를 작성해보세요💌</p>
      ) : (
        diary.map((item) => (
          <DiaryItem
            key={item.id}
            {...item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default DiaryList;
