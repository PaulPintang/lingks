import { Center } from "@mantine/core";

const NotFound = () => {
  return (
    <Center className="w-full h-screen">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-6xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry we couldn't find this page
          </p>
        </div>
      </div>
    </Center>
  );
};

export default NotFound;
