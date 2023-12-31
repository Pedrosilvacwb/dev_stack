import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | DevFlow",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  let questions;
  if (searchParams?.filter === "recommended") {
    if (userId) {
      questions = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    }
  } else {
    questions = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] rounded-md px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          className="flex-1"
          placeholder="Search for Questions Here..."
        />
        <Filter
          filters={HomePageFilters}
          className="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.questions?.length! > 0 ? (
          questions?.questions?.map((item) => (
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
            title="There’s no question to show"
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
          isNext={questions?.isNext!}
        />
      </div>
    </>
  );
}
