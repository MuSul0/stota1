import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Home from '@/pages/Home';  // This import will now work
import Login from '@/pages/Login';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;