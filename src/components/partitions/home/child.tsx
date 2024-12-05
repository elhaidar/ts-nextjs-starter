import { Button } from "@/components/ui/button";
import {
  useGetUser2,
  useUpdateUser,
  useUpdateUser2,
} from "@/queries/user.query";
import userStore from "@/stores/user.store";
import React, { useState } from "react";

type Props = {
  isLoading: boolean;
};

export default function Child({ isLoading }: Props) {
  // const user = userStore((state) => state.user);

  const { user } = useGetUser2({ id: 1 });
  console.log(user, "user");

  // const updateUser = useUpdateUser();

  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (!user) return;
    // updateUser.mutate({
    //   ...user,
    //   id: 1,
    //   email: "leannegraham@april.biz",
    // });
    setLoading(true);
    await useUpdateUser2({
      data: {
        ...user,
        id: 1,
        email: "leannegraham@april.biz",
      },
    });
    setLoading(false);
  }

  return (
    <div className="border-[1px] max-w-sm bg-slate-700 p-4 flex flex-col justify-between">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Child Component</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p>{`id : ${user?.id}`}</p>
              <p>{`name : ${user?.name}`}</p>
              <p>{`email : ${user?.email}`}</p>
            </div>
            <Button size={"sm"} onClick={handleUpdate} isLoading={loading}>
              Update Email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
