import "./App.css";
import Footer from "./Componants/Footer";
import Header from "./Componants/Header";
import Sidebar from "./Componants/Sidebar";
import CreatePost from "./Componants/CreatePost";
import PostList from "./Componants/PostList";
import { useState } from "react";
import PostListProvider from "./store/Post-list-store";

function App() {
  const [selectedTab, setselectedTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setselectedTab={setselectedTab} />
        <div className="content">
          <Header />
          {selectedTab === "Home" ? (
            <PostList />
          ) : (
            <CreatePost setselectedTab={setselectedTab} />
          )}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
