import { useEffect, useState } from "react";

export function useOrigin() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  if (!mounted) {
    return null;
  }
  return origin;
}
