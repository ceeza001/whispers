import { useState, useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import{CopyToClipboard} from 'react-copy-to-clipboard';
import { TiTick } from 'react-icons/ti';
import { FaCopy } from 'react-icons/fa';

import { INavLink } from "@/types";
import { Loader } from "@/components/shared/";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useSignOutAccount } from "@/lib/react-query/queries";
import { navbarLinks } from "@/constants";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const navLinks = [
  {id: 1, title: "Home", path: "/home"},
  {id: 2, title: "Support", path: "/support"},
  {id: 3, title: "Faq", path: "/faq"},
  {id: 4, title: "About", path: "/about"},
];

const Topbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, isLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const [copied, setCopied] = useState(false);

  const { data: currentUser } = useGetUserById(user.id || "");

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  const value = currentUser?.room ? `https://whispers.blckcube.repl.co/${currentUser.room.$id}` : '';

  return (
    <section className="topbar black-glassmorphism">
      <div className="flex-between items-center py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <h4 className="text-[1.5rem] font-bold hover-font">Whispers</h4>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className="flex flex-col items-center justify-center gap-[1px]"
            >
              {link.title}
              {pathname.includes(link.path) && (
                <hr className="border-primary-600 w-full border-[1px]" />
              )}
            </NavLink>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          {pathname =='/' && (
            <Link
              to="/sign-up"
              className="border-2 border-primary-500 rounded-lg p-2">
              Get Started
            </Link>
          )}
          <div className="flex gap-4 md:hidden">
            <Sheet>
              <SheetTrigger>
                <img
                  src="/assets/icons/menu.svg"
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    {isLoading ? (
                      <div className="my-4 py-4 h-14">
                        <Loader />
                      </div>
                    ) : (
                      <div className="flex flex-col mt-4 gap-3">
                        <div className="flex flex-col gap-3 items-center justify-center w-full">
                          <img
                            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                            alt="profile"
                            className="h-14 w-14 rounded-full"
                          />
                          <div className="text-center">
                            <p className="body-bold">{user.username}</p>
                          </div>
                        </div>
                        <span className="mx-auto max-w-[10rem] small-regular text-light-3 cursor-pointer">
                          {currentUser ? (
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
                          ) : (
                            <>Anonymous user</>
                          )}
                        </span>
                      </div>
                    )}
                    <hr className="border my-4 w-full border-dark-4/80" />
                  </SheetTitle>
                  <SheetDescription>
                    <div className="h-[70vh] flex flex-col justify-between">
                      <ul className="flex flex-col gap-2">
                        {navbarLinks.map((link: INavLink) => {
                          return (
                            <li
                              key={link.label}
                              className={`leftsidebar-link group`}
                            >
                              <NavLink
                                to={link.route}
                              >
                                <SheetTrigger
                                  className="w-full flex gap-4 items-center py-2 px-4"
                                >
                                  <img
                                    src={link.imgURL}
                                    alt={link.label}
                                    className={`w-[1.6rem] h-[1.6rem] invert-white`}
                                  />
                                  {link.label}
                                </SheetTrigger>
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="absolute bottom-10 left-0 p-[1rem] w-full flex flex-col gap-2">
                        <hr className="border my-4 w-full border-dark-4/80" />

                        {currentUser ? (
                          <Button
                            variant="ghost"
                            className="shad-button_primary"
                            onClick={() => signOut()}>
                            <img 
                              src="/assets/icons/logout.svg" 
                              alt="logout"
                              className="invert-white"
                            />
                            <p>Logout</p>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            className="shad-button_primary"
                            onClick={() => navigate("/sign-in")}>
                            <img 
                              src="/assets/icons/login.svg" 
                              alt="login"
                              width={24}
                              height={24}
                              className="invert-white"
                            />
                            <p>Signin</p>
                          </Button>
                        )}
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topbar;