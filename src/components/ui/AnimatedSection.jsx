import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * AnimatedSection — wraps children with a scroll-triggered animation.
 * @param {string} variant - 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight'
 * @param {boolean} stagger - enable stagger container for children
 */
export default function AnimatedSection({
  children,
  variant = 'fadeInUp',
  stagger = false,
  className = '',
  delay = 0,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const selectedVariant = variants[variant] ?? variants.fadeInUp;

  const animationVariant = delay
    ? {
        ...selectedVariant,
        visible: {
          ...selectedVariant.visible,
          transition: { ...selectedVariant.visible.transition, delay },
        },
      }
    : selectedVariant;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger ? container : animationVariant}
      className={className}
      {...props}
    >
      {stagger
        ? children
        : children}
    </motion.div>
  );
}

/**
 * AnimatedItem — use inside AnimatedSection with stagger=true
 */
export function AnimatedItem({ children, variant = 'fadeInUp', className = '', ...props }) {
  const selectedVariant = variants[variant] ?? variants.fadeInUp;
  return (
    <motion.div variants={selectedVariant} className={className} {...props}>
      {children}
    </motion.div>
  );
}
