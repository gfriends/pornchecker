const express = require('express')
const multer = require('multer')
const jpeg = require('jpeg-js')

const tf = require('@tensorflow/tfjs-node')
const nsfw = require('nsfwjs')

const app = express()
const upload = multer()

let _model

const convert = async (img) => {
  // Decoded image in UInt8 Byte array
  const image = await jpeg.decode(img, true)

  const numChannels = 3
  const numPixels = image.width * image.height
  const values = new Int32Array(numPixels * numChannels)

  for (let i = 0; i < numPixels; i++)
    for (let c = 0; c < numChannels; ++c)
      values[i * numChannels + c] = image.data[i * 4 + c]

  return tf.tensor3d(values, [image.height, image.width, numChannels], 'int32')
}

app.post('/api', upload.single('image'), async (req, res) => {
  if (!req.file) res.status(400).send('Missing image multipart/form-data')
  else {
    const image = await convert(req.file.buffer)
    const predictions = await _model.classify(image)
    image.dispose()
    res.json(predictions)
  }
})

app.get('/', async (req, res) => {
    res.send('PornChecker API - From Gfriends Project');
})

const load_model = async () => {
    _model = await nsfw.load('./model/')
}

load_model().then(() => app.listen(process.env.PORT || 5000))
