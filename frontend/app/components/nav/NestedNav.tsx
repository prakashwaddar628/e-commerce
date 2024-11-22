'use client';

import { Categories } from "@/utils/Categories";
import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import Categori from "./Categori";

const NestedNav = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if (!isMainPage) return null;

    return (
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto space-x-4">
                    {Categories.map((item) => (
                        <Categori
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label || (!category && item.label === "All")}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default NestedNav;
