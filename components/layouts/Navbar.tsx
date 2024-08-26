import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { handleSidebar } from "@/redux/actions/global-action";
import { RootState, AppDispatch } from "@/redux/store";
import { getAuthData, logout } from "@/utils/auth";

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>(); // Use typed useDispatch
    const router = useRouter();
    const { isOpenSidebar } = useSelector((state: RootState) => state.global);
    const userData = getAuthData();

    return (
        <div className="bg-blue-100 border-b border-blue-200 fixed z-30 w-full">
            <div className="px-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button onClick={() => dispatch(handleSidebar(isOpenSidebar))} id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                            <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                            <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                        <a href="" className="text-xl font-bold flex items-center lg:ml-2.5">
                            <Image src={'/logo.png'} alt={''} height={80} width={200} unoptimized />
                        </a>
                    </div>

                    {
                        typeof userData !== "undefined" && userData !== null &&
                        <Dropdown label={userData.first_name + ' ' + userData.last_name} style={{ backgroundColor: "#0000CD" }}>
                            <Dropdown.Header className="border-gray-300 py-2 text-center">
                                {
                                    userData.avatar === null ?
                                        <span><i className="bi bi-person-bounding-box text-4xl"></i></span> :
                                        // <Image src={userData.avatar} alt={userData.first_name} height={20} width={20} />
                                        <img src={`http://hr-admin-api.test/storage/employees/avatars/` + userData.avatar} alt={userData.first_name} className="h-50 w-50" />
                                }
                                <span className="block truncate text-sm font-medium">
                                    {userData.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item className="py-2 px-4" onClick={() => router.push('/profile')}>
                                <Link href={'/profile'}>
                                    <i className="bi bi-person-bounding-box"></i> &nbsp;&nbsp; Profile
                                </Link>
                            </Dropdown.Item>
                            {/* <Dropdown.Divider className="" /> */}
                            <Dropdown.Item className="px-4" onClick={() => logout()}>
                                <i className="bi bi-box-arrow-right"></i> &nbsp;&nbsp; Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    }
                </div>
            </div>
        </div>
    )
}
