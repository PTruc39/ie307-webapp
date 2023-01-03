import { Route, Routes} from 'react-router-dom';
import React, { useEffect } from "react";
import MangaList from './components/MangaList';
import ChapterList from './components/ChapterList';
import ImageList from './components/ImageList';

function App() {
  return (
    <React.Fragment>
    <main>
      <Routes>
        <Route path="/" element={<MangaList />} />
        <Route path="/chapters/:id" element={<ChapterList />} />
        <Route path="/images/:id" element={<ImageList />} />
      </Routes>
    </main>
    </React.Fragment>
  );
}

export default App;
