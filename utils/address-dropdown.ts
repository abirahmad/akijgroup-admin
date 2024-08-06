import axios from "@/utils/axios";
import { generateDropdownList } from '@/utils/dropdown';

export interface IResponseData {
    isLoading: boolean;
    dropdownList: any[];
}

export const getDivisionDropdownList = async () => {
    const res = await axios.get(`/divisions/dropdown/list`);
    const divisionData = generateDropdownList(res.data);
    return divisionData
};

export const getCitiesDropdownList = async (id: any) => {
    if (isNaN(id) || id == undefined || id === 0) {
        return;
    }

    const res = await axios.get(`/cities/dropdown/list?division_id=${id}`);
    const cities = generateDropdownList(res.data);
    return cities
};

export const getAreasDropdownList = async (id: any) => {
    if (isNaN(id) || id == undefined || id === 0) {
        return;
    }

    const res = await axios.get(`/areas/dropdown/list?city_id=${id}`);
    const cities = generateDropdownList(res.data);
    return cities
};