import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dataAPI = createApi({
  
 
  reducerPath: "data",

  // The base query to request data.
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8069",
  }),

  // The set of operations that we want to perform against the server.
  endpoints: (builder) => ({

  
    /********** @response from OpenAI **********/
    responseData: builder.mutation({
      query: (data) => {

        return {  
          url: `/chat`,
          responseHandler: (response) => response.json(),
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: data
        }
      },
    }),



   

 

  })

// @all end
})


export const { 
  useResponseDataMutation
 } = dataAPI