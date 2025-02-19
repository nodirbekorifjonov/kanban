import { ACCOUNT } from "@/libs/appwrite";
import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
    $id: string;
    email: string;
    name?: string; // name ba'zi holatlarda bo'lmasligi mumkin
}

export const useAuthStore = defineStore("auth", () => {
    const isLoading = ref<boolean>(false);
    const userData = ref<User | null>(null); // `reactive` emas, `ref`

    async function register(email: string, password: string, name: string) {
        try {
            const user = await ACCOUNT.create("unique()", email, password, name);
            userData.value = user; // ✅ `values` emas, `value` ishlatish kerak
            router.push("/");
            return user;
        } catch (error) {
            console.error("Xatolik:", error);
        }
    }

    async function login(email: string, password: string) {
        try {
            const session = await ACCOUNT.createEmailPasswordSession(email, password);
            console.log("Muvaffaqiyatli", session);

            await getUser(); // ✅ Login qilgandan keyin userni yuklab olish

            router.push("/");
        } catch (error) {
            console.log("Login xatolik:", error);
        }
    }

    async function getUser(): Promise<void> {
        isLoading.value = true;
        try {
            const user = await ACCOUNT.get(); // ✅ getAccount() emas, get() ishlatish kerak
            userData.value = user;
            console.log("User ma’lumotlari:", user);
        } catch (error) {
            console.error("Foydalanuvchini olishda xatolik:", error);
            userData.value = null; // ✅ Xatolik bo‘lsa, userData-ni null qilish
        } finally {
            isLoading.value = false;
        }
    }

    async function logout(): Promise<void> {
        try {
            await ACCOUNT.deleteSession("current");
            userData.value = null; // ✅ Logout qilganda userni tozalash
            router.push("/login");
        } catch (error) {
            console.error("Chiqishda xatolik:", error);
        }
    }

    return { register, userData, isLoading, login, getUser, logout };
});
