import React, { useState, useRef } from "react";
import "./css/DiaryEditor.css";

const DiaryEditor = ({ onCreate }) => {
  const [state, setState] = useState({
    title: "",
    content: "",
    emotion: "😆",
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
      emotion: "😆",
    });
  };
  return (
    <div className="DiaryEditor">
      <h1>Today🎧</h1>
      <div className="user_text">
        <div className="date">Date : {new Date().toLocaleDateString()}</div>
        <div className="emotion">
          <select
            name="emotion"
            value={state.emotion}
            onChange={handleChangeState}
          >
            <option value={"😆"}>최고임!!!</option>
            <option value={"😊"}>좋아</option>
            <option value={"😐"}>그냥 그래</option>
            <option value={"😣"}>별로..</option>
            <option value={"😡"}>화딱지남</option>
          </select>
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
