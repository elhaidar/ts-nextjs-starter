import { api } from "@/lib/axios-interceptor-instance";
import { UserProps } from "@/lib/types";
import userStore from "@/stores/user.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useSWR, { mutate } from "swr";

type Props = {
  id: number;
};

export function useGetUser({ id }: Props) {
  const setUser = userStore((state) => state.setUser);

  const rQuery = useQuery(
    ["user"],
    () => api.get(`https://jsonplaceholder.typicode.com/users/${id}`),
    {
      onError: () => {},
    }
  );

  //SET RESPONSE QUERY TO GLOBAL STATE
  React.useEffect(() => {
    if (rQuery.data?.data) {
      const data = rQuery.data.data;
      setUser(data);
    }
  }, [rQuery.data]);

  return rQuery;
}

export function useUpdateUser() {
  const setUser = userStore((state) => state.setUser);

  return useMutation(
    (data: UserProps) =>
      api.patch(`https://jsonplaceholder.typicode.com/users/${data.id}`, data),
    {
      onSettled: () => {
        //INVALIDATE TARGET QUERIES
        //   queryClient.invalidateQueries(['query_key']);
      },
      onSuccess: (res) => {
        setUser(res.data);
      },
      onError: () => {},
    }
  );
}

const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export function useGetUser2({ id }: { id: number }) {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    fetcher
  );
  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export async function useUpdateUser2({ data }: { data: UserProps }) {
  console.log(data, "data");
  const res = await api.patch(
    `https://jsonplaceholder.typicode.com/users/${data.id}`,
    data
  );
  const json = res.data;
  await mutate(`https://jsonplaceholder.typicode.com/users/${data.id}`, null, {
    populateCache: (_, data) => {
      console.log(json, "populate cache json");
      console.log(data, "populate cache data");
      return {
        ...data,
        data: json,
      };
    },
    revalidate: false,
  });
}
