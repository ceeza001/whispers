import { Models } from "appwrite";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import client, { appwriteConfig } from "@/lib/appwrite/config";
import { useDeleteRoom } from '@/lib/react-query/queries';
import { IUser } from '@/types';

import { Loader } from "@/components/shared"
import { Button } from '@/components/ui';

type RoomMessagesProps = {
  currentRoom: Models.Document;
  user: Models.Document | IUser;
};

type Message = {
  $id?: string;
  sender?: {
    $id?: string;
  };
  content?: string;
};

const RoomMessages = ({ currentRoom, user }: RoomMessagesProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [remainingTime, setRemainingTime] = useState<number | 0>(0);
  const [roomDeleted, setRoomDeleted] = useState(false);
  
  const { mutate: deleteRoom } = useDeleteRoom();
  
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

  useEffect(() => {
    const calculateRemainingTime = () => {
      const timeDifference = new Date().getTime() - new Date(currentRoom.$createdAt).getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      if (daysDifference > 2) {
        handleDeleteRoom();
      } else {
        const remainingTimeMillis = 2 * 24 * 60 * 60 * 1000 - timeDifference;
        setRemainingTime(remainingTimeMillis);

        const intervalId = setInterval(() => {
          setRemainingTime((prevTime: number | 0) => (prevTime !== 0 ? prevTime - 1000 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
      }
    };

    calculateRemainingTime();
  }, [currentRoom.$createdAt, currentRoom.$id]);

  const handleDeleteRoom = async () => {  
      try {
      await deleteRoom({ roomId: currentRoom?.$id });
      setRoomDeleted(true);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  if (roomDeleted) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center w-screen h-[80vh]">
        <p className="text-light-3 text-center">This room has been deleted</p>
        <Button onClick={() => navigate(-1)} className="shad-button_primary">
          Back
        </Button>
      </div>
    );
  }
  
  return (
  		<div className="h-full md:h-full overflow-scroll max-w-[600px] mx-auto p-[0.4rem] md:border-x">
        <div className="bg-gray-500 flex flex-col gap-2 items-center text-center mx-auto mt-10 mb-4 w-[80%] rounded-lg p-[1rem] subtle-semibold">
          <p>
            Quick reminder to keep the vibes friendly and cool in the chat room. Spread positivity, be respectful, and report anything off.
          </p>
          <p>
            Let's make every chat awesome! 🚀
          </p>
        </div>
        
        {!messages ? (
          <div className="flex-center">
            <Loader />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full md:h-full text-center text-gray-500 small-semibold">
            <p>No messages in this chat room yet.</p>
          </div>
        ) : (
          <div>
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

        <div className="text-light-3 flex flex-col gap-2 items-center justify-center subtle-semibold">
          <p>This room will be automatically deleted in:</p>
          <p>{formatRemainingTime(remainingTime)}</p>
        </div>
      </div>
  )
}

const formatRemainingTime = (timeInMilliseconds: number): string => {
  const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeInMilliseconds / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m`;
};

export default RoomMessages