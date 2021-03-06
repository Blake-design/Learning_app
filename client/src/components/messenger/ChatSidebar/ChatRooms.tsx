import React, { useCallback } from "react";
import { Convos } from ".";
import { QUERY_CONVOS, SUBSCRIBE_CONVOS } from "../../../utils/queries";
import { useQuery } from "@apollo/client";
import { SelectConvoProp } from "../../../types/types";
import auth from "../../../utils/auth";
import { doSubscriptionAction } from "../../../utils/subscribeToMoreActions";

const ChatRooms = ({ selectConvo }: SelectConvoProp) => {
  const {
    data: { _id },
  } = auth.getUser();

  const { subscribeToMore, data } = useQuery(QUERY_CONVOS);

  return (
    <div className="sb-convos-wrapper">
      <h3 className="sb-title">Chat Rooms - {data?.convos?.length}</h3>

      <Convos
        convos={data?.convos}
        selectConvo={selectConvo}
        subscribeToConvos={useCallback(() => {
          subscribeToMore({
            document: SUBSCRIBE_CONVOS,
            variables: { _id: _id },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              return doSubscriptionAction(prev, { subscriptionData });
            },
          });
        }, [_id, subscribeToMore])}
      />
    </div>
  );
};

export default ChatRooms;
