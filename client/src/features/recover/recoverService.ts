import axios from "axios";

export const handleOTP = async (email: string) => {
  try {
    const res = await axios.post("/api/user/recover", { email: email });
    localStorage.setItem("email", email);
    return res.status;
  } catch (err: any) {
    return err.response.data.error;
  }
};

export const handleVerifyOTP = async (OTP: number) => {
  try {
    const res = await axios.get("/api/user/verify", {
      params: { OTP },
    });
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return err.response.data.error;
  }
};
