import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import BookmarkRow from '../components/BookmarkRow';


const MyBookmarks = () => {

    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);
    const [isEditing, setEditMode] = useState([]);
    const [editTitles, setEditTitles] = useState([])

    useEffect(() => {
        getBookmarks();
    }, []);

    const getBookmarks = async () => {
        const { data } = await axios.get('/api/bookmarks/mybookmarks');
        setBookmarks(data);
    };

    const onTitleChange = (id, newTitle) => {
        const updatedTitles = editTitles.map(t => t.id === id ? { ...t, title: newTitle } : t);
        setEditTitles(updatedTitles);
    };

    const onEditClick = (id) => {
        setEditMode(true)
        const bookmark = bookmarks.find(b => b.id === id)
        setEditTitles([...editTitles, { id, title: bookmark.title }]);

    }

    const onCancelClick = id => {
        setEditTitles(editTitles.filter(t => t.id !== id))
        setEditMode(false)
    }

    const onUpdateClick = async (id) => {
        const titleObj = editTitles.find(t => t.id === id);
        await axios.post('/api/bookmarks/update', { id, title: titleObj.title });
        setEditTitles(editTitles.filter(t => t.id !== id));
        setEditMode(false);
        await getBookmarks();        
    }
  
    const onDeleteClick = async (id) => {
        await axios.post('/api/bookmarks/delete', {id});
        getBookmarks();
    };
 

    return (
        <div style={{ marginTop: 20 }}>
            <div className="row">
                <div className="col-md-12">
                    <h1>Welcome back {user.firstName} {user.lastName}</h1>
                    <Link to='/addbookmark' className="btn btn-primary btn-block"> Add Bookmark </Link>
                </div>
            </div>
            <div className="row" style={{ marginTop: 20 }}>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks.map(b => <BookmarkRow key={b.id}
                            bookmark={b}
                            refresh={getBookmarks}
                            onDeleteClick={onDeleteClick}
                            isEditing={editTitles.some(t => t.id === b.id)}
                            onEditClick={onEditClick}
                            onCancelClick={onCancelClick}
                            onUpdateClick={onUpdateClick}
                            onTitleChange={onTitleChange}
                            editTitle={editTitles.find(t => t.id === b.id)}

                        />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookmarks;