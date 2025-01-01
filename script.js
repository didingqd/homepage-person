// 数据部分：分组和链接
const groups = [
  {
    title: '搜索引擎',
    links: [
      { name: '谷歌', url: 'https://www.google.com', icon: 'logos:google-icon' },
      { name: '必应', url: 'https://www.bing.com', icon: 'logos:bing' },
      { name: '百度', url: 'https://baidu.com', icon: 'ri:baidu-fill' },
    ],
  },
  {
    title: '开发工具',
    links: [
      { name: 'GitHub', url: 'https://github.com', icon: 'logos:github-icon' },
      { name: 'Cloudflare', url: 'https://www.cloudflare-cn.com', icon: 'logos:cloudflare' },
    ],
  },
  {
    title: '其他',
    links: [
      { name: 'Example', url: 'https://example.com', icon: 'carbon:link' },
      { name: 'Iconify', url: 'https://icon-sets.iconify.design', icon: 'simple-icons:iconify' },
    ],
  },
];

// 动态生成 HTML 的函数
function renderGroups() {
  const container = document.getElementById('groups-container');
  container.innerHTML = groups
    .map(
      (group) => `
        <div class="group-container p-6">
          <h2 class="text-xl font-semibold text-center mb-4 text-gray-800">${group.title}</h2>
          <div class="space-y-3">
            ${group.links
          .map(
            (link) => `
                  <a href="${link.url}" class="flex items-center p-3 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg transition duration-300 hover:bg-gray-50">
                    <span class="iconify mr-3" data-icon="${link.icon}" data-width="24" data-height="24"></span>
                    <span class="link-text">${link.name}</span>
                  </a>
                `
          )
          .join('')}
          </div>
        </div>
      `
    )
    .join('');
}

// 页面加载时渲染分组
document.addEventListener('DOMContentLoaded', renderGroups);
