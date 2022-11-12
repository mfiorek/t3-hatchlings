interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className='flex grow items-center justify-center gap-4'>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 animate-spin' viewBox='0 0 24 24' stroke='currentColor' fill='currentColor'>
        <path d='M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z' />
      </svg>
      <p className='text-3xl'>{text}</p>
    </div>
  );
};

export default Loader;
