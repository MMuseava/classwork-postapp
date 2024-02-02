import React, { useEffect, useState } from 'react'

const getUrl = "https://jsonplaceholder.typicode.com/users/1/posts";
const postUrl = "https://jsonplaceholder.typicode.com/posts";

const defaultData = {
    id: "",
    title: "",
    userId: 1,
};

const PostApp = () => {
    const [posts, setPosts] = useState([]);
    const [singlePost,setSinglePost]=useState(defaultData)

    useEffect(() => {
        getPosts();
    },[]);

    const getPosts = async () => {
        try {
            const response = await fetch(getUrl);
            const data = await response.json();
            setPosts(data)
        } catch (error) {
            console.log("error",error)
        }
    };

    const writePost = async () => {
        try {
            const response = fetch(postUrl,{
                method: 'POST',
                body: JSON.stringify(singlePost),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = (await response).json();
            setPosts([data, ...posts]);
        } catch (error) {
            console.log("error", error);
        }      
    }

    const onInputChange = (e) => {
        setSinglePost({ ...singlePost, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();   
        writePost();
        setSinglePost(defaultData);
    }
  return (
      <div>
          
          <form onSubmit={onSubmitHandler}>
              <input
                  name='title'
                  type='text'
                  placeholder='put title'
                  onChange={onInputChange }
                  value={singlePost.title}
              />
              <input
                  name='body'
                  type='text'
                  placeholder='tell your thought'
                  onChange={onInputChange }
                  value={singlePost.body}
              />
              <button type='submit'>Post</button>
          </form>
          <div>
              {posts.map((el) => {
                  return (
                      <div key={el.id}>
                          <h3>{el.title}</h3>
                          <p>{el.body}</p>
                      </div>
                  );
              })}
          </div>
    </div>
  )
}

export default PostApp