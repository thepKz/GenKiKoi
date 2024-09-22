import { useInView } from "framer-motion";
import { useRef } from "react";

export const useAnimationHook = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return { ref, isInView };
};
