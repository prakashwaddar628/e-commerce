"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.rating === 0) {
      return toast.error("Please select a rating");
    }

    setIsLoading(true);
    try {
      const ratingData = { ...data, userId: user?.id, productId: product.id };
      await axios.post("/api/rating", ratingData);
      toast.success("Rating submitted successfully");
      router.refresh();
      reset();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !product) return null;

  const deliveredOrder = user.orders.some(
    (order) =>
      order.products.some((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product.reviews.find(
    (review: Review) => review.userId === user.id
  );

  if (userReview) {
    return (
      <div className="text-slate-500">
        <Heading title="Rate this product" />
        <p>You have already rated this product.</p>
      </div>
    );
  }

  if (!deliveredOrder) {
    return (
      <div className="text-slate-500">
        <Heading title="Rate this product" />
        <p>You can rate this product once it`&apos;`s delivered.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(event, newValue) => setCustomValue("rating", newValue)}
        aria-label="Rate the product"
      />
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Submit Review"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </div>
  );
};

export default AddRating;
