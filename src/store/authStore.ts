import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { validateMockLogin } from '@services/mockAuth';

type AuthState = {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      login: (email, password) => {
        const ok = validateMockLogin(email, password);
        if (ok) {
          set({ isAuthenticated: true, userEmail: email.trim().toLowerCase() });
        }
        return ok;
      },
      logout: () => set({ isAuthenticated: false, userEmail: null }),
    }),
    {
      name: 'qa-tool-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userEmail: state.userEmail,
      }),
    }
  )
);
