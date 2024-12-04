"use client";

import { useSearchParams } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoriProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Categori: React.FC<CategoriProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery =
      label === "All" ? {} : { ...currentQuery, category: label };

    const url = queryString.stringifyUrl({
      url: "/",
      query: updatedQuery,
    });

    router.push(url);
  }, [label, params, router]);

  return (
    <div onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
        ${
          selected
            ? "border-b-slate-800 text-slate-800"
            : "border-transparent text-slate-400"
        }`}
      aria-selected={selected}
      role="tab"
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default Categori;
