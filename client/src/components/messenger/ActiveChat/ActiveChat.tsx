import React from "react";
import { ActiveChatHeader, Messages, Input } from ".";
import "./activeChat.css";
import { useQuery } from "@apollo/client";
import { QUERY_MESSAGES, SUBSCRIBE_MESSAGES } from "../../../utils/queries";
import { ActiveChatProp } from "../../../types/types";

const ActiveChat = ({ currentConvo, me }: ActiveChatProp) => {
  const { subscribeToMore, data } = useQuery(QUERY_MESSAGES, {
    variables: {
      convoId: currentConvo,
    },
  });
  console.log(currentConvo);
  return (
    <section className="chat-window-wrapper">
      <ActiveChatHeader currentConvo={currentConvo} />
      <div className="messages-container">
        <Messages
          messages={data.messages}
          me={me}
          subscribeToMessages={() => {
            console.log("hit 1");
            subscribeToMore({
              document: SUBSCRIBE_MESSAGES,
              variables: { convoId: currentConvo },
              updateQuery: (prev, { subscriptionData }) => {
                console.log("hit 2");
                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.message;
                return Object.assign(
                  {},
                  {
                    messages: [...prev.messages, newMessage],
                  }
                );
              },
            });
          }}
        />
        <Input currentConvo={currentConvo} />
      </div>
    </section>
  );
};

export default ActiveChat;
