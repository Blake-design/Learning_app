import React from "react";
import { Convos, Search, Friends } from ".";
import "./msg-sidebar.css";
import { UsersQueryProp } from "../../../types";
import { QUERY_CONVOS } from "../../../utils/queries";
import { useQuery } from "@apollo/client";

const ChatSidebar = ({ me, selectConvo }: any) => {
  const { loading, data } = useQuery(QUERY_CONVOS);

  return (
    <div className="sb-wrapper">
      <Friends friends={me?.friends} />

      <div className="sb-convos-wrapper">
        <h3 className="sb-title">Chat Rooms - {data?.convos?.length}</h3>
        <Search />
        <Convos convos={data?.convos} handleClick={selectConvo} />
      </div>
    </div>
  );
};

export default ChatSidebar;
