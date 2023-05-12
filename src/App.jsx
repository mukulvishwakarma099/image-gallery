import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PreviewImage from "./components/PreviewImage";
import Home from "./components/Home";
import Login from "./components/Login";

const db = new Dexie("images");
db.version(1).stores({
  image: "id, url, caption, date, select ",
});

export const { image } = db;

function App() {
  const allImages = useLiveQuery(() => image.toArray());

  // to add images when nothing to display
  // image.bulkAdd(data).then(() => {
  //   console.log("done adding");
  // });

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Home allImages={allImages} image={image} />}
          />
          <Route
            path="/preview/:id"
            element={<PreviewImage allImages={allImages} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
