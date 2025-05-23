import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <div className="py-8" >{children}</div>;
}
