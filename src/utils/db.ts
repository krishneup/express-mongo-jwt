import mongoose from 'mongoose'
import config from './config'

export const connect = (url = config.dburl) => {
    return mongoose.connect(url)
}