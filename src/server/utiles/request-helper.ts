export default function (req: any, res: any, next: any) {

  if (!req.body) {
    req.body = {};
  }


  req.data = Object.keys(req.body).length === 0 ? req.query : req.body;
  if (Object.hasOwnProperty.call(req.data, "stringify")) {
    req.data = JSON.parse(req.data.stringify);
  }
  next();
}
