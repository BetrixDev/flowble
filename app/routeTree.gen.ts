/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as VideosImport } from './routes/videos'
import { Route as SuccessImport } from './routes/success'
import { Route as PricingImport } from './routes/pricing'
import { Route as IndexImport } from './routes/index'
import { Route as SignUpSplatImport } from './routes/sign-up.$'
import { Route as SignInSplatImport } from './routes/sign-in.$'
import { Route as PVideoIdImport } from './routes/p.$videoId'

// Create/Update Routes

const VideosRoute = VideosImport.update({
  id: '/videos',
  path: '/videos',
  getParentRoute: () => rootRoute,
} as any)

const SuccessRoute = SuccessImport.update({
  id: '/success',
  path: '/success',
  getParentRoute: () => rootRoute,
} as any)

const PricingRoute = PricingImport.update({
  id: '/pricing',
  path: '/pricing',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SignUpSplatRoute = SignUpSplatImport.update({
  id: '/sign-up/$',
  path: '/sign-up/$',
  getParentRoute: () => rootRoute,
} as any)

const SignInSplatRoute = SignInSplatImport.update({
  id: '/sign-in/$',
  path: '/sign-in/$',
  getParentRoute: () => rootRoute,
} as any)

const PVideoIdRoute = PVideoIdImport.update({
  id: '/p/$videoId',
  path: '/p/$videoId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/pricing': {
      id: '/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof PricingImport
      parentRoute: typeof rootRoute
    }
    '/success': {
      id: '/success'
      path: '/success'
      fullPath: '/success'
      preLoaderRoute: typeof SuccessImport
      parentRoute: typeof rootRoute
    }
    '/videos': {
      id: '/videos'
      path: '/videos'
      fullPath: '/videos'
      preLoaderRoute: typeof VideosImport
      parentRoute: typeof rootRoute
    }
    '/p/$videoId': {
      id: '/p/$videoId'
      path: '/p/$videoId'
      fullPath: '/p/$videoId'
      preLoaderRoute: typeof PVideoIdImport
      parentRoute: typeof rootRoute
    }
    '/sign-in/$': {
      id: '/sign-in/$'
      path: '/sign-in/$'
      fullPath: '/sign-in/$'
      preLoaderRoute: typeof SignInSplatImport
      parentRoute: typeof rootRoute
    }
    '/sign-up/$': {
      id: '/sign-up/$'
      path: '/sign-up/$'
      fullPath: '/sign-up/$'
      preLoaderRoute: typeof SignUpSplatImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/pricing': typeof PricingRoute
  '/success': typeof SuccessRoute
  '/videos': typeof VideosRoute
  '/p/$videoId': typeof PVideoIdRoute
  '/sign-in/$': typeof SignInSplatRoute
  '/sign-up/$': typeof SignUpSplatRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/pricing': typeof PricingRoute
  '/success': typeof SuccessRoute
  '/videos': typeof VideosRoute
  '/p/$videoId': typeof PVideoIdRoute
  '/sign-in/$': typeof SignInSplatRoute
  '/sign-up/$': typeof SignUpSplatRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/pricing': typeof PricingRoute
  '/success': typeof SuccessRoute
  '/videos': typeof VideosRoute
  '/p/$videoId': typeof PVideoIdRoute
  '/sign-in/$': typeof SignInSplatRoute
  '/sign-up/$': typeof SignUpSplatRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/pricing'
    | '/success'
    | '/videos'
    | '/p/$videoId'
    | '/sign-in/$'
    | '/sign-up/$'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/pricing'
    | '/success'
    | '/videos'
    | '/p/$videoId'
    | '/sign-in/$'
    | '/sign-up/$'
  id:
    | '__root__'
    | '/'
    | '/pricing'
    | '/success'
    | '/videos'
    | '/p/$videoId'
    | '/sign-in/$'
    | '/sign-up/$'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PricingRoute: typeof PricingRoute
  SuccessRoute: typeof SuccessRoute
  VideosRoute: typeof VideosRoute
  PVideoIdRoute: typeof PVideoIdRoute
  SignInSplatRoute: typeof SignInSplatRoute
  SignUpSplatRoute: typeof SignUpSplatRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PricingRoute: PricingRoute,
  SuccessRoute: SuccessRoute,
  VideosRoute: VideosRoute,
  PVideoIdRoute: PVideoIdRoute,
  SignInSplatRoute: SignInSplatRoute,
  SignUpSplatRoute: SignUpSplatRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/pricing",
        "/success",
        "/videos",
        "/p/$videoId",
        "/sign-in/$",
        "/sign-up/$"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/pricing": {
      "filePath": "pricing.tsx"
    },
    "/success": {
      "filePath": "success.tsx"
    },
    "/videos": {
      "filePath": "videos.tsx"
    },
    "/p/$videoId": {
      "filePath": "p.$videoId.tsx"
    },
    "/sign-in/$": {
      "filePath": "sign-in.$.tsx"
    },
    "/sign-up/$": {
      "filePath": "sign-up.$.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
