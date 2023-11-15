import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";

import Link from "next/link";

import React from "react";

export const metadata: Metadata = {
  title: "Community | DevFlow",
};

const page = async ({ searchParams }: SearchParamsProps) => {
  const users = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          className="flex-1"
          placeholder="Search for Users Here..."
        />
        <Filter
          filters={UserFilters}
          className="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {users?.users.length ? (
          users?.users.map((user) => <UserCard user={user} key={user._id} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        {" "}
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={users?.isNext ?? false}
        />
      </div>
    </>
  );
};

export default page;
