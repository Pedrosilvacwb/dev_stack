import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import React from "react";

export const metadata: Metadata = {
  title: "Question | DevFlow",
};

const Page = async ({ params, searchParams }: any) => {
  const { userId: clerkId } = auth();
  const question = await getQuestionById({ questionId: params.id });
  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile picture"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            {" "}
            <Votes
              type="question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={question.upvotes.length}
              hasupVoted={question.upvotes.includes(mongoUser._id)}
              downvotes={question.downvotes.length}
              hasdownVoted={question.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          alt="Clock"
          className="small-medium text-dark400_light800"
          imgUrl="/assets/icons/clock.svg"
          title=" Asked"
          value={` asked ${getTimestamp(question.createdAt)}`}
        />
        <Metric
          alt="messages"
          className="small-medium text-dark400_light800"
          imgUrl="/assets/icons/message.svg"
          title=" Answers"
          value={formatAndDivideNumber(question.answers.length)}
        />
        <Metric
          alt="Views"
          className="small-medium text-dark400_light800"
          imgUrl="/assets/icons/eye.svg"
          title=" Views"
          value={formatAndDivideNumber(question.views)}
        />
      </div>

      <ParseHTML data={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={question._id}
        userId={mongoUser._id}
        totalAnswers={question.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <Answer
        authorId={JSON.stringify(mongoUser._id)}
        questionId={JSON.stringify(question._id)}
        question={question.content}
      />
    </>
  );
};

export default Page;
