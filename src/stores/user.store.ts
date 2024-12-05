import { UserProps } from "@/lib/types";
import { create } from "zustand";

type StateProps = {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
};

const state = {
  user: null,
};

const userStore = create<StateProps>((set) => ({
  ...state,
  setUser: (user) => set({ user }),
}));

export default userStore;
