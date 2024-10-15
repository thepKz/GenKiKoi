import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { useAnimationHook } from "../hooks";

interface Props {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

const AnimatedSection = (props: Props) => {
  const { className, children, variants } = props;

  const { ref, isInView } = useAnimationHook();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView && "visible"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
