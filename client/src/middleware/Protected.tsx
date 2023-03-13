import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";

export const Protected = ({ children }: any) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) return <Navigate to={"/"} replace={true}></Navigate>;
  return children!;
};
