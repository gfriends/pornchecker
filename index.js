const express = require('express')
const multer = require('multer')

const tf = require('@tensorflow/tfjs-node')
const nsfw = require('nsfwjs')

const app = express()
const upload = multer()

let _model

app.post('/api', upload.single('image'), async (req, res) => {
  if (!req.file) res.status(400).send('Missing image multipart/form-data')
  else {
    const image = await tf.node.decodeImage(req.file.buffer)
    const predictions = await _model.classify(image)
    image.dispose()
    res.json(predictions)
  }
})

app.get('/', async (req, res) => {
    res.send('PornChecker API - From Gfriends Project');
})

const load_model = async () => {
    _model = await nsfw.load('https://nsfwjs.com/quant_mid/')
}

load_model().then(() => app.listen(process.env.PORT || 5000))
