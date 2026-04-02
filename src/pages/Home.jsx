import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { postsData } from "../data/dummyData";
import API from "../api";

function Home({ theme, setTheme }) {
  const [posts, setPosts] = useState(postsData);

  const fetchPosts = async() =>{
    const resp = await API.get('/post/allposts')
    setPosts(resp.data.posts);
  }
   useEffect(() =>{
    fetchPosts()
   },[])
  return (
    <>
      <Navbar post = {posts} theme={theme} setTheme={setTheme} />

      <div className="container " style={{marginTop:'0.75rem'}}>
        <SearchBar post={posts} />
        <CreatePost fetchPosts = {fetchPosts}  />

        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

export default Home;