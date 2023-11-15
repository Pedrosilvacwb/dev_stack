import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface QuestionCardProps {
  id: string;
  title: string;
  tags: { id: string; name: string }[];
  author: { id: string; name: string; picture: string; clerkId: string };
  upVotes: string[];
  answers: number;
  views: number;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  clerkId,
  answers,
  createdAt,
  author,
  id,
  tags,
  title,
  upVotes,
  views,
}: QuestionCardProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {getTimestamp(createdAt)}
        </span>
        <Link href={`/question/${id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" id={JSON.stringify(id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag.id} id={tag.id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          alt="User"
          className="body-medium text-dark400_light800"
          imgUrl="/assets/icons/avatar.svg"
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.id}`}
          isAuthor
          value={author.name}
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            alt="Upvotes"
            className="small-medium text-dark400_light800"
            imgUrl="/assets/icons/like.svg"
            title=" Votes"
            value={formatAndDivideNumber(upVotes?.length)}
          />
          <Metric
            alt="messages"
            className="small-medium text-dark400_light800"
            imgUrl="/assets/icons/message.svg"
            title=" Answers"
            value={formatAndDivideNumber(answers)}
          />
          <Metric
            alt="Views"
            className="small-medium text-dark400_light800"
            imgUrl="/assets/icons/eye.svg"
            title=" Views"
            value={formatAndDivideNumber(views)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
