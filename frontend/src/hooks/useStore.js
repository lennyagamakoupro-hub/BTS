import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// LocalStorage keys
const KEY_LIST = "lenny:list";
const KEY_SCORES = "lenny:quizScores";
const KEY_PROGRESS = "lenny:progress";

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [list, setList] = useState(() => read(KEY_LIST, []));
  const [scores, setScores] = useState(() => read(KEY_SCORES, {}));
  const [progress, setProgress] = useState(() => read(KEY_PROGRESS, {}));

  useEffect(() => write(KEY_LIST, list), [list]);
  useEffect(() => write(KEY_SCORES, scores), [scores]);
  useEffect(() => write(KEY_PROGRESS, progress), [progress]);

  const toggleList = useCallback((id) => {
    setList((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }, []);

  const inList = useCallback((id) => list.includes(id), [list]);

  const saveScore = useCallback((id, score, total) => {
    setScores((cur) => {
      const prev = cur[id];
      const next = { score, total, at: Date.now() };
      // Keep best score
      if (prev && prev.score / prev.total >= score / total) return cur;
      return { ...cur, [id]: next };
    });
  }, []);

  const markStarted = useCallback((id) => {
    setProgress((cur) => {
      if (cur[id]?.status) return cur;
      return { ...cur, [id]: { status: "started", at: Date.now() } };
    });
  }, []);

  const markCompleted = useCallback((id) => {
    setProgress((cur) => ({ ...cur, [id]: { status: "completed", at: Date.now() } }));
  }, []);

  const resetAll = useCallback(() => {
    setList([]); setScores({}); setProgress({});
  }, []);

  return (
    <StoreContext.Provider value={{
      list, scores, progress,
      toggleList, inList, saveScore, markStarted, markCompleted, resetAll,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
