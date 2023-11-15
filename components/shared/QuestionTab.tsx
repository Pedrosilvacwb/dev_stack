import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionTabProps) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result?.questions.map((item) => (
        <QuestionCard
          clerkId={clerkId}
          answers={item.answers.length}
          createdAt={item.createdAt}
          author={item.author}
          key={item.id}
          id={item.id}
          tags={item.tags}
          title={item.title}
          upVotes={item?.upvotes}
          views={item.views}
        />
      ))}
      <div className="mt-10">
        {" "}
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result?.isNext ?? false}
        />
      </div>
    </>
  );
};

export default QuestionTab;
