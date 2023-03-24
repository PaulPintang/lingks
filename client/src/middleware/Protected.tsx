import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const Protected = ({ children }: any) => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) return <Navigate to={"/"} replace={true}></Navigate>;
  return children!;
};
