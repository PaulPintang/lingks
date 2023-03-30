import { Toaster } from "react-hot-toast";
import { Container } from "@mantine/core";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useAppSelector } from "../app/hooks";
const RootLayout = () => {
  const { bookmarks, bookmark } = useAppSelector((state) => state.bookmark);
  return (
    <>
      <Loader />
      <Header />
      <Toaster />
      <Container
        className={
          bookmarks.length <= 3
            ? "lg:h-[calc(100vh-150px)] md:h-[calc(100vh-150px)] h-[calc(100vh-113px)]"
            : bookmark[0]?.links?.length! <= 2
            ? "lg:h-[calc(100vh-150px)] md:h-[calc(100vh-150px)] h-[calc(100vh-113px)]"
            : ""
        }
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default RootLayout;
