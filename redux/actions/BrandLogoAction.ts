import axios from "@/utils/axios";
import * as Types from "../types/BrandLogoType";
import { Toaster } from "@/components/toaster";
import { Dispatch } from "@reduxjs/toolkit";

export const changeInputValue =
  (name: string, value: any, e: any) => (dispatch: Dispatch) => {
    let data = {
      name: name,
      value: value,
    };
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });

    if (name === "image") {
      let reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        // data.name = "avatar";
        data.value = reader.result;
        dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
      };
      reader.readAsDataURL(file);
    }
  };

export const emptyBrandLogoInputAction = () => (dispatch: Dispatch) => {
  dispatch({ type: Types.EMPTY_BRAND_LOGO_INPUT, payload: {} });
};

export const validateNewsMediaForm = (brandsLogoInput) => {
  if (brandsLogoInput.name === "") {
    Toaster("error", "Please give member name.");
    return false;
  }

  if (brandsLogoInput.name === "") {
    Toaster("error", "Please give member designation.");
    return false;
  }

  return true;
};

export const createBrandLogo =
  (brandsLogoInput: any, router: any) => (dispatch: Dispatch) => {
    if (!validateNewsMediaForm(brandsLogoInput)) {
      return;
    }
console.log('brandsLogoInput :>> ', brandsLogoInput);
    let response = {
      status: false,
      message: "",
      isLoading: true,
    };
    dispatch({ type: Types.CREATE_BRAND_LOGO, payload: response });

     axios
      .post(`/brands-logos`, brandsLogoInput)
      .then((res) => {
        response.status = true;
        response.isLoading = false;
        response.message = res.message;
        Toaster("success", response.message);
        router.push("/brands-logo");
        dispatch({ type: Types.CREATE_BRAND_LOGO, payload: response });
      })
      .catch((error) => {
        response.isLoading = false;
        dispatch({ type: Types.CREATE_BRAND_LOGO, payload: response });
      });
  };

export const getBrandLogoListAction =
  (currentPage: number = 1, dataLimit: number = 10, searchText: string = "") =>
  (dispatch: Dispatch) => {
    let response = {
      status: false,
      message: "",
      isLoading: true,
      data: [],
      paginationData: [],
    };
    dispatch({ type: Types.GET_BRAND_LOGO_LIST, payload: response });

    const resourceUrl = "brands-logos";

    axios
      .get(
        `/${resourceUrl}?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`
      )
      .then((res) => {
        console.log("brand lo", res);
        response.isLoading = false;
        response.status = true;
        response.message = res.message;
        response.data = res.data.data;
        response.paginationData = res.data;
        dispatch({ type: Types.GET_BRAND_LOGO_LIST, payload: response });
      })
      .catch((error) => {
        response.isLoading = false;
        dispatch({ type: Types.GET_BRAND_LOGO_LIST, payload: response });
      });
  };

export const getBrandsLogoDetails =
  (id: number | string) => (dispatch: Dispatch) => {
    if (isNaN(id)) {
      return;
    }

    let response = {
      status: false,
      message: "",
      isLoading: true,
      data: {},
    };
    dispatch({ type: Types.GET_BRAND_LOGO_DETAILS, payload: response });

    axios(`/brands-logos/${id}`)
      .then((res) => {
        response.isLoading = false;
        response.status = true;
        response.message = res.message;
        response.data = res.data;
        dispatch({ type: Types.GET_BRAND_LOGO_DETAILS, payload: response });
      })
      .catch((error) => {
        response.isLoading = false;
        dispatch({ type: Types.GET_BRAND_LOGO_DETAILS, payload: response });
      });
  };

export const deleteBrandLogo =
  (id: number | string, setShowDeleteModal: any, isAgent: boolean = false) =>
  (dispatch: Dispatch) => {
    let responseData = {
      status: false,
      message: "",
      isLoading: true,
    };
    dispatch({ type: Types.DELETE_BRAND_LOGO, payload: responseData });

    axios
      .delete(`/brands-logos/${id}`)
      .then((res) => {
        responseData.isLoading = false;
        responseData.status = true;
        responseData.message = res.message;
        Toaster("success", responseData.message);
        setShowDeleteModal(false);
        dispatch(getMessageListAction(1, 10, ""));
        dispatch({ type: Types.DELETE_BRAND_LOGO, payload: responseData });
      })
      .catch((error) => {
        responseData.isLoading = false;
        dispatch({ type: Types.DELETE_BRAND_LOGO, payload: responseData });
      });
  };

export const updateBrandsLogo =
  (departmentInput: any, router: any, pageType: string = "edit") =>
  (dispatch: Dispatch) => {
    if (!validateNewsMediaForm(departmentInput)) {
      return;
    }

    let response = {
      status: false,
      message: "",
      isLoading: true,
      pageType,
    };
    dispatch({ type: Types.UPDATE_BRAND_LOGO, payload: response });

    axios
      .put(`/brands-logos/${departmentInput.id}`, departmentInput)
      .then((res) => {
        response.status = true;
        response.isLoading = false;
        response.message = res.message;
        Toaster("success", response.message);
        router.push("/brands-logo");
        dispatch({ type: Types.UPDATE_BRAND_LOGO, payload: response });
      })
      .catch((error) => {
        response.isLoading = false;
        dispatch({ type: Types.UPDATE_BRAND_LOGO, payload: response });
      });
  };
