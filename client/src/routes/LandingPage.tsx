import React from "react";
import { Container } from "@mantine/core";
import BookmarkEmptyState from "../components/BookmarkEmptyState";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Bookmarks from "./Bookmark/Bookmarks";

const LandingPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Container>
      <Header />
      {user ? <Bookmarks /> : <BookmarkEmptyState />}
    </Container>
  );
};

export default LandingPage;
