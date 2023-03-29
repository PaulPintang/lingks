<<<<<<< HEAD
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
=======
import { TypedUseSelectorHook,useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
>>>>>>> d2c6102773b0d7b0e27e817db129cd69d73edc05
