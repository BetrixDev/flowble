"use client";

import { useEffect } from "react";
import { incrementViewCount } from "../actions";

type ViewIncrementerProps = {
  token: string;
  videoDuration: number;
};

export function ViewIncrementer({ token, videoDuration }: ViewIncrementerProps) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        incrementViewCount(token);
      },
      (videoDuration / 2) * 1000,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
