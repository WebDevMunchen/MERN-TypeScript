import { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import type { LoginData } from "../types/types";

export default function Login() {
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    authContext?.login(data);
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
