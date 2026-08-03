import { BrowserRouter, Routes, Route } from 'react-router';
import CreateProfile from './routes/CreateProfile';
import Detail from './routes/Detail';
import Feed from './routes/Feed';
import Home from './routes/Home';
import Layout from './routes/Layout';
import PostForm from './routes/PostForm';
import LogIn from './routes/LogIn';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create-profile/" element={<CreateProfile />} />
          <Route path="post-detail/:id/" element={<Detail />} />
          <Route path="feed/" element={<Feed />} />
          <Route path="new-post/" element={<PostForm />} />
          <Route path="log-in/" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
