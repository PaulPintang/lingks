import { Center } from "@mantine/core";
import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error: any = useRouteError();
  return (
    <Center>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Center>
  );
};

export default NotFound;
