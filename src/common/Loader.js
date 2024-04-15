import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        color: "#fff",
        fontSize: "2rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.5rem",
        textAlign: "center",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      Loading...
    </div>
  );
};

export default Loader;
