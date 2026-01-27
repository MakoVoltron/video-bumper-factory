"use client";

import { useState } from "react";
import Filters from "./Filters";
import TemplateGrid from "./TemplateGrid";
import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpoint, params, queryKey } from "@/lib/constants";
import Spinner from "./ui/Spinner";

const TemplateList = () => {
  const [filter, setFilter] = useState<CategoryLabels | undefined>(undefined);

  const { data: templates, isLoading } = useQuery({
    queryKey: [queryKey.templates, filter],
    queryFn: async () => {
      const res = await axios(
        `${endpoint.templates}?${params.FILTER}=${filter ?? ""}`,
      );
      return res.data;
    },
  });

  return (
    <>
      <Filters onChange={setFilter} selected={filter} />
      {isLoading ? (
        <div className="h-20 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <TemplateGrid templates={templates} />
      )}
    </>
  );
};

export default TemplateList;
