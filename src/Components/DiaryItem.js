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
  const [localTitle, setLocalTitle] = useState(title);
  const localTitleInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleEdit = () => {
    if (localTitle.length < 1) {
      localTitleInput.current.focus();
      return;
    }

    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`"${title}"를 수정하시겠습니까?`)) {
      onEdit(id, localTitle, localContent);
      toggleIsEdit();
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalTitle(title);
    setLocalContent(content);
  };

  return (
    <div className="DiaryItem">
      {isEdit ? (
        <div className="title">
          <input
            ref={localTitleInput}
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
          />
        </div>
      ) : (
        <div className="title">
          <h1>{title}</h1>
        </div>
      )}

      <div className="date_emotion">
        <div className="date">
          {new Date(parseInt(created_date)).toLocaleDateString()}
        </div>
        <div className="emotion">{emotion}</div>
      </div>

      {isEdit ? (
        <textarea
          ref={localContentInput}
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
        />
      ) : (
        <div className="content">{content}</div>
      )}

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
