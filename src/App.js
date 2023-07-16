import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./Components/DiaryEditor";
import DiaryList from "./Components/DiaryList";

function App() {
  const [data, setData] = useState([]);
  // const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dataID = useRef(0);

  const onCreate = (title, content, emotion) => {
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
  const onEdit = (targetId, newTitle, newContent) => {
    const newState = data.map((item) =>
      item.id === targetId
        ? { ...item, title: newTitle, content: newContent }
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
      <h1>📖MY DIARY📖</h1>
      <div className="Diary_container">
        <DiaryEditor onCreate={onCreate} />
        <DiaryList diary={data} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
