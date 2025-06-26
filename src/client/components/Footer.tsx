export const Footer = () => {
  return (
    <footer className="mt-auto w-full py-4 text-center bg-gray-200 text-sm text-gray-700">
      &copy; {new Date().getFullYear()} - Stanový tábor Kamenná
      <div className="flex justify-center mt-4">
        <a href="https://www.facebook.com/people/D%C4%9Btsk%C3%BD-stanov%C3%BD-t%C3%A1bor-Kamenn%C3%A1/61559911625763/" target="_blank" rel="noreferrer">
          <img width={40} height={40} src="/assets/fb-logo.svg" alt="" />
        </a>
      </div>
    </footer>
  );
};
