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
    <Container>
      <Loader />
      <Header />
      <Toaster />
      <main
        className={
          bookmarks.length <= 3 || bookmark[0]?.links?.length === 0
            ? "lg:h-[calc(100vh-140px)] md:h-[calc(100vh-140px)] pb-5"
            : "pb-5"
        }
      >
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default RootLayout;
