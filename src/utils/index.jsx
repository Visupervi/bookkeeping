import { Route, Navigate } from "react-router-dom";
export const rotuerViews = (routerItems) => {
  if (routerItems && routerItems.length) {
    return routerItems.map(({ path, element, children, redirect }) => {
      return children && children.length ? (
        <Route path={path} key={path} element={element} >
          {rotuerViews(children)} // 递归遍历子路由
          {redirect ?
            (<Route path={path} element={<Navigate to={redirect} />}></Route>) :
            (<Route path={path} element={<Navigate to={children[0].path} />}></Route>)
          }
        </Route>
      ) : (

        <Route key={path} path={path} element={element} >
        </Route>

      );
      // </Suspense>

    });
  }
};