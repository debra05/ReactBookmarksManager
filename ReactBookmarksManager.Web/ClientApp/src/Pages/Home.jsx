import React, { use, useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {

    const [topBookmarks, setTopBookmarks] = useState([]);




    useEffect(() => {
        const getTopBookmarks = async () => {
            const { data } = await axios.get('/api/Bookmarks/gettopbookmarks');
            setTopBookmarks(data)
        }
        getTopBookmarks();
    }, []);

    
    return (
        <div>
            <h1> Welcome to the React Bookmark Application.</h1>
            <h3>Top 5 most bookmarked links </h3>
            <table className="table table-hover table-striped table-bordered">
            <thead>
                <tr>
                    <th> Url</th>
                    <th> Count</th>
                </tr>
                </thead>
                <tbody>
                    {topBookmarks.map(bm => (
                        <tr key={bm.url}>
                            <td>
                                <a href={bm.url} target="_blank">
                                    {bm.url}
                                </a>
                            </td>
                            <td>{bm.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        
        </div>

    );
};

export default Home;