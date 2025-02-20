import { seo } from "../lib/seo";
import { ClerkProvider } from "@clerk/tanstack-start";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { type ReactNode, lazy } from "react";
import { Toaster } from "sonner";
import clerkCss from "../clerk.css?url";
import globalCss from "../globals.css?url";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

const ReactQueryDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
        }))
      );

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Flowble",
        description: "Share videos in a flash",
        keywords:
          "video sharing, free video hosting, upload videos, streaming platform, video streaming, video platform, online video sharing, video content, digital video, video hosting service, flowble, share videos online, video storage, video streaming service, video content platform",
      }),
    ],
    links: [
      { rel: "stylesheet", href: globalCss },
      { rel: "stylesheet", href: clerkCss },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <html lang="en" className="dark">
          <head>
            <HeadContent />
          </head>
          <body className="antialiased font-dmSans">
            <div vaul-drawer-wrapper="">{children}</div>
            <Toaster theme="dark" />
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <Scripts />
          </body>
        </html>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
