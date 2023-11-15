import RenderTag from "@/components/shared/RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RightSideBar = async () => {
  const questions = await getHotQuestions();
  const tags = await getPopularTags();

  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 hidden h-screen w-[350px] flex-col overflow-y-auto border-l  p-6 pt-36 shadow-light-300 dark:shadow-none xl:flex">
      <div>
        <h3 className="h3-bold text-dark200_light900">Hot Network</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions?.map((item) => (
            <Link
              href={`/question/${item.id}`}
              key={item.id}
              className="flex items-start justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700 text-left">
                {item.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="arrow"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {tags?.map((tag) => (
            <RenderTag
              key={tag.id}
              id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
