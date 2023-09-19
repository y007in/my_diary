import React, { useState, useRef } from "react";
import "./css/DiaryEditor.css";
import { emotions } from "../utill";

const DiaryEditor = ({ onCreate }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

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
    onCreate(state.title, state.date, state.content, state.emotion);
    alert("저장 성공");
    setState({
      title: "",
      date: "",
      content: "",
      emotion: "😆최고",
    });
    console.log(date);
  };
  return (
    <div className="DiaryEditor">
      <h1>Today 🎧</h1>
      <div className="user_text">
        <div className="date">
          Date :
          <input
            className="input_date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
        </div>
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
