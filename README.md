# A Web Project

FinalProject — 中国旅游地图（China Travel Map）
这是一个纯前端 Web 应用，无需后端服务器，直接在浏览器中打开即可使用。它是一个交互式中国旅游地图，用户可探索 10 个省/直辖市的热门景点。

项目结构

FinalProject/
├── index.html                     # 入口，自动跳转到 FinalProject.html
├── FinalProject.html              # 主页面（地图页）
├── FinalProject.css               # 主页面样式
├── FinalProject.js                # 地图交互逻辑（Leaflet）
├── lib/
│   ├── leaflet.js / leaflet.css   # Leaflet 地图库（高德瓦片）
│   └── swiper-bundle.min.js/css   # Swiper 轮播库（景点页用）
├── data/
│   ├── 行政区划.geojson             # 中国行政区划 GeoJSON 数据
│   ├── 中华人民共和国.svg           # SVG 备用素材
│   ├── Welcome Home, Son.mp3       # 音频素材
│   └── images/                    # 各地景点图片（10个城市，~100张）
│       ├── beijing/  (9张)    ├── guangxi/  (9张)   ├── sichuan/  (11张)
│       ├── shanghai/ (9张)   ├── hainan/   (9张)   ├── xinjiang/ (9张)
│       ├── chongqing/(9张)   ├── hunan/    (9张)   ├── xizang/   (10张)
│       └── ...                                              └── yunnan/   (9张)
└── spots/                        # 10 个省市详情页（每个都是独立 HTML）
    ├── beijing.html               ├── chongqing.html  ├── sichuan.html
    ├── shanghai.html              ├── guangxi.html    ├── xinjiang.html
    ├── hunan.html                 ├── hainan.html     ├── xizang.html
    └── yunnan.html
技术栈与架构
层级	技术
地图	Leaflet.js + 高德地图瓦片
轮播	Swiper.js（自动循环播放景点图）
地图数据	GeoJSON 格式的中国行政区划边界
样式	原生 CSS（CSS Variables 主题色、Flexbox/Grid 布局、毛玻璃效果）

主页面（FinalProject.html）功能
顶部介绍区：项目标题、说明文字、支持的10个地区列表
热门目的地标签：10 个胶囊按钮，点击直接跳转到对应省市详情页
Leaflet 交互地图：
使用高德地图瓦片，中文标注
加载 行政区划.geojson 绘制各省边界
已支持地区用粉色高亮，未支持地区用蓝色
点击已支持省份 → 跳转到 spots/xxx.html 详情页
点击未支持省份 → 弹出"暂不支持"提示
悬停高亮 + Tooltip + Popup
图例面板（可隐藏/显示）
![Index 图片](index.png)

景点详情页（spots/*.html）功能
每个省市页面是独立自包含的 HTML 文件（内嵌 <style>），结构统一：
顶部粘性导航：城市标题 + "返回地图"按钮
Swiper 轮播：4 张精选景点大图，自动循环播放
旅行锦囊：4 张卡片（季节、交通、美食、预约等实用信息）
自然风光区：景点卡片网格（图片 + 名称 + 描述）
人文瑰宝区：景点卡片网格
页脚祝福语
![Spot 图片](spot.png)
                      Create by HNNU湖南师范大学 计算机科学与技术（普高师范）专业 wchopstick
