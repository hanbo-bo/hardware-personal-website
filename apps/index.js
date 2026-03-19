const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PUSHPLUS_TOKEN = 'e5696d3ef2b5426e9099626cc3fc8500';
const pushUrl = 'http://www.pushplus.plus/send';




// 解析前端发来的 JSON 数据
app.use(express.json());

// 接收表单的接口
app.post('/api/submit-form', async (req, res) => {
    const { name, phone, product } = req.body;

    // 拼装你要发给业务群的消息内容
    const messageContent = `🚨【新询盘提醒】\n客户称呼：${name}\n手机号码：${phone}\n需求产品：${product}\n请在 30 分钟内致电跟进！`;


// 个人微信的 Payload 极其简单
const payload = {
    token: PUSHPLUS_TOKEN,
    title: '🚨新大宗采购询盘',
    content: messageContent, // 你拼接好的表单信息
    template: 'html' // 支持简单的排版
};

await fetch(pushUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
});


    // 注意：这里以【企业微信机器人】或【钉钉机器人】的数据格式为例
    // 如果用的是飞书，格式稍微不同
    // const payload = {
    //     msgtype: "text",
    //     text: { content: messageContent }
    // };

    // try {
    //     // 把消息推送给机器人 Webhook
    //     // 【请把下面这个网址换成你真实的 Webhook 网址！！！】
    //     const WEBHOOK_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxx-xxxx-xxxx'; 

    //     await fetch(WEBHOOK_URL, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(payload)
    //     });

    //     res.status(200).json({ success: true, message: '已通知销售' });
    // } catch (error) {
    //     console.error('推送失败:', error);
    //     res.status(500).json({ success: false, message: '服务器错误' });
    // }
});

// 让这个小后端运行在 3000 端口
app.listen(3000, () => {
    console.log('接线员已上线，监听 3000 端口');
});