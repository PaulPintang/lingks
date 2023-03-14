import { Toaster } from "react-hot-toast";
import { Container } from "@mantine/core";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <Container>
      <Loader />
      <Header />
      <Toaster />
      <main className="h-[calc(1 00vh-170px)] pb-5">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </Container>
  );
};

export default RootLayout;
