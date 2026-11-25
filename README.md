# Multi-Agent Dev Team

**让 Claude、Codex 和 Gemini 像一个开发组一样协作。**

Claude Code 负责拆需求、评估方案和验收。Codex 实现后端，Gemini 实现前端。两边按同一份接口契约推进，遇到阻塞时由 Claude 接手，交付记录保留实际执行人。

[English](README.en.md) · [快速开始](#快速开始) · [项目沿革](docs/history.md) · [当前技术方案](docs/runtime.md)

![2026 年 3 月工作台重绘。Claude Code 在 VS Code 中统筹，tmux 窗格显示 Shell/CCB、Codex CLI 和 Gemini CLI。](assets/march-workspace.webp)

*2026 年 3 月首次联调重绘。左侧是 VS Code 里的 Claude Code，独立终端中的三个 tmux 窗格同时显示调度、后端和前端。Gemini 已交回页面，Codex 的任务仍无结果，Claude 随后接手。*

## 一个开发组怎样交付

| 角色 | 工具 | 交付责任 |
| --- | --- | --- |
| 项目主管 | Claude Code | 定接口和验收标准，评估实现方案，审查 diff 和测试，需要时接手。 |
| 后端工程师 | Codex CLI | 按契约实现接口、数据逻辑和后端测试。 |
| 前端工程师 | Gemini，个人账号使用 Antigravity CLI | 按同一契约做页面和交互，可以先用模拟响应推进。 |

![协作流程。Claude 确定契约，前后端并行实现，Claude 验收。发生阻塞时隔离原尝试，接手后重新验收。](assets/handoff.svg)

任务单写清文件范围、基准提交和完成条件。适合拆开的任务才并行，每个文件同一时间由一位执行者负责。Claude 合并前检查实际改动、运行验证，并记下谁完成了任务。

## 从 3 月工作台到 Awesome Stock

**3 月 17–18 日 · 搭建与首次联调。** 先在 VS Code 里运行 Claude Code，用 CCB 把任务发给独立 tmux 窗格里的 Codex CLI 和 Gemini CLI。Hello API 首测中，Gemini 交回了页面。Codex 提交后未回传结果，Claude 接手后端，完成接口和页面联调。

**4 月 25–26 日 · 用到真实功能。** 在 [Awesome Stock](https://github.com/JayeeeJY/awesome-stock) 的投资组合模块里，Codex 完成账本数据层、持仓行情接口、诊断与日记 API、导入导出。Gemini 完成诊断页、假设推演页和仪表板卡片。Claude 接手账户页骨架和持仓总览两项前端任务。

![Awesome Stock 初期九项任务的实际分工。Codex 完成四项，Gemini 完成三项，Claude 接手两项前端任务。](assets/awesome-stock-case.svg)

**5 月 2 日 · 整理成 PM-Pro。** 原型的内部代号演变为 PM-Pro，方案把接口契约、任务归档、分层审查和故障接管写成了可复用规则。上述九项记录展示了实际交付和接管过程。速度和成本收益仍需要对照测量。 [完整项目沿革](docs/history.md)

## 快速开始

使用 Node.js 22 或更高版本，在仓库根目录运行以下命令。

```sh
node --test examples/hello-api/contract.test.mjs
node examples/hello-api/server.mjs
```

打开 <http://127.0.0.1:3000>，点击 **Fetch message**，页面会显示本地 API 的消息和时间戳。示例无需安装依赖或登录模型账号。可以用 `Ctrl+C` 停止，或用 `PORT=3001` 更换端口。 [示例说明](examples/hello-api/README.md)

把这套流程用到自己的项目时，可以通过 **Use this template** 新建仓库，或复制 [Claude 项目规则](CLAUDE.md)、[接口契约](templates/api-contract.md) 和 [任务单](templates/task.md)。[示例交接记录](examples/hello-api/handoff.md) 给出了两张任务单，以及从同一基准提交创建独立工作树的命令。

## 今天怎么运行三方协作

保留三方分工。需要自动派活时，建议采用官方 CLI 的非交互模式，在独立 Git worktree 执行，把结构化回执写进任务记录。个人账号的 Gemini 路径采用 Antigravity CLI。tmux 继续用来观察进度，验收以实际 diff 和测试为准。

![现行建议。Codex 和 Antigravity 在独立工作树执行，结构化回执写入任务记录，由 Claude 检查差异和测试后验收。](assets/runtime.svg)

当前版本提供协作规则、手动交接流程和本地示例。[技术方案与官方文档](docs/runtime.md) 记录了三方自动派活的设计、状态判定和接管边界。

[MIT 许可](LICENSE) 适用于本仓库材料。历史原型使用了独立项目 [Claude Code Bridge](https://github.com/SeemSeam/claude_codex_bridge)，其许可见 [上游仓库](https://github.com/SeemSeam/claude_codex_bridge/blob/main/LICENSE)。
