import RenderTag from "@/components/shared/RenderTag";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const questions = [
  {
    id: 1,
    question:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    id: 2,
    question: "How can an airconditioning machine exist?",
  },
  {
    id: 3,
    question: "Interrogated every time crossing UK Border as citizen",
  },
  {
    id: 4,
    question: "Low digit addition generator",
  },
  {
    id: 5,
    question: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const tags = [
  {
    id: 1,
    name: "JavaScript",
    totalQuestions: 5,
  },
  {
    id: 2,
    name: "React",
    totalQuestions: 4,
  },
  {
    id: 3,
    name: "Python",
    totalQuestions: 3,
  },
  {
    id: 4,
    name: "Typescript",
    totalQuestions: 2,
  },
  {
    id: 5,
    name: "Redux",
    totalQuestions: 1,
  },
];
const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 hidden h-screen w-[350px] flex-col overflow-y-auto border-l  p-6 pt-36 shadow-light-300 dark:shadow-none xl:flex">
      <div>
        <h3 className="h3-bold text-dark200_light900">Hot Network</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions.map((item) => (
            <Link
              href={`/questions/${item.id}`}
              key={item.id}
              className="flex items-start justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700 text-left">
                {item.question}
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
          {tags.map((tag) => (
            <RenderTag
              key={tag.id}
              id={tag.id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
