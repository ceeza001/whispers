import { useParams } from "react-router-dom";

import WriteForm from "@/components/forms/WriteForm";

const Write = () => {
  const { id } = useParams();
  
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Message</h2>
        </div>

        <WriteForm room={id} />
      </div>
    </div>
  );
};

export default Write;