import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UpdatePops from "./website/context/updateProfile";
import AddNewPost from './website/context/newPost';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowComm from './website/context/Comments';
import UpdateUsers from './website/context/updateUser';
import UpdatePost from './website/context/updatePost';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShowComm>
      <UpdateUsers>
    <UpdatePops>
      <AddNewPost>
        <UpdatePost>

    <App />
        </UpdatePost>
      </AddNewPost>
    </UpdatePops>
      </UpdateUsers>
    </ShowComm>
  </React.StrictMode>
);


