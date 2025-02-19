import { ACCOUNT } from "@/libs/appwrite";
import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
    $id: string;
    email: string;
    name?: string;
}

export const useAuthStore = defineStore("auth", () => {
    const isLoading = ref<boolean>(false);
    const userData = ref<User | null>(null);

    // Registration with email, password and username
    async function register(email: string, password: string, name: string): Promise<void> {
        try {
            await ACCOUNT.create("unique()", email, password, name);
            await login(email, password)
            router.push("/");
        } catch (error) {
            console.error("Xatolik:", error);
        }
    }

    // Login with email and password
    async function login(email: string, password: string) {
        try {
            await ACCOUNT.createEmailPasswordSession(email, password);
            await getUser();
            router.push("/");
        } catch (error) {
            console.log("Login xatolik:", error);
        }
    }
    // Get User informations
    async function getUser(): Promise<void> {
        try {
            userData.value = await ACCOUNT.get();


        } catch (error) {
            console.error("Foydalanuvchini olishda xatolik:", error);
        }
    }
    // Log out from app
    async function logout(): Promise<void> {
        try {
            await ACCOUNT.deleteSession("current");
            userData.value = null;
            router.push("/login");
        } catch (error) {
            console.error("Chiqishda xatolik:", error);
        }
    }

    return { register, userData, isLoading, login, getUser, logout };
});
