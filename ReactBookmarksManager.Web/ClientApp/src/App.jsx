import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { AuthProvider } from './AuthContext';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import AddBookmark from './Pages/AddBookmark';
import MyBookmarks from './Pages/MyBookmarks';

import Layout from './components/Layout';
const App = () => {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/addbookmark' element={<AddBookmark />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/mybookmarks' element={<MyBookmarks />} />

                </Routes>
            </Layout>
        </AuthProvider>
    );
}

export default App;