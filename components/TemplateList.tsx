"use client";

import { useState } from "react";
import Filters from "./Filters";
import TemplateGrid from "./TemplateGrid";
import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpoint, params } from "@/lib/constants";
import Spinner from "./ui/Spinner";

const TemplateList = () => {
  const [filter, setFilter] = useState<CategoryLabels | null>(null);

  const { data: templates, isLoading } = useQuery({
    queryKey: ["templates", filter],
    queryFn: async () => {
      const res = await axios(
        `${endpoint.fetchTemplates}?${params.FILTER}=${filter ?? ""}`,
      );
      return res.data;
    },
  });

  return (
    <>
      <Filters onChange={setFilter} />
      {isLoading ? <Spinner /> : <TemplateGrid templates={templates} />}
    </>
  );
};

export default TemplateList;
