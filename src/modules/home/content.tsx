import CommentBtn from "@/modules/home/comment-btn";
import Image from "next/image";
import PostList from "./post-list";
import { DB_NAME } from "@/config/constants";

const Content = () => {
  return (
    <>
      <Image
        src="/images/ct_linkedin_banner.png"
        className="w-full rounded-lg border border-white/10"
        width={1584}
        height={396}
        alt="bitcoin-banner"
      />
      <h1 className="text-2xl font-bold mt-4">Job Resources Hub</h1>
      <p className="text-md text-white/50 mt-2">
        Share and discover valuable job-hunting resources, experiences, and
        tools to help CT students land the ideal job.
      </p>
      <p className="text-sm text-white/40 mt-2">
        *Just a simple side project for practicing full stack development lol
      </p>
      <div className="w-full mt-6">
        <CommentBtn />
      </div>

      <PostList />
    </>
  );
};

export default Content;
