"use client";

import React from "react";

type Props = {
    children: React.ReactNode;
};

const WorkSpaceLayout = ({ children }: Props) => {
    return <div>{children}</div>;
};

export default WorkSpaceLayout;
