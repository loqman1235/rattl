const createStorage = (type: "local" | "session" = "session") => {
  const getStorage = () =>
    type === "local" ? window.localStorage : window.sessionStorage;

  return {
    get: <T>(key: string): T | null => {
      if (typeof window === "undefined") return null;
      try {
        const item = getStorage().getItem(key);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    },

    set: (key: string, value: unknown) => {
      if (typeof window === "undefined") return;
      try {
        getStorage().setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn("Storage failed:", e);
      }
    },

    remove: (key: string) => {
      if (typeof window === "undefined") return;
      getStorage().removeItem(key);
    },
  };
};

export const session = createStorage("session");
export const local = createStorage("local");
