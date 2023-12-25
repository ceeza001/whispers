import { useState } from 'react';
import { useParams } from "react-router-dom";

import {
  useGetRoomById,
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

import { Loader, RoomBox } from "@/components/shared";
import { useToast } from "@/components/ui/use-toast";
import SignupMini from "@/components/forms/SignupMini"
import SigninMini from "@/components/forms/SigninMini"

const Room = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useUserContext();
  const [signin, setSignin] = useState(false);
  
  const { data: currentRoom } = useGetRoomById(id || "");
  
  const membersList = currentRoom?.members.map((user) => user);
  
  if (!currentRoom) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col mx-auto h-full">
        {signin ?
          <SigninMini />
        :
          <SignupMini />
        }
        
        <p className="text-small-regular text-light-2 text-center mt-2">
          {signin ? "Don&apos;t have an account?" : "Already have an account?"}
          {signin ? (
            <span
              onClick={() => setSignin(false)}
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </span>
          ) : (
            <span
              onClick={() => setSignin(true)}
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </span>
          )}
        </p>
      </div>
    )
  }
  
  const aMember = currentRoom.members.some((member) => member === user.id);

  
  return <RoomBox currentRoom={currentRoom} user={user} membersList={membersList} aMember={aMember} />;
};

export default Room;
