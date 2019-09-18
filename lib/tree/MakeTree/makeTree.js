import React from "react";
import { isNative } from "../../helpers";
import unified from "unified";
import parse from "rehype-parse";
import toReact from "rehype-react";

const TreeContext = React.createContext();

const parseHtml = compiler => options =>
  unified.use(parse).use(compiler, options);

export function TreeProvider({ compiler = toReact, ...props }) {
  return (
    <TreeContext.Provider
      value={{ parseHtml: parseHtml(compiler) }}
      {...props}
    />
  );
}

export function useTree() {
  const context = React.useContext(TreeContext);
  if (context === "undefined") {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}