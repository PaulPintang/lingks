import { Toaster } from "react-hot-toast";
import { Container } from "@mantine/core";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useAppSelector } from "../app/hooks";
const RootLayout = () => {
  const { bookmarks } = useAppSelector((state) => state.bookmark);
  return (
    <>
      <Header />
      <Loader />
      <Toaster />
      <Container
        className={
          bookmarks.length <= 3
            ? "lg:h-[calc(100vh-130px)] md:h-[calc(100vh-130px)]"
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
