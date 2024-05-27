import React from "react";

const page = ({ params }: { params: { uploadId: string } }) => {
  return <div>{params.uploadId}</div>;
};

export default page;
