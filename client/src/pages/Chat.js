import "./Chat.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import ChatService from "../services/ChatService";

function Chat({ socket }) {
  const [state, dispatch] = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { flightId } = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      ChatService.getMessages(flightId)
        .then((response) => {
          setMessageList(response.data);
          const div = document.getElementById("scroll-to-bottom");
          div.scrollTop = div.scrollHeight;
        })
        .catch((error) => {
          console.error(error);
          clearInterval(interval);
        });
    }, 3000);

    return () => clearInterval(interval);
  });

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    return formattedDate;
  };

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        author: state.user.name,
        authorId: state.user.id,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      ChatService.sendMessage(flightId, messageData)
        .then((response) => {
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
          const div = document.getElementById("scroll-to-bottom");
          div.scrollTop = div.scrollHeight;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="chat-window ">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div id="scroll-to-bottom" className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                className="message"
                id={state.user.name === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{formatDate(messageContent.time)}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <div class="input-group">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
