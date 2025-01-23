/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/Redux/Chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Chatbox = () => {
  const [message, setMessage] = useState("");
  const [trigger, setTrigger] = useState(false); // State to trigger useEffect whenever message is sent

  const { auth, chat } = useSelector((store) => store);

  const { id } = useParams();
  const dispatch = useDispatch();

  const scrollRef = useRef(null); // Create a ref for the scroll area

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        senderId: auth.user?.id,
        projectId: id,
        content: message,
      })
    );
    setMessage("");
    setTrigger(!trigger);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchChatMessages(id));
  }, [id, trigger]);

  useEffect(() => {
    // Scroll to the bottom whenever chat messages update
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.messages]);

  return (
    <div className="sticky ">
      <div className="border bg-black  rounded-lg ">
        <h1 className="border-b p-2 text-center font-sans text-black text-lg text-white">
          Chat Box
        </h1>
        <div
          ref={scrollRef}
          className="scrollable-container h-[30rem] w-full p-5 flex gap-3 flex-col overflow-y-auto"
        >
          {chat.messages?.map((item, index) =>
            item.sender.id !== auth.user.id ? (
              <div
                key={index}
                className="flex gap-2 mb-2 items-center justify-start"
              >
                <Avatar>
                  <AvatarFallback className="bg-gray-950">
                    <span className="font-sans">{item.sender.name[0]}</span>
                  </AvatarFallback>
                </Avatar>
                <div className="p-2 border rounded-ss-2xl rounded-e-xl bg-gray-950">
                  <p className="font-sans font-semibold">
                    {item.sender.name}
                  </p>
                  <p className="font-sans ">{item.content}</p>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="flex gap-2 mb-2 items-center justify-end"
              >
                <div className="p-2 border rounded-ss-2xl rounded-b-xl bg-gray-950">
                  <p className="font-sans font-semibold ">
                    {item.sender.name}
                  </p>
                  <p className="font-sans">{item.content}</p>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-gray-950">
                    <p className="font-sans">{item.sender.name[0]}</p>
                  </AvatarFallback>
                </Avatar>
              </div>
            )
          )}
        </div>

        <div className="relative p-2 flex justify-between items-center gap-1 ">
          <Input
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyPress}
            placeholder="Type message..."
            className="p-4 font-sans "
          />
          <Button
            onClick={handleSendMessage}
            className="rounded-full border-none bg-black"
            size="icon"
            variant="ghost"
            disabled={!message.trim()}
          >
            <PaperPlaneIcon className="focus:border-none hover:border-none " />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
