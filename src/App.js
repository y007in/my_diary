import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./Components/DiaryEditor";
import DiaryList from "./Components/DiaryList";

function App() {
  const [data, setData] = useState([]);
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
    setData([newItem, ...data]);
  };
  const onDelete = (targetId) => {
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
  };
  const onEdit = (targetId, newContent) => {
    //newContent : 새롭게 수정되어질 내용
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };
  return (
    <div className="App">
      <div className="Diary_container">
        <DiaryEditor onCreate={onCreate} />
        <DiaryList diary={data} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
