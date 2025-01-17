import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bodyValidator from "../middleware/bodyValidator";
const { postVehicule } = require("../JOI/validate");
const vehiculesRouter = require("express").Router();
import VehiculeInfos from "../interfaces/IVehiculeInfos";
import upload from "../middleware/fileUpload";

const prisma = new PrismaClient();

// get many vehicules (authorization: admin)
vehiculesRouter.get(
  "/all",
  async (req: Request, res: Response, next: NextFunction) => {
    const { brand, model } = req.query;
    try {
      if (req.query.brand) {
        const vehiculeByBrand = await prisma.vehicules.findMany({
          where: {
            model: {
              brand: {
                name: {
                  contains: String(brand),
                },
              },
            },
          },
        });
        res.status(200).json(vehiculeByBrand);
      } else if (req.query.model) {
        const vehiculeByModel = await prisma.vehicules.findMany({
          where: {
            model: {
              name: {
                contains: String(model),
              },
            },
          },
        });
        res.status(200).json(vehiculeByModel);
      } else {
        const vehicules = await prisma.vehicules.findMany();
        res.json(vehicules);
      }
    } catch (err) {
      next(err);
    }
  }
);
// get one vehicule (authorization: all)
vehiculesRouter.get(
  "/:immat",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat = String(req.params.immat);
    try {
      const vehicules = await prisma.vehicules.findUnique({
        where: {
          immat: immat,
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
// get model's vehicule (authorization: all)
vehiculesRouter.get(
  "/:immat/model",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat = req.params.immat;
    try {
      const vehicules = await prisma.vehicules.findUnique({
        where: {
          immat: String(immat),
        },
        select: {
          model: true,
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
// get brand's vehicule (authorization: all)
vehiculesRouter.get(
  "/:immat/brand",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat = req.params.immat;
    try {
      const vehicules = await prisma.vehicules.findUnique({
        where: {
          immat: String(immat),
        },
        select: {
          model: {
            select: {
              brand: true,
            },
          },
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
vehiculesRouter.get(
  "/:immat/type",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat = req.params.immat;
    try {
      const vehicules = await prisma.vehicules.findUnique({
        where: {
          immat: String(immat),
        },
        select: {
          type: true,
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
// get user's vehicule (authorization: pros, admin)
vehiculesRouter.get(
  "/user/:idUser",
  async (req: Request, res: Response, next: NextFunction) => {
    const idUser = parseInt(req.params.idUser);
    try {
      const vehicules = await prisma.users.findUnique({
        where: {
          id_user: idUser,
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);

vehiculesRouter.post("/upload", upload);
// post vehicule (authorization: user, admin)
vehiculesRouter.post(
  "/",
  bodyValidator(postVehicule),
  async (req: Request, res: Response, next: NextFunction) => {
    const vehicule: VehiculeInfos = req.body;
    try {
      const vehicules = await prisma.vehicules.create({
        data: {
          immat: vehicule.immat,
          registration_date: new Date(vehicule.registration_date).toISOString(),
          url_vehiculeRegistration: vehicule.url_vehiculeRegistration,
          model: {
            connect: {
              id_model: vehicule.id_modelId,
            },
          },
          type: {
            connect: {
              id_type: vehicule.id_typeId,
            },
          },
          user: {
            connect: {
              id_user: vehicule.id_userId,
            },
          },
        },
      });
      res.status(200).json(vehicules);
    } catch (err) {
      next(err);
    }
  }
);
// update vehicule (authorization: user, admin)
vehiculesRouter.put(
  "/:immat",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat: string = req.params.immat;
    const vehicule: VehiculeInfos = req.body;
    try {
      const vehiculeUpdate = await prisma.vehicules.update({
        where: {
          immat: immat,
        },
        data: {
          immat: vehicule.immat,
          registration_date: new Date(vehicule.registration_date).toISOString(),
          url_vehiculeRegistration: vehicule.url_vehiculeRegistration,
          model: {
            connect: {
              id_model: vehicule.id_modelId,
            },
          },
          type: {
            connect: {
              id_type: vehicule.id_typeId,
            },
          },
          user: {
            connect: {
              id_user: vehicule.id_userId,
            },
          },
        },
      });
      res.status(200).json(vehiculeUpdate);
    } catch (err) {
      next(err);
    }
  }
);
// delete vehicule (authorization: user, admin)
vehiculesRouter.delete(
  "/:immat",
  async (req: Request, res: Response, next: NextFunction) => {
    const immat: string = req.params.immat;
    try {
      const vehiculeDeleted = await prisma.vehicules.delete({
        where: {
          immat: immat,
        },
      });
      res.status(200).send(`${vehiculeDeleted.immat} deleted`);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = vehiculesRouter;
