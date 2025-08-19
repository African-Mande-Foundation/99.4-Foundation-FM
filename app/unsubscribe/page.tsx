// app/unsubscribe/page.tsx
"use client";

import { Suspense } from "react";
import UnsubscribePage from "./unsubscribe";
import LoadingBar from "../ui/LoadingBar";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <LoadingBar />
        </div>
      }
    >
      <UnsubscribePage />
    </Suspense>
  );
}
