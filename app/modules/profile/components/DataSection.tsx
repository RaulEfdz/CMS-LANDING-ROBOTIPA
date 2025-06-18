import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DataSection = ({
  title,
  icon,
  children,
  collapsible = false,
  defaultExpanded = true,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded, children]);

  return (
    <motion.section 
      className="group rounded-none border border-gray-100 bg-white 
        transition-all duration-200 hover:border-gray-200 hover:shadow-lg"
      whileHover={{ scale: 1.005 }} // Keep this hover animation
    >
      <div 
        className={`flex items-center gap-3 border-b border-gray-100 
          p-4 ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div 
          className="flex h-8 w-8 items-center justify-center 
            rounded-none bg-gray-50 text-gray-600 
            group-hover:bg-gray-100 group-hover:text-gray-700"
        >
          {icon}
        </div>
        
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          
          {collapsible && (
            <button 
              className="rounded-none p-1 hover:bg-gray-100"
              aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
            >
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {(!collapsible || isExpanded) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: contentHeight }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="divide-y divide-gray-50">
              <div className="space-y-4 p-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default DataSection;