import Image from "next/image";
import { Inter } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {useEffect, useState } from "react";
import { getEmployeeChartAction } from "@/redux/actions/employee-action";
import OrgChart from "./chart/OrgChart";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(20);
  const { employeeList, isLoading,employeeChart } = useSelector((state: RootState) => state.employee);
  useEffect(() => {
    dispatch(getEmployeeChartAction())
  }, []);

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('https://your-api-url.com/employees');
  //     const result = await response.json();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);

  // var data = {
  //   "name": "CEO",
  //   "position": "Chief Executive Officer",
  //   "children": [
  //     {
  //       "name": "CTO",
  //       "position": "Chief Technology Officer",
  //       "children": [
  //         {
  //           "name": "Dev1",
  //           "position": "Developer",
  //           "children":[
  //             {
  //               "name":"Dev 4",
  //               "position":"JUnior Dev"
  //             },
  //             {
  //               "name":"Dev 5",
  //               "position":"JUnior Dev"
  //             }
  //           ]
  //         },
  //         {
  //           "name": "Dev2",
  //           "position": "Developer"
  //         }
  //       ]
  //     },
  //     {
  //       "name": "CFO",
  //       "position": "Chief Financial Officer"
  //     }
  //   ]
  // }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome To Dashboard</h1>
        {/* {employeeChart ? <OrgChart data={employeeChart} /> : <p>Loading...</p>} */}
      </div>
    </>
  );
}
