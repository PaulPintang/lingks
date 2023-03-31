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
  const { bookmarks, bookmark } = useAppSelector((state) => state.bookmark);
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
          <Container
            className={
              bookmarks.length <= 3
                ? "lg:h-[calc(100vh-150px)] md:h-[calc(100vh-150px)] h-[calc(100vh-113px)]"
                : bookmark[0]?.links?.length! < 3
                ? "lg:h-[calc(100vh-150px)] md:h-[calc(100vh-150px)] h-[calc(100vh-113px)]"
                : ""
            }
          >
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
