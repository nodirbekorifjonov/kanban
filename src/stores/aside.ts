import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAsideStore = defineStore('aside', () => {
    const showAside = ref<boolean>(window.innerWidth > 768)

    return { showAside }
})
