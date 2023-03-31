import { LoadingOverlay } from "@mantine/core";

const LoaderFallback = () => {
  return (
    <LoadingOverlay
      className="h-screen"
      loaderProps={{ variant: "bars" }}
      visible={true}
      overlayOpacity={1}
    />
  );
};

export default LoaderFallback;
