import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Profile,
  Settings,
  Messenger,
  Leaderboard,
  Welcome,
} from "./pages/";
import { Footer, Header, Sidebar } from "./layout";
import { themeVar } from "./cache";
import { useQuery } from "@apollo/client";
import { QUERY_USERS, GET_ACTIVE_USERS, QUERY_ME } from "./utils/queries";
import { useSubscription } from "@apollo/client";

function App() {
  const { loading, data } = useQuery(QUERY_USERS);
  const { data: m } = useQuery(QUERY_ME);
  const { data: activeUsers } = useSubscription(GET_ACTIVE_USERS);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={themeVar() === "dark" ? "wrapper dark" : "wrapper"}>
      <Header me={m?.me} />
      <main>
        <Sidebar me={m?.me} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                users={data?.users}
                activeUsers={activeUsers?.userActive || []}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/welcome"
            element={<Welcome me={m?.me} users={data?.users} />}
          />
          <Route path="/:username" element={<Profile me={m?.me} />} />
          <Route path="/settings" element={<Settings me={m?.me} />} />

          <Route
            path="/messenger"
            element={<Messenger users={data?.users} />}
          />
          <Route path="/leaderboard" element={<Leaderboard me={m?.me} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
