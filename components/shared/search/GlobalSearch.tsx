import Image from "next/image";
import React from "react";
import search from "@/public/assets/icons/search.svg";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src={search}
          width={24}
          height={24}
          className="cursor-pointer"
          alt="search"
        />
        <Input
          className="paragraph-regular text-dark400_light700 no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
          type="text"
          placeholder="Busca global"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
