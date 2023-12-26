import { useState, useEffect } from 'react';
import{CopyToClipboard} from 'react-copy-to-clipboard';
import { TiTick } from 'react-icons/ti';
import { FaCopy } from 'react-icons/fa';

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import { 
  useGetUserById,
  useGetUserGroups,
} from "@/lib/react-query/queries";
import { GridGroupList, Loader, CreateRoom, FooterMini } from "@/components/shared";
import { Button } from "@/components/ui"

const Profile = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { data: currentUser } = useGetUserById(user.id || "");
  const { data: groups } = useGetUserGroups(user.id || "");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] min-w-[100vw]">
        <Loader />
      </div>
    );
  } else if (!isLoading && !currentUser) {
    return (
      <div className="profile-container relative">
        <div className="profile-inner_containr">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/assets/icons/profile-placeholder.svg"
              alt="profile"
              className="w-24 h-24 lg:h-36 lg:w-36 rounded-full"
            />
          </div>

          <div className="mt-10 md:mx-4 text-center flex-wrap z-20">
            Ready to experience the magic of Whispers? ✨ Create an account or log in to your existing one to unlock the full potential! 🚀 Share your profile link and dive into the wave of responses from your pals. 🌊 Check out the buzz in "View Messages." Let the good times roll! 🌟
          </div>

          <div className="mt-10 flex justify-between gap-4 items-center">
            <Button
              onClick={() => navigate("/sign-in")}
              className="shad-button_dark_4 w-full"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/sign-up")}
              className="shad-button_primary w-full"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const value = currentUser?.room ? `https://whispers.blckcube.repl.co/${currentUser.room.$id}` : '';

  // Filter groups where current user is a member
  const filteredGroups = groups?.documents.filter(group =>
    group.members.some(member => member === user.id) && group.members.length > 0
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentUser.username}'s profile`,
          text: 'Drop a mystery note! Send me an anonymous message and let the fun begin! 🕵️‍♂️💌',
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

  const unreadMessagesCount = currentUser.room.messages.filter(message => message.status === "unread").length;

  return (
    <><div className="profile-container relative">
      <div className="profile-inner_container">
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-24 h-24 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center h3-bold md:h1-semibold w-full">
                {currentUser.username}
              </h1>
              <span className="mx-auto text-center max-w-[15rem] text-gray-500 cursor-pointer">
                <CopyToClipboard 
                  text={value}
                  onCopy={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000); // 5000 milliseconds = 5 seconds
                }}>
                  <span className="flex items-center">
                    <p className="truncate">{value}</p>
                    <span>
                      {copied ?
                        <TiTick />
                      :
                        <FaCopy />
                      }
                    </span>
                  </span>

                </CopyToClipboard>
              </span>
            </div>

            <div className="mt-10 md:mx-4 text-center flex-wrap z-20">
              Unleash the fun! 🎉 Share your profile link and catch the wave of responses from your pals. 🚀 Check out the buzz in "View Messages." Let the good times roll! 🌟
            </div>
          </div>

          <div className="flex flex-col gap-4 max-w-full">
            <div className="flex w-full gap-4">
              <Link
                to={`/update-profile/${currentUser?.$id}`}
                className="profile-tab rounded-lg"
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                  className="invert-white"
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
              <button onClick={handleShare}
                className="profile-tab rounded-lg py-4">
                <img
                  src={"/assets/icons/share.svg"}
                  alt="share"
                  width={24}
                  height={24}
                  className="invert-white"
                />
                Share Profile
              </button>
            </div>
            <div className="flex gap-4 w-full">
              <Link
                to={`/messages`}
                className="profile-tab rounded-lg relative">
                <img
                  src={"/assets/icons/messages.svg"}
                  alt="posts"
                  width={24}
                  height={24}
                />
                Messages
                {unreadMessagesCount > 0 && (
                  <span className="absolute top-[5%] right-2 rounded-full bg-red px-[6px] py-[2px] text-white text-xs font-bold z-10">
                    {unreadMessagesCount}
                  </span>
                )}
              </Link>
              <CreateRoom />
            </div>


          </div>
        </div>
      </div>

      <div className="w-full mt-20 md:mt-2">

      <div className="flex-between w-full max-w-5xl mt-6 mb-7">
        <h3 className="body-bold md:h3-bold">Your rooms</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="w-full max-w-5xl">
        {filteredGroups && filteredGroups?.length === 0 ? (
          <p className="text-light-4 text-center w-full">
            You are not in any chat room
          </p>
        ) : (
          <>
            {filteredGroups?.map((room) => (
            <ul className="flex flex-col gap-4">
              <GridGroupList room={room} />
            </ul>
            ))}
          </>
        )}
      </div>
      </div>
      
    </div>
      <FooterMini />
    </>
  );
};

export default Profile;
