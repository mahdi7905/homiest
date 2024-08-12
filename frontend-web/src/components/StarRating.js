import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import React from "react";

const Star = ({ num, rate }) => {
  const half = num - 0.5;

  return rate >= num ? (
    <StarIcon
      style={{ width: "15px", height: "15px", color: "var(--rating-color)" }}
    />
  ) : rate >= half ? (
    <StarHalfIcon
      style={{ width: "15px", height: "15px", color: "var(--rating-color)" }}
    />
  ) : (
    <StarBorderIcon
      style={{ width: "15px", height: "15px", color: "var(--rating-color)" }}
    />
  );
};

const StarRating = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ flexDirection: "row", gap: "5px" }}>
      {stars.map((star) => (
        <Star rate={rating} num={star} key={star} />
      ))}
    </div>
  );
};

export default StarRating;
