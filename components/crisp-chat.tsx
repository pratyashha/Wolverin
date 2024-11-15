"use client";
import { useEffect } from "react";

import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("3ce911c8-27b8-45dd-a0ff-0bc0b9c8fd31");
  }, []);

  return null;
};
