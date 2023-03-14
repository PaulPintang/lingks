import { Container } from "@mantine/core";
import BookmarkEmptyState from "../components/BookmarkEmptyState";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <Container>
      <Header />
      <BookmarkEmptyState />
    </Container>
  );
};

export default LandingPage;
