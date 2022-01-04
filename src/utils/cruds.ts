import { Request, Response, NextFunction } from 'express';



export const getOne = (model:any) => async (req: Request, res: Response) => {

    try {
      const doc = await model
        .findById({ _id: req.params.id })
        .lean()
        .exec()
  
      if (!doc) {
        return res.status(400).end()
      }
  
      res.status(200).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  
  export const getMany = (model:any) => async (req: Request, res: Response) => {
    try {
      const docs = await model
        .find({})
        .lean()
        .exec()
  
      res.status(200).json({ data: docs })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
  
  export const createOne = (model: any) => async (req: Request, res: Response) => {
    
    try {
      const doc = await model.create({ ...req.body })
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
 



  export const crudControllers = (model:any) => ({
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model)
  })

