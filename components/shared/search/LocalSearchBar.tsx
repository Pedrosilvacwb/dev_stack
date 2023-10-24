import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface LocalSearchProps {
  placeholder: string;
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  className: string;
}

const LocalSearchBar = ({
  placeholder,
  className,
  iconPosition,
  imgSrc,
  route,
}: LocalSearchProps) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-xl px-4 ${className}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          className="cursor-pointer"
          alt="search"
        />
      )}
      <Input
        className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none text-base shadow-none outline-none"
        type="text"
        placeholder={placeholder}
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          className="cursor-pointer"
          alt="search"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
