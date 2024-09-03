import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Users from './components/Users';
import User_edit from './components/User_edit';
import AddUser from './components/AddUser';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index={true} element={<Users />}></Route>
                        <Route path="edit" element={<User_edit />}></Route>
                        <Route path="add" element={<AddUser />}></Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
