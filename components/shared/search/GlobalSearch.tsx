"use client";
import Image from "next/image";
import React, { useDeferredValue, useEffect, useRef, useState } from "react";
import searchIcon from "@/public/assets/icons/search.svg";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get("q");

  const [search, setSearch] = useState<string>(query || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deferredQuery = useDeferredValue(search);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (deferredQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "global",
        value: search,
      });

      router.push(newUrl, { scroll: false });
    } else {
      if (query) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["global", "type"],
        });
        router.push(newUrl, { scroll: false });
      }
    }
  }, [search, pathname, router, searchParams, query, deferredQuery]);
  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src={searchIcon}
          width={24}
          height={24}
          className="cursor-pointer"
          alt="search"
        />
        <Input
          className="paragraph-regular text-dark400_light700 no-focus placeholder border-none bg-transparent shadow-none outline-none"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          placeholder="Search globally"
        />
      </div>

      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
