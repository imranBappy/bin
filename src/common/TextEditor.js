"use client";
import dynamic from "next/dynamic";
import { Box, Typography } from "@/common";
import { useContext, useMemo, useRef } from "react";
import { ThemeContext } from "@/wrapper/Wrapper";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});
const TextEditor = ({
  value,
  style = {},
  helperText = "",
  placeholder = "Start typing...",
  name = "",
  onChange = () => {},
}) => {
  const [theme] = useContext(ThemeContext);
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      theme: theme,
      style:
        theme === "dark"
          ? {
              backgroundColor: "#111418",
              color: "#fff",
            }
          : {
              backgroundColor: "#fff",
              color: "#000",
            },
    }),
    [placeholder, theme]
  );
  return (
    <Box className="relative" sx={style}>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onChange={(newContent) =>
          onChange({
            target: {
              name: name,
              value: newContent,
            },
          })
        }
      />
      <Typography variant="caption" color="error">
        {helperText}
      </Typography>
    </Box>
  );
};

export default TextEditor;
