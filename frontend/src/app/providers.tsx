import React, {ReactNode, Suspense} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import localforage from "localforage";
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 24,
    }
  },
})

const asyncStoragePersister = createAsyncStoragePersister({
  storage: localforage,
})

export function Providers({children}: {children: ReactNode}){
  // return (
  //   <Suspense fallback="...Loading">
  //     <PersistQueryClientProvider
  //       client={queryClient}
  //       persistOptions={{ persister: asyncStoragePersister }}
  //     >
  //       {children}
  //       <ReactQueryDevtools initialIsOpen={false} />
  //     </PersistQueryClientProvider>
  //   </Suspense>
  // )
  return (
    <Suspense fallback="...Loading">
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  )
}