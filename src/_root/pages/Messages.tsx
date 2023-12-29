import { useEffect } from 'react';
import { Models } from "appwrite";

import { GridPostList, Loader } from "@/components/shared";
import { useUpdateStatus, useGetCurrentUser } from "@/lib/react-query/queries";

const Messages = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { mutateAsync: updateStatus } =
    useUpdateStatus();

  useEffect(() => {
    const updateMessages = async () => {
      try {
        await Promise.all(
          currentUser?.room.messages.map((message: Models.Document) =>
            updateStatus({ message: message.$id })
          )
        );
        console.log('All messages updated successfully');
      } catch (error) {
        console.error('Error updating messages:', error);
      }
    };

    updateMessages();

    // Cleanup function if needed
    return () => {
      // Clean-up logic here (if needed)
    };
  }, [currentUser]);

  const message = currentUser?.room.messages
    .map((message: Models.Document) => ({
      ...message,
    }))
    .reverse();
  
  return (
    <div className="relative saved-container">
      <div className="flex gap-2 items-center w-full max-w-5xl">
        <img
          src="/assets/icons/messages.svg"
          width={34}
          height={34}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Your Messages</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {message.length === 0 ? (
            <p className="text-light-4">No available messages, share your profile to friends to start receiving messages</p>
          ) : (
            <GridPostList messages={message} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Messages;