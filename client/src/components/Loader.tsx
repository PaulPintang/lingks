import { Loader as Loading, LoadingOverlay } from "@mantine/core";
import { useAppSelector } from "../app/hooks";
<<<<<<< HEAD

const Loader = () => {
  const { status } = useAppSelector((state) => state.profile);
=======
import { RootState } from "../app/store";

const Loader = () => {
  const { status } = useAppSelector((state: RootState) => state.profile);
>>>>>>> d2c6102773b0d7b0e27e817db129cd69d73edc05
  return (
    <LoadingOverlay
      visible={status === "pending" && true}
      loader={<Loading variant="bars" />}
      overlayOpacity={1}
    />
  );
};

export default Loader;
