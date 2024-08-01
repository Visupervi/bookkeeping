import { lazy, Suspense } from "react"
// import { redirect } from "react-router-dom"

const Layout = lazy(() => import("@/pages/Layout"))
const New = lazy(() => import("@/pages/New"))
const Month = lazy(() => import("@/pages/Month"))
const Year = lazy(() => import("@/pages/Year"))
const NotFound = lazy(() => import("@/pages/NotFound"))
const routes = [
  {
    path: "/",
    element: <Layout />,
    redirect: "/month",
    children: [
      {
        path: "/year",
        name: "year",
        // index: true,
        element: <Suspense fallback={<div style={{ paddingTop: '14px' }}>loading...</div>}><Year /></Suspense>
      },
      {
        path: "/month",
        name: "month",
        element: <Suspense fallback={<div style={{ paddingTop: '14px' }}>loading...</div>}><Month /></Suspense>
      },
      {
        path: "/new",
        name: "new",
        element: <Suspense fallback={<div style={{ paddingTop: '14px' }}>loading...</div>}><New /></Suspense>
      }
    ]
  },
  {
    name:"notFound",
    path: "*",
    key: "404",
    element: <Suspense fallback={<div style={{ paddingTop: '14px' }}>loading...</div>}><NotFound /></Suspense>
  }
]

export default routes