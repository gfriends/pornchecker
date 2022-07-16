# PornChecker 
<b>English | <a href="README_CN.md">简体中文</a></b></p>

A API to check porn image, base on [NSFWJS](https://github.com/infinitered/nsfwjs). This is a [Gfriends](https://github.com/gfriends/gfriends) derivative project.

Common formats supported, such as `jpg`,`png`,`jpeg`.

## Deploy

### Deploy on Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/gfriends/pornchecker)

Default API URL: `https://{APP-Name}.herokuapp.com/api`, change `API_PATH` if you want to anti-hotlinking.

### Deploy on local

Recommended environment is NodeJS 16 or higher.
```
git clone https://github.com/gfriends/pornchecker
cd pornchecker
npm i
npm i -g pm2
pm2 start index.js --name pornchecker
```
Default API URL: `http(s)://{IP}:5000/api`

## Usege
Request：HTTP POST, post binary image file with Content-Type header.

```bash
# Example with Curl
curl "http(s)://{API_URL}/api" -F "image=@/{PATH}/{FILENAME}.jpg;type=image/jpg"
```

```python3
# Example with Python3
import requests
data = {'image': ('{FILENAME}.jpg', open("/{PATH}/{FILENAME}.jpg", 'rb'), "image/jpg")}
response = requests.post('http(s)://{API_URL}/api', files = data)
print(response.text)
```

Response：

```json
[
    {
        "className": "Neutral",
        "probability": 0.9277840852737427
    },
    {
        "className": "Drawing",
        "probability": 0.07143104821443558
    },
    {
        "className": "Hentai",
        "probability": 0.0007780276937410235
    },
    {
        "className": "Porn",
        "probability": 0.000005075656645203708
    },
    {
        "className": "Sexy",
        "probability": 0.0000018030658566203783
    }
]
```

`className` meaning：
- `Drawing` - safe for work drawings (including anime)
- `Hentai` - hentai and pornographic drawings
- `Neutral` - safe for work neutral images
- `Porn` - pornographic images, sexual acts
- `Sexy` - sexually explicit images, not pornography

`probability`meaning：

Range 0-1 , the higher value means closer to that type. In most cases, the highest value is used to determine the image type.