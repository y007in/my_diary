import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./Components/DiaryEditor";
import DiaryList from "./Components/DiaryList";

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState(false);

  const onClickList = () => {
    setList(!list);
  };
  // const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dataID = useRef(0);

  const onCreate = (title, date, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      id: dataID.current,
      title,
      content,
      emotion,
      created_date,
    };

    dataID.current += 1;
    const newState = [newItem, ...data];
    setData(newState);
    localStorage.setItem("diary", JSON.stringify(newState));
  };
  const onDelete = (targetId) => {
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
    localStorage.setItem(`diary`, JSON.stringify(newDiaryList));
  };
  const onEdit = (targetId, created_date, newTitle, newContent) => {
    const newState = data.map((item) =>
      item.id === targetId
        ? {
            ...item,
            title: newTitle,
            created_date,
            content: newContent,
          }
        : item
    );
    setData(newState);
    localStorage.setItem("diary", JSON.stringify(newState));
  };
  useEffect(() => {
    const storeData = localStorage.getItem("diary");
    if (storeData) {
      setData(JSON.parse(storeData));
    }
  }, []);

  return (
    <div className="App">
      {/* <h1>📖MY DIARY📖</h1> */}
      <div className="Diary_container">
        {" "}
        <div className="left">
          <DiaryEditor onCreate={onCreate} />
          {list ? (
            <button className="listBtn" onClick={onClickList}>
              일기 닫기
            </button>
          ) : (
            <button className="listBtn" onClick={onClickList}>
              일기 보기
            </button>
          )}
        </div>
        {list ? (
          <div className="right">
            <DiaryList diary={data} onDelete={onDelete} onEdit={onEdit} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
