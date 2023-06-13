import { ServerResponse } from "../../common/types/index";
import { emptySplitApi } from ".";
import { LoginType, RegisterType } from "../../common/pages/AuthPage/AuthPage";

export type LoginResponseType = ServerResponse & {
    token?:string,
    formErrors? : LoginType & {
        main:string
    },
    emailVerified?:boolean,
    sendEmail?:boolean,
    userId?:string,
}
export type RegisterResponseType = ServerResponse & {
    emailVerified?:boolean,
    userId?:string,
    formErrors? : RegisterType & {
        main:string
    },
}

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponseType, LoginType>({
            query: ({ email, password }) => {
                return {
                    url: "/auth/login",
                    method: "post",
                    body: { email, password },
                };
            },
        }),
        registerUser: builder.mutation<RegisterResponseType, RegisterType>({
            query: ({ email, password, cpassword, fname, lname }) => {
                return {
                    url: "/auth/register",
                    method: "post",
                    body: { email, password, cpassword, fname, lname  },
                };
            },
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
