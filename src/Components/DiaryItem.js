import React, { useState, useRef } from "react";
import "./css/DiaryItem.css";

const DiaryItem = ({
  id,
  title,
  content,
  emotion,
  created_date,
  onDelete,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const handleClickRemove = () => {
    if (window.confirm(`"${title}"를 정말 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`"${title}"를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  return (
    <div className="DiaryItem">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="date_emotion">
        <div className="date">
          {new Date(created_date).toLocaleDateString()}
        </div>
        <div className="emotion">{emotion}</div>
      </div>

      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      <div className="buttons">
        {isEdit ? (
          <>
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
          </>
        ) : (
          <>
            <button onClick={handleClickRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DiaryItem;
