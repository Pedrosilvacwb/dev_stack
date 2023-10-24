import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface NoResultsProps {
  title: string;
  description: string;
  link: string;
  buttonTitle: string;
}

const NoResult = ({
  buttonTitle,
  description,
  link,
  title,
}: NoResultsProps) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="no result"
        width={270}
        height={200}
        className="mb-10 block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="no result"
        width={270}
        height={200}
        className="mb-10 hidden object-contain  dark:flex"
      />

      <h2 className="h2-bold text-dark200_light900">{title}</h2>
      <p className="body-regular text-dark500_light700 my-4 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          {buttonTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;