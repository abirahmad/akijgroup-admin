import Image from "next/image";
import { Inter } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {useEffect, useState } from "react";
import { getEmployeeChartAction } from "@/redux/actions/employee-action";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(20);
  const { employeeList, isLoading,employeeChart } = useSelector((state: RootState) => state.employee);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome To Dashboard</h1>
      </div>
    </>
  );
}
