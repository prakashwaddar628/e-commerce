"use client";

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment"; // Consider replacing with date-fns or dayjs for a smaller bundle size.

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  // If no reviews are available, don't render anything.
  if (!product.reviews || product.reviews.length === 0) return null;

  return (
    <div>
      <Heading title="Product Reviews" />
      <div className="text-sm mt-4 space-y-4">
        {product.reviews.map((review: any) => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 shadow-sm p-4 rounded-md max-w-full"
          >
            <div className="flex items-center gap-3">
              <Avatar src={review?.user?.image || "/default-avatar.png"} />
              <div>
                <div className="font-semibold text-slate-700">
                  {review?.user?.name || "Anonymous"}
                </div>
                <div className="text-xs text-gray-500">
                  {moment(review.createdDate).fromNow()}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Rating value={review.rating} readOnly size="small" />
              <p className="mt-2 text-slate-600">
                {review.comment || "No comment provided."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRating;
