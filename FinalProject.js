
// 初始化地图
const map = L.map('map').setView([35, 105], 4);
map.attributionControl.setPrefix('');

// 添加瓦片
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: ['1', '2', '3', '4'],
    attribution: '© 高德地图'
}).addTo(map);

// 热门地区
const hotSpots = ['云南', '海南', '北京', '上海', '重庆', '四川', '西藏', '新疆', '湖南', '广西'];

function normalizeRegionName(name) {
    return name
        .replace(/省|市|自治区|特别行政区/g, '')
        .replace(/维吾尔|壮族/g, '')
        .trim();
}

function isHotSpot(name) {
    return hotSpots.includes(normalizeRegionName(name));
}

const pageNameMap = {
    '云南': 'yunnan',
    '海南': 'hainan',
    '北京': 'beijing',
    '上海': 'shanghai',
    '重庆': 'chongqing',
    '四川': 'sichuan',
    '西藏': 'xizang',
    '新疆': 'xinjiang',
    '湖南': 'hunan',
    '广西': 'guangxi'
};

function getPageName(name) {
    const region = normalizeRegionName(name);
    return pageNameMap[region] || region.toLowerCase();
}

// 加载行政区划
fetch('./data/行政区划.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function(feature) {
                if (isHotSpot(feature.properties.name)) {
                    return { color: '#e07b7b', weight: 2, fillColor: '#ffcccc', fillOpacity: 0.45 };
                } else {
                    return { color: '#7baed5', weight: 1, fillColor: '#cceeff', fillOpacity: 0.3 };
                }
            },
            onEachFeature: function(feature, layer) {
                const defaultStyle = {
                    color: layer.options.color,
                    weight: layer.options.weight,
                    fillColor: layer.options.fillColor,
                    fillOpacity: layer.options.fillOpacity
                };

                layer.on('click', function() {
                    const name = feature.properties.name;
                    if (isHotSpot(name)) {
                        const pageName = getPageName(name);
                        window.location.href = `spots/${pageName}.html`;
                    } else {
                        alert('暂不支持该地区');
                    }
                });

                layer.on('mouseover', function() {
                    layer.setStyle({ weight: 3, fillOpacity: 0.7 });
                });
                layer.on('mouseout', function() {
                    layer.setStyle(defaultStyle);
                });

                layer.bindPopup(`<b>${feature.properties.name}</b>`);
                layer.bindTooltip(feature.properties.name);
            }
        }).addTo(map);
    })
    .catch(error => console.error('加载地图数据失败:', error));

// 图例显隐控制
const legend = document.getElementById('legend');
const toggleBtn = document.getElementById('toggleLegend');
toggleBtn.addEventListener('click', function() {
    if (legend.style.display === 'none') {
        legend.style.display = 'block';
        toggleBtn.innerHTML = ' 隐藏图例';
    } else {
        legend.style.display = 'none';
        toggleBtn.innerHTML = '显示图例';
    }
});