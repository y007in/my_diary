import React, { useState, useRef } from "react";
import "./css/DiaryEditor.css";

const DiaryEditor = ({ onCreate }) => {
  const emotions = [
    { id: "1", value: "😆최고", label: "😆최고" },
    { id: "2", value: "😊좋아", label: "😊좋아" },
    { id: "3", value: "😐그냥그래", label: "😐그냥그래" },
    { id: "4", value: "🙁나빠", label: "🙁나빠" },
    { id: "5", value: "😡매우 나빠", label: "😡매우 나빠" },
  ];
  const [state, setState] = useState({
    title: "",
    content: "",
    emotion: "😆최고",
  });
  const titleInput = useRef();
  const contentInput = useRef();
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }
    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }
    onCreate(state.title, state.content, state.emotion);
    alert("저장 성공");
    setState({
      title: "",
      content: "",
      emotion: "😆최고",
    });
  };
  return (
    <div className="DiaryEditor">
      <h1>Today🎧</h1>
      <div className="user_text">
        <div className="date">Date : {new Date().toLocaleDateString()}</div>
        <div className="emotion">
          {emotions.map((emotion) => (
            <div>
              <input
                id={emotion.id}
                type="radio"
                name="emotion"
                value={emotion.value}
                checked={state.emotion === emotion.value}
                onChange={handleChangeState}
              />
              <label for={emotion.id} key={emotion.id}>
                {emotion.label}
              </label>
            </div>
          ))}
        </div>
        <div className="title">
          <input
            name="title"
            value={state.title}
            onChange={handleChangeState}
            placeholder="제목"
            ref={titleInput}
          />
        </div>
        <div className="content">
          <textarea
            name="content"
            value={state.content}
            onChange={handleChangeState}
            placeholder="일기를 작성하세요!!"
            ref={contentInput}
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleSubmit}>저장</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
