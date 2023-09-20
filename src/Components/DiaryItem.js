import React, { useState, useRef } from "react";
import "./css/DiaryItem.css";
import { emotions } from "../utill";

const DiaryItem = ({ id, title, content, emotion, date, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const handleClickRemove = () => {
    if (window.confirm(`"${title}"를 정말 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };
  const [localDate, setLocalDate] = useState(date);
  const [localEmotion, setLocalEmotion] = useState(emotion);
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
      onEdit(id, localDate, localEmotion, localTitle, localContent);
      toggleIsEdit();
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalDate(date);
    setLocalEmotion(emotion);
    setLocalTitle(title);
    setLocalContent(content);
  };

  return (
    <div className="DiaryItem">
      {isEdit ? (
        <>
          <div className="title">
            <input
              ref={localTitleInput}
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
            />
          </div>
          <div className="date">
            <input
              type="date"
              value={localDate}
              onChange={(e) => setLocalDate(e.target.value)}
            />
          </div>
          <div className="emotion">
            {emotions.map((emotion) => (
              <div>
                <input
                  id={emotion.id}
                  type="radio"
                  value={localEmotion.value}
                  checked={localEmotion === emotion.value}
                  onChange={(e) => setLocalEmotion(e.target.value)}
                />
                <label for={emotion.id} key={emotion.id}>
                  {emotion.label}
                </label>
              </div>
            ))}
          </div>
          <div className="content">
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
          </div>
        </>
      ) : (
        <>
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="date">{date}</div>
          <div className="emotion">{emotion}</div>
          <div className="content">{content}</div>

          <div className="buttons">
            <button onClick={handleClickRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
