# AI 学习规划与复盘助手

面向学生的学习计划、执行记录与阶段复盘工具。首版可在无模型密钥时使用本地规则运行；配置服务端环境变量后，可通过 OpenAI Responses API 生成个性化建议。

## 功能

- 根据目标、截止日期和每日可用时间生成任务
- 每日任务打卡与完成率统计
- 记录学习内容、用时、掌握程度和问题
- 自动汇总阶段学习情况
- 本地教练建议与可选 AI 建议
- LocalStorage 本地持久化

## 运行

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

访问 `http://localhost:4173`。

## 可选 AI 配置

仅在服务端设置环境变量，不要将 API Key 写入前端或提交到 Git：

```powershell
$env:OPENAI_API_KEY="你的密钥"
$env:OPENAI_MODEL="你账号可用的模型名称"
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## 后续计划

- 周计划日历与到期提醒
- 番茄钟和专注中断记录
- 更严格的结构化 AI 输出校验
- 学习趋势图与薄弱知识点追踪
