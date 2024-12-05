"use client";

import { useState } from "react";

import { isAxiosError } from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const MAX_RETRIES = 6;
  const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: (failureCount, error) => {
            if (failureCount > MAX_RETRIES) {
              return false;
            }

            if (
              isAxiosError(error) &&
              HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)
            ) {
              return false;
            }

            return true;
          },
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
