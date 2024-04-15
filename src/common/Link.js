import NextLink from "next/link";

const Link = ({ href, children, title = children, style = {}, ...rest }) => {
  return (
    <NextLink
      href={href}
      {...rest}
      style={{
        textDecoration: "none",
        color: "inherit",
        ...style,
      }}
    >
      {title}
    </NextLink>
  );
};

export default Link;