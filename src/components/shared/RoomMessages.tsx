import { Models } from "appwrite";
import { useState, useEffect } from 'react';

import client, { appwriteConfig } from "@/lib/appwrite/config";
import { IUser } from '@/types';

import { Loader } from "@/components/shared"

type RoomMessagesProps = {
  currentRoom: Models.Document;
  messages: Models.Document[];
  user: Models.Document | IUser;
};

const RoomMessages = ({ currentRoom, user, messages }: RoomMessagesProps) => {
  
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
            {messages.map((message, index) => (
              <div key={message.$id} className={`flex flex-col gap-[2px] w-full ${message.sender?.$id == user?.id && " items-end"}`}>
                <p className="text-[11px]">~ {message.sender.$id}</p>
                <div className={`max-w-[15rem] w-fit bg-primary-600 rounded-lg p-[0.5rem] mx-[2px] my-2 ${message.sender?.$id !== user?.id && ("glassmorphism")}`}>
                  <p className="text-light-2 body-normal">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
  )
}

export default RoomMessages