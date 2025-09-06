"use client";

import { useState } from "react";
import Form_auth from "../../_Components/Forms/form_auth";

const Page = () => {
  const [mode, setMode] = useState<string>("Login");

  return <Form_auth mode={mode} setMode={setMode} />;
};

export default Page;
