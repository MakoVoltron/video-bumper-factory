"use client";

import { useState } from "react";
import Filters from "./Filters";
import TemplateGrid from "./TemplateGrid";
import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpoint, params, queryKey } from "@/lib/constants";
import Spinner from "./ui/Spinner";
import Button from "./ui/Button";
import SkeletonCard from "./ui/SkeletonCard";

const TemplateList = ({ limit = 9 }: { limit?: number }) => {
  const [filter, setFilter] = useState<CategoryLabels | undefined>(undefined);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKey.templates, filter],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await axios(
          `${endpoint.templates}?${params.FILTER}=${filter ?? ""}&${params.LIMIT}=${limit}&${params.OFFSET}=${pageParam}`,
        );
        return res.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length === 0 || lastPage.length < limit)
          return undefined;
        return allPages.length * limit;
      },

      initialPageParam: 0,
    });

  const templates = data?.pages.flat() ?? [];

  return (
    <>
      <Filters onChange={setFilter} selected={filter} />
      {isLoading ? (
        <div className="w-screen h-screen">
          <div className="grid grid-cols-12 gap-1">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        </div>
      ) : (
        <>
          <TemplateGrid templates={templates} />

          {hasNextPage && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => fetchNextPage()}
                text={isFetchingNextPage ? "Loading..." : "Show more"}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TemplateList;
