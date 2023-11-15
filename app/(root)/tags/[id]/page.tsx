import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tag | DevFlow",
};

const page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams?.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result?.tagTitle}</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          className="flex-1"
          placeholder="Search for Tag Questions Here..."
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions.length > 0 ? (
          result?.questions.map((item: any) => (
            <QuestionCard
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
          ))
        ) : (
          <NoResult
            title="There’s no Tag question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
            link="/ask-question"
            buttonTitle="Ask a Question"
          />
        )}
      </div>
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

export default page;
