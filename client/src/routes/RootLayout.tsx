import { useEffect, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Container } from "@mantine/core";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getBookmarks } from "../features/bookmarks/bookmarkSlice";
import { userProfile } from "../features/profile/profileSlice";
import LoaderFallback from "../components/LoaderFallback";
const RootLayout = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getBookmarks());
    dispatch(userProfile());
  }, []);

  return (
    <main>
      {status === "pending" ? (
        <LoaderFallback />
      ) : (
        <>
          <Header />
          <Toaster />
          <Container className="lg:min-h-[calc(100vh-146px)] md:min-h-[calc(100vh-146px)] min-h-[calc(100vh-110px)]">
            <Suspense fallback={<LoaderFallback />}>
              <Outlet />
            </Suspense>
          </Container>
          <Footer />
        </>
      )}
    </main>
  );
};

export default RootLayout;
