import { Request, Response, NextFunction } from "express";
import { IUserModel } from "../db";
declare global {
  type ExpressCallback = (
    controller: (request: ExpressHttpRequest) => Promise<IController>
  ) => (req: Request, res: Response, next: NextFunction) => void;

  interface ExpressHttpRequest {
    // TODO: Define a better Body object type
    body: any;
    // query: QueryString.ParsedQs;
    // params: ParamsDictionary;
    query?: any;
    params?: any;
    id?: string;
    method?: string;
    path?: string;
    session?: any;
    headers: {
      "Content-Type": string | undefined;
      Referer: string | undefined;
      "User-Agent": string | undefined;
    };
  }

  interface IControllerResponse {
    headers: {
      "Content-Type": string | undefined;
      "Access-Control-Allow-Origin"?: string | undefined;
      "Access-Control-Allow-Credentials"?: string | undefined;
    };
    statusCode: number;
    body?: IUserModel;
    session?: {
      userID?: string;
      destroy?: boolean;
    };
  }

  interface IControllerError {
    headers: {
      "Content-Type": string;
    };
    statusCode: number;
    body: {
      // TODO: Define a better standard error object
      error?: string;
    };
    session?: {
      userID?: string;
      destroy: boolean;
    };
  }

  type IController = IControllerResponse | IControllerError;
}

const buildExpressCallback: ExpressCallback = (controller) => {
  return (req, res, next) => {
    const httpRequest: ExpressHttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      id: req.ip,
      method: req.method,
      path: req.path,
      // @ts-ignore
      session: req.session!,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((err) => next(err));
  };
};

export default buildExpressCallback;
