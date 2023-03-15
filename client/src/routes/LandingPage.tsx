import { Container } from "@mantine/core";
import BookmarkEmptyState from "../components/BookmarkEmptyState";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Bookmarks from "./Bookmark/Bookmarks";

const LandingPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <Container>
      <Header />
      {user && profile ? <Bookmarks /> : <BookmarkEmptyState />}
    </Container>
  );
};

export default LandingPage;
