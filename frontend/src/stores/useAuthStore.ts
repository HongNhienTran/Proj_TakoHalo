import {create} from "zustand";
import {toast} from "sonner";
import { authService } from "@/services/authService";
import type { authState } from "@/types/store";

export const useAuthStore = create<authState>((set, get)=> ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
        set({ accessToken: null, user: null });
    },

    signUp: async (username, password, email, firstName, lastName) => {
        try {
            set({loading: true});
            await authService.signUp(username, password, email, firstName, lastName)
            toast.success("Signed Up Successfully!");
        } catch (error) {
            console.error("Sign up failed:", error);
            toast.error("Sign up failed. Please try again.");
        }finally{
            set({loading: false})
        }
    },
    signIn: async(username, password) =>{
        try {
            set({loading: true});
            const { accessToken} = await authService.signIn(username, password);
            set({accessToken});
            await get().fetchMe();
            toast.success("Signed In Successfully!");
        } catch (error) {
            console.error("Sign in failed:", error);
            toast.error("Sign in failed. Please try again.");
        }finally{
            set({loading: false})
        }
    },
    signOut: async () => {
        try {
            get().clearState();
            await authService.signOut();
            toast.success("Signed Out Successfully!");
        } catch (error) {
            console.error("Sign out failed:", error);
            toast.error("Sign out failed. Please try again.");
        }
    },
    fetchMe: async () => {
        try {
            set({loading: true});
            const { user } = await authService.fetchMe();
            set({user});
            toast.success("Fetched User Successfully!");
        } catch (error) {
            console.error("Fetch user failed:", error);
            set({user: null, accessToken: null});
            toast.error("Fetch user failed. Please try again.");
        }finally{
            set({loading: false})
        }
    }
}))