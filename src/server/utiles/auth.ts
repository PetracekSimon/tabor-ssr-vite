import jwt from "jsonwebtoken";
import routesRoleList from "./routes-role-list";
import UserMongo from "../user/mongo";

const _userMongo = new UserMongo();

export default async function (req, res, next) {
  //HDS 1 (get info about current route)
  const routeInfo = {
    path: req.apiPath + req.route.path,
    method: req.route.stack[0].method,
  };
  let currentRoute;
  
  routesRoleList.forEach((route) => {
    if (route.path === routeInfo.path && route.method === routeInfo.method) {
      currentRoute = route;
    }
  });
  //HDS 2 (get info about user)
  const token = req.header("auth-token");
  
  if (currentRoute.roles[0] !== "Public") {
    if (!token) {
      //A1
      return res.status(401).send({
        errMessage: { cs: "Nejste přihlášen.", en: "You are not logged in." },
      });
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await getUser(verified.id);
      let hasUserRights;
      hasUserRights = currentRoute.roles.includes(req.user.role);
      if (!hasUserRights) {
        return res.status(401).send({
          errMessage: {
            cs: "Nemáte právo spustit požadovanou funkcionalitu",
            en: "You don't have rights to run this function",
          },
        });
      }
    } catch (error) {
      return res.status(403).send({
        errMessage: {
          cs: "Vaš token vypršel, přihlaste se znovu prosím.",
          en: "Your token is no longer valid. Please relog yourself.",
        },
      });
    }
  }
  next();
};

async function getUser(id) {
  return await _userMongo.get(id);
}
