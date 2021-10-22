import React, { useEffect } from "react";

export default function useKeyPress(key: string, callback: () => void) {
  useEffect(() => {
    const onKeyup: any = (e: React.KeyboardEvent) => {
      if (e.key === key) callback();
    };
    window.addEventListener("keyup", onKeyup);

    return () => window.removeEventListener("keyup", onKeyup);
  }, [callback]);
}
