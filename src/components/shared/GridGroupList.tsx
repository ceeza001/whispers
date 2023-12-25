import { Models } from "appwrite";
import { Link } from "react-router-dom";

type GridPostListProps = {
  room: Models.Document[];
};

const GridGroupList = ({
  room,
}: GridPostListProps) => {
  
  return (
      <li key={room.$id} className="text-text-color relative min-w-80 h-auto mb-4">
        <Link 
          to={`/room/${room.$id}`}
          className="grid-group_link">
          <span>
            <img
              src={
                room.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="min-w-[4.5rem] w-[4.5rem] h-[4.5rem] rounded-lg"
            />
          </span>
          <div className="flex flex-col gap-2">
            <p
              className='font-bold text-[1rem] text-light-2 line-clamp-2'
            >{room.name}</p>
            <span className="small-bold text-gray-500">
              {room.members.length} member{room.members.length > 1 ? "s" : ""}
            </span>
          </div>
        </Link>
      </li>
  );
};

export default GridGroupList;