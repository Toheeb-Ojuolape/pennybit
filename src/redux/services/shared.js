import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { isEmpty } from "lodash";
import { setLoginUser } from "../slices/auth";
// import store from "../../redux/store";

const { REACT_APP_BACKEND_API } = process.env;

const baseUrl = `${REACT_APP_BACKEND_API}/api/`;

export const baseQueryWithoutHeader = fetchBaseQuery({
  baseUrl: baseUrl,
});

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const authorization = getState().authStore.authorization;
    if (authorization?.access) {
      headers.set("authorization", `Bearer ${authorization?.access}`);
    }
    return headers;
  },
});

const mutex = new Mutex();

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const authorization = api.getState()?.authStore.authorization;
  if (result.error && result.error.status === 401 && !isEmpty(authorization?.access)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const response = await baseQuery("refresh", api, extraOptions);
        if (response.data) {
          api.dispatch(setLoginUser(response.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({ type: "LOGOUT" });
          window.location.replace("/");
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export const createRequest = (url) => ({ url });
export const createRequestWithParams = (url, params) => ({ url, params: params });
