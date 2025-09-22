import { useForm, type SubmitHandler } from "react-hook-form";
import { axiosClient } from "../utils/axiosClient";
import type { LoginData } from "../types/types";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    axiosClient
      .post("/user/register", data)
      .then((response) => {
        console.log(response.data);
        console.log("Registered!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}

      <input {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
