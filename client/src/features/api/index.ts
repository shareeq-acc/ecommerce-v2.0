// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store';
import { BaseQueryExtraOptions } from '@reduxjs/toolkit/dist/query/baseQueryTypes';


const url = "http://localhost:8000/api/";

const baseQuery = fetchBaseQuery({
    baseUrl: url,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

// const baseQueryWithReAuth = async (args: string | FetchArgs,
//     api: BaseQueryApi,
//     extraOptions: BaseQueryExtraOptions) => {

// }
// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
    baseQuery,
    endpoints: () => ({}),
})