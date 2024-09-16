import React, { useEffect } from 'react';
import { spiral } from 'ldrs';

const Loading = () => {
  useEffect(() => {
    // Register the spiral component once the component mounts
    spiral.register();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      {/* Use the l-spiral component with the desired properties */}
      <l-spiral size="100" speed="0.9" color="blue"></l-spiral>
    </div>
  );
};

export default Loading;