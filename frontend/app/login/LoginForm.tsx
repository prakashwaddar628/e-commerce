"use client";

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps{
  currentUser: SafeUser | null;
}

const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(()=>{
    if(currentUser){
      router.push('/');
      router.refresh();
      }
  },[currentUser, router])

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          router.push("/");
          router.refresh();
          toast.success("Loggen In");
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch(() => toast.error("something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  if(currentUser){
    return <p className="text-center">Logged in. Rediricting...</p>
  }
  return (
    <>
      <Heading title="Login to AAKARA" />
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => signIn('google', { redirect: false })}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="email"
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Login"}
        onClick={handleSubmit(onsubmit)}
      />
      <p className="text-sm">
        Don`&apos;`t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600"
          style={{ fontFamily: "'Brush Script', cursive" }}
        >
          Create One
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
