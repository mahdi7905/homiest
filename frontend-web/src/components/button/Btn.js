import React from "react";
import { useNavigate } from "react-router-dom";

const Btn = ({ title, size, round, variant, route }) => {
  const navigate = useNavigate();
  return (
    <button
      style={{
        backgroundColor: `${
          variant === "contained" ? "var(--btn-primary)" : "transparent"
        }`,
        borderColor: "var(--btn-primary)",
        borderWidth: "2px",
        borderRadius: `${round ? "100px" : "5px"}`,
        paddingLeft: `${
          size === "regular" ? "10px" : size === "big" ? "15px" : "10px"
        }`,
        paddingRight: `${
          size === "regular" ? "10px" : size === "big" ? "15px" : "10px"
        }`,
        paddingTop: "10px",
        paddingBottom: "10px",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid var(--btn-primary)",
        width: "50%",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/${route}`)}
    >
      <p
        style={{
          fontFamily: "interBold",
          fontSize: "9px",
          color: `${
            variant === "contained"
              ? "var(--card-secondary)"
              : "var(--btn-primary)"
          }`,
        }}
      >
        {title}
      </p>
    </button>
  );
};

export default Btn;
