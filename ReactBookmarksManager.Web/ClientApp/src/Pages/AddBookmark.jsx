
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AddBookmark = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ title: '', url: '' });

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmarks/addbookmark', formData);
        navigate('/mybookmarks');
    }


    const {title, url} = formData;

    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Add a new Bookmark</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={title} type="text" name="title" placeholder="Title" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={url} type="text" name="url" placeholder="Url" className="form-control" />
                    <br />
                   
                    <button className="btn btn-primary">add</button>
                </form>
            </div>
        </div>
    );
}

export default AddBookmark;
