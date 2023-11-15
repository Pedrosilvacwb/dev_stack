"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useDeferredValue, useEffect, useState } from "react";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState<string>(query || "");
  const deferredQuery = useDeferredValue(search);

  useEffect(() => {
    if (search) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "q",
        value: deferredQuery,
      });

      router.push(newUrl, { scroll: false });
    } else {
      if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          keysToRemove: ["q"],
          params: searchParams.toString(),
        });
        router.push(newUrl, { scroll: false });
      }
    }
  }, [search, route, pathname, router, searchParams, query, deferredQuery]);

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
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent text-base shadow-none outline-none"
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
