import { Models } from "appwrite"
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useJoinRoom, useDeleteRoom } from '@/lib/react-query/queries';
import { IUser } from '@/types';

import RoomForm from '@/components/forms/RoomForm';
import { RoomMessages } from '@/components/shared';
import { Button } from '@/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type RoomBoxProps = {
  currentRoom: Models.Document;
  user: Models.Document | IUser;
  membersList: Models.Document[];
  aMember: boolean; // Assuming aMember is a boolean
};

const RoomBox: React.FC<RoomBoxProps> = ({ currentRoom, user, membersList, aMember }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<string[]>(membersList.map(member => member.$id));
  const [roomDeleted, setRoomDeleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | 0>(0);

  const { mutateAsync: joinRoom } = useJoinRoom();
  const { mutate: deleteRoom } = useDeleteRoom();

  const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    let membersArray = Array.isArray(members) ? [...members] : [];

    if (membersArray.includes(user.id)) {
      membersArray = membersArray.filter((Id) => Id !== user.id);
    } else {
      membersArray.push(user.id);
    }

    setMembers(membersArray);
    joinRoom({ roomId: currentRoom.$id, membersArray });
    navigate(0);
  };

  const handleDeleteRoom = async () => {  
      try {
      await deleteRoom({ roomId: currentRoom?.$id });
      setRoomDeleted(true);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

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

  if (!aMember) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-screen h-[80vh]">
        <p>You are not a member of this chat room.</p>
        <Button
          className="shad-button_primary"
          onClick={(e) => handleJoinRoom(e)}
        >
          Join Room
        </Button>
      </div>
    );
  }

  const value = `https://whispers.blckcube.repl.co/room/${currentRoom.$id}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentRoom.name}`,
          text: 'Send an anonymous message to your friends and let the fun begin! 🕵️‍♂️',
          url: value,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
  };

  return (
    <div className="md:flex flex-col justify-center items-center w-full md:h-[100vh]">
      <div className="room-container">
        <div className="fixed md:absolute top-0 left-0 p-[0.4rem] py-4 w-full bg-dark-2 ">
          <div className="flex-between items-center">
            <div className="flex items-center gap-1">
              <Link to="/profile" className="p-0">
                <img
                  src="/assets/icons/back.svg"
                  width={24}
                  height={24}
                  alt="back"
                />
              </Link>
              <div className="flex items-center gap-2">
                <img
                  src={currentRoom.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="profile"
                  className="w-[2.6rem] h-[2.6rem] rounded-full"
                />
                <span>
                  <p className="base-semibold">{currentRoom.name}</p>
                  <p className="small-regular text-light-3">
                    {currentRoom.members.length} member{currentRoom.members.length > 1 ? "s" : ""}
                  </p>
                </span>
              </div>
            </div>

            <span>
              <DropdownMenu>
                <DropdownMenuTrigger className="border-0 outline-none">
                  <img
                    src="/assets/icons/ellipsis-v.svg"
                    width={24}
                    height={24}
                    alt="info"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Button>Room Info</Button>
                  <Button onClick={handleShare}>Share</Button>
                  {user.id !== currentRoom.owner?.$id ? (
                    <Button onClick={(e) => handleJoinRoom(e)}>Leave Room</Button>
                  ) : (
                    <Button onClick={() => handleDeleteRoom()}>Delete Room</Button>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </div>

        <div className="bg-gray-500 flex flex-col gap-2 items-center text-center mx-auto mt-10 mb-4 w-[80%] rounded-lg p-[1rem] subtle-semibold">
          <p>
            Quick reminder to keep the vibes friendly and cool in the chat room. Spread positivity, be respectful, and report anything off.
          </p>
          <p>
            Let's make every chat awesome! 🚀
          </p>
        </div>

        <RoomMessages currentRoom={currentRoom} user={user} />

        <div className="text-light-3 flex flex-col gap-2 items-center justify-center subtle-semibold">
          <p>This room will be automatically deleted in:</p>
          <p>{formatRemainingTime(remainingTime)}</p>
        </div>

        <div className="absolute bottom-0 left-0 p-[0.4rem] w-full h-[4rem] bg-dark-2">
          <RoomForm room={currentRoom.$id} />
        </div>
      </div>
    </div>
  );
};

const formatRemainingTime = (timeInMilliseconds: number): string => {
  const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeInMilliseconds / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m`;
};

export default RoomBox;