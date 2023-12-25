import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui";
import { multiFormatDateString } from "@/lib/utils";

type GridPostListProps = {
  messages: Models.Document[];
};

const GridPostList = ({
  messages,
}: GridPostListProps) => {
  const { user } = useUserContext();
  
  return (
    <ul className="grid-container">
      {messages.map((message, index) => (
        <li key={message.$id} className="text-text-color relative min-w-80 h-auto">
          <div className="grid-poem_link">
            <span className="mb-4 text-center small-regular text-light-3"> ---{message.$id}--- </span>
            <p
              className='body-semibold text-text-color'
            >{message.content}</p>

            <hr className="my-2 w-full border-light-4" />
            <span className="flex justify-between items-center">
              <p className="small-bold text-gray-500">by - Anonymous</p>
              <p className="small-semibold">{multiFormatDateString(message.$createdAt)}</p>
            </span>

            <Button
              className="mt-2 h-10 bg-gray-300 px-5 text-dark-1 flex-center gap-2 rounded-lg">
              <img
                src={"/assets/icons/share.svg"}
                alt="share"
                width={24}
                height={24}
              />
              <p className="flex whitespace-nowrap base-semibold">
                Share message
              </p>
            </Button>
          </div>
        </li>

      ))}
    </ul>
  );
};

export default GridPostList;