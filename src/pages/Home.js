import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import axios from 'axios';
// import { AuthContext } from '../helper/AuthContext';

const Home = () => {

    let navigate = useNavigate();

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([])
    // const { authState } = useContext(AuthContext)
    

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate(`/login`)
        }else {
            axios.get("http://localhost:3001/posts", {
                headers: {accessToken: localStorage.getItem("accessToken")}
            }).then((response) => {
                setListOfPosts(response.data.listOfPosts);
                setLikedPosts(response.data.likedPosts.map((like)=> {
                return like.PostId
            }))
            }).catch(error => {
                console.error("Error fetching post:", error);
            });
        }
        
    }, []); 

    const likeAPost = (postId) => {
        axios.post('http://localhost:3001/likes', {PostId: postId},
         { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then((response) => {
            setListOfPosts(listOfPosts.map((post) => {
                if(post.id === postId) {
                    if(response.data.liked) {
                        return {...post, Likes: [...post.Likes, 0]}
                    } else {
                        const likesArray = post.Likes;
                        likesArray.pop()
                        return {...post, Likes: likesArray}
                    }
                }else {
                    return post
                }
            }))
            if (likedPosts.includes(postId)) {
                setLikedPosts(likedPosts.filter((id) => {
                    return id != postId
                }))
            }else {
                setLikedPosts([...likedPosts, postId])
            }
        }).catch((error) => {
            console.error("Error liking post:", error);
        });

    }
    
    return (
        <div className="home">
            {listOfPosts.map((value, key) => {
                return <div className='home-tweet' key={key}>
                    <div className='tweet'>
                        <Link to={`/profile/${value.UserId}`}><div className='username'>@{value.username}</div></Link>
                        <h3 onClick={() => {navigate(`/post/${value.id}`)}}>{value.title}</h3>
                        <div>{value.postText}</div>
                        <button className={likedPosts.includes(value.id) ? "UnlikeBtn" : "likeBtn"} onClick={() => {likeAPost(value.id)} }>Like</button>
                        <label>  {value.Likes.length}</label>
                    </div>
                    <div className='tweet-line'></div>
                </div>
            })}
        </div>
    );
}

export default Home;
