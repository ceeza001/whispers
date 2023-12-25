import React, { useState, useEffect } from 'react';
import client, { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Query, Permission, Role} from 'appwrite';
import { databases } from "@/lib/appwrite/config"; // Check if it's the correct import path

type RoomMessagesProps = {
  currentRoom: Models.Document;
  user: Models.Document;
};
const RoomMessages = ({ currentRoom, user }: RoomMessagesProps) => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    setMessages(currentRoom?.messages);
  }
    
  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const unsubscribe = client.subscribe(`databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`, response => {
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log('A MESSAGE WAS CREATED');
        setMessages(prevState => [...prevState, response.payload]);
      }

      if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log('A MESSAGE WAS DELETED!!!');
        setMessages(prevState => prevState.filter(message => message?.$id !== response.payload?.$id));
      }
    });

    console.log('unsubscribe:', unsubscribe);

    return () => {
      unsubscribe();
    };
  }, [user.id, currentRoom]);


  return (
  		<>
        {!messages ? (
          <div className="flex-center">
            <Loader />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full md:h-full text-center text-gray-500 small-semibold">
            <p>No messages in this chat room yet.</p>
          </div>
        ) : (
          <div className="h-full md:h-full overflow-scroll">
            {messages.map((message) => (
              <div key={message.$id} className={`grid w-full ${message.sender?.$id == user?.id && " justify-end"}`}>
                <div className={`max-w-[15rem] w-fit bg-primary-600 rounded-lg p-[0.5rem] mx-[2px] my-2 ${message.sender?.$id !== user?.id && ("glassmorphism")}`}>
                  <p className="text-light-2 body-normal">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </>
  )
}

export default RoomMessages