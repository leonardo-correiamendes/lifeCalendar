import { onMounted, ref, watchEffect } from "vue";

export function useDark() {
    type Mode = "light" | "dark" | "system";
    const key = "lc.theme";
    const mode = ref<Mode>("system");

    function apply() {
        const root = document.documentElement;
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const isDark =
            mode.value === "dark" || (mode.value === "system" && prefersDark);
        root.classList.toggle("dark", isDark);
    }

    onMounted(() => {
        const saved = (localStorage.getItem(key) as Mode) || "system";
        mode.value = saved;
        apply();

        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = () => {
            if (mode.value === "system") {
                apply();
            }
        };

        mql.addEventListener("change", listener);
    });

    watchEffect(() => {
        localStorage.setItem(key, mode.value);
        apply();
    });

    return { mode };
}
