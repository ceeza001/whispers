import { Models } from "appwrite";
import { useState, useEffect } from 'react';
import client, { appwriteConfig } from "@/lib/appwrite/config";
import { Loader } from "@/components/shared"

type RoomMessagesProps = {
  currentRoom: Models.Document;
  user: Models.Document;
};

type Message = {
  $id?: string;
  sender?: {
    $id?: string;
  };
  content?: string;
};

const RoomMessages = ({ currentRoom, user }: RoomMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const getMessages = () => {
    setMessages(currentRoom?.messages || []);
  };
    
  useEffect(() => {
      getMessages();

      const unsubscribe = client.subscribe(
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`,
        (response) => {
          if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            console.log('A MESSAGE WAS CREATED');
            setMessages((prevState: Message[]) => [...prevState, response.payload as Message]);
          }

          if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
            console.log('A MESSAGE WAS DELETED!!!');
            setMessages((prevState: Message[]) => prevState.filter((message) => message?.$id !== (response.payload as Message)?.$id));
          }
        }
      );

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