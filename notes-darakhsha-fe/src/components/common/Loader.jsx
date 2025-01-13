// src/components/common/Loader.jsx
const Loader = ({ size = 'medium' }) => {
    const sizes = {
      small: 'h-4 w-4',
      medium: 'h-8 w-8',
      large: 'h-12 w-12'
    };
  
    return (
      <div className="flex justify-center items-center">
        <div className={`${sizes[size]} animate-spin rounded-full border-4 border-primary-200 border-t-primary-600`}></div>
      </div>
    );
  };
  
  export default Loader;
  