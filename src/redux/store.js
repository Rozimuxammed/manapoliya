import { configureStore } from "@reduxjs/toolkit";
import stadions from "../redux/slice/stadionSlice";
export const store = configureStore({
  reducer: { stadions },
});
