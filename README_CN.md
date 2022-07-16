# PornChecker 
<b><a href="README.md">English</a> |  简体中文 </b></p>

基于 [NSFWJS](https://github.com/infinitered/nsfwjs) 的 AI 图片鉴黄 API 接口，[Gfriends 女友头像仓库](https://github.com/gfriends/gfriends) 衍生项目。

支持常见的 `jpg`、`png`、`jpeg` 格式文件。

## 部署

### Heroku 部署
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/gfriends/pornchecker)

默认 API 接口为：`https://{APP-Name}.herokuapp.com/api`，为避免滥用，可通过 `API_PATH` 变量指定路径。

### 本地部署

推荐环境 NodeJS 16 及以上版本
```
git clone https://github.com/gfriends/pornchecker
cd pornchecker
npm i
npm i -g pm2
pm2 start index.js --name pornchecker
```
默认 API 接口为 ：`http(s)://{IP}:5000/api`

## 使用
Request：使用 HTTP POST 方法请求 API，传输二进制图片且 Content-Type 应指定为对应图片格式。

```
# Curl 请求示例
curl http(s)://{API_URL}/api -F "image=@/{PATH}/{FILENAME}.jpg;type=image/jpeg"
```

Response：

```
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

`className` 含义：
- `Drawing` - 安全友好的漫画/绘画
- `Hentai` - 色情漫画/绘画
- `Neutral` - 安全友好的照片
- `Porn` - 色情照片
- `Sexy` - 性感但不露骨的照片


`probability`含义：

范围 0-1 ，值越高，即越接近该类型。大部分情况下以最高值判定图片类型。