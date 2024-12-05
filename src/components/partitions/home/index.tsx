"use client";

import userStore from "@/stores/user.store";
import Child from "./child";
import { useGetUser, useGetUser2 } from "@/queries/user.query";
import OtherChild from "./other-child";

export default function HomePartition() {
  // const { user, setUser } = userStore();

  // const { isLoading } = useGetUser({ id: 1 });
  const { user, isLoading } = useGetUser2({ id: 1 });

  return (
    <div className="border-[1px] w-full h-[80vh] bg-slate-800 p-4 flex flex-col relative space-y-32">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Parent Component</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            <p>{`id : ${user?.id}`}</p>
            <p>{`name : ${user?.name}`}</p>
            <p>{`email : ${user?.email}`}</p>
          </div>
        )}
      </div>
      <div className="flex gap-x-8 justify-around">
        <Child isLoading={isLoading} />
        <OtherChild isLoading={isLoading} />
      </div>
    </div>
  );
}
