import { MouseEvent, ReactNode, useEffect, useRef } from "react";

interface FaqItemProps {
  question: ReactNode;
  children: ReactNode;
}

const FaqItem = ({ question, children }: FaqItemProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const targetOpenRef = useRef(false);

  useEffect(() => () => animationRef.current?.cancel(), []);

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const answer = answerRef.current;
    if (!details || !answer) return;

    // Preserve native behavior when animation is unavailable or unwanted.
    if (!answer.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationRef.current?.cancel();
      animationRef.current = null;
      return;
    }

    event.preventDefault();
    const nextOpen = animationRef.current ? !targetOpenRef.current : !details.open;
    const startHeight = details.open ? answer.getBoundingClientRect().height : 0;
    animationRef.current?.cancel();
    details.open = true;
    targetOpenRef.current = nextOpen;

    const animation = answer.animate(
      [{ height: `${startHeight}px` }, { height: `${nextOpen ? answer.scrollHeight : 0}px` }],
      { duration: 300, easing: "ease-in-out" },
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      details.open = nextOpen;
      animationRef.current = null;
    };
  };

  return (
    <details
      ref={detailsRef}
      className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4"
    >
      <summary
        onClick={toggle}
        className="flex list-none cursor-pointer items-center justify-between rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500"
      >
        <h3 className="text-sm md:text-base font-semibold">{question}</h3>
        <span
          aria-hidden="true"
          className="ml-4 text-gray-500 group-open:rotate-180 transition-transform duration-300 motion-reduce:transition-none"
        >
          ▾
        </span>
      </summary>
      <div ref={answerRef} className="overflow-hidden">
        <div className="pt-3 text-gray-700">{children}</div>
      </div>
    </details>
  );
};

export default FaqItem;
