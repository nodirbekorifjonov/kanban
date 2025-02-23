import { ACCOUNT } from "@/libs/appwrite";
import router from "@/router";
import type { User } from "@/types/user";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useColumnsStore } from "./columns";

export const useAuthStore = defineStore("auth", () => {
    const isLoading = ref<boolean>(false);
    const userData = ref<User | null>(null); // localStorage o‘rniga, doimiy real-time ma’lumot


    // Registration with email, password and username
    async function register(email: string, password: string, name: string): Promise<void> {
        try {
            await ACCOUNT.create("unique()", email, password, name);
            await login(email, password)
            await getUser();
            router.push({ name: "home" });
        } catch (error) {
            console.error("Xatolik:", error);
        }
    }


    // Login with email and password
    async function login(email: string, password: string): Promise<void> {
        try {
            await ACCOUNT.createEmailPasswordSession(email, password);
            await getUser();
        } catch (error) {
            console.log("Login xatolik:", error);
        }
    }
    // Get User informations
    async function getUser(): Promise<void> {
        try {
            const user = await ACCOUNT.get();
            localStorage.setItem("user", JSON.stringify(user));
            userData.value = user;
            router.push({ name: 'home' });

            await useColumnsStore().fetchColumns();
        } catch (error) {
            console.error("Foydalanuvchini olishda xatolik:", error);
        }
    }



    // Log out from app
    async function logout(): Promise<void> {
        try {
            await ACCOUNT.deleteSession("current");
            localStorage.removeItem("user");
            userData.value = null;
            useColumnsStore().columns = [];
            router.push({ name: "login" });
        } catch (error) {
            console.error("Chiqishda xatolik:", error);
        }
    }

    watch(
        userData,
        (newUser) => {
            if (newUser) {
                localStorage.setItem("user", JSON.stringify(newUser));
            } else {
                localStorage.removeItem("user"); // Null bo‘lsa, localStorage dan o‘chirish
            }
        },
        { deep: true }
    );


    return { register, userData, isLoading, login, getUser, logout };
});
