---
title: Git 提交规范
description: 分支策略、提交信息格式与版本号规范
---

## 分支策略

采用主干开发（Trunk-Based Development）模型。

| 分支    | 用途         | 命名规则                    | 生命周期   |
| ------- | ------------ | --------------------------- | ---------- |
| main    | 唯一长期分支 | `main`                      | 永久       |
| feature | 功能分支     | `feature/[工单号]-简短描述` | 不超过2天  |
| bugfix  | 缺陷修复     | `bugfix/[工单号]-简短描述`  | 不超过1天  |
| hotfix  | 紧急修复     | `hotfix/[工单号]-简短描述`  | 数小时内   |
| release | 发布准备     | `release/v[版本号]`         | 发布后删除 |

规则：功能分支从 main 创建，不超过2天，大功能用 Feature Flag，禁止 force push main，合并前必须通过 CI 和审查。

## 提交信息格式

遵循 Conventional Commits：

```text
<type>(<scope>): <subject>
[body]
[footer]
```

- type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- scope: 影响范围（可选）
- subject: 祈使句式，不超50字符，不用句号，英文首字母不大写
- body: 说明做了什么和为什么，每行不超72字符
- footer: 关联 issue（closes/refs），破坏性变更用 BREAKING CHANGE 开头

示例：

```text
feat(payment): 增加微信支付回调处理
接入微信支付异步通知接口，支持订单状态自动更新。
使用签名校验确保回调来源合法。
closes #234
```

## 提交粒度

- 一个提交只做一件事
- 每个提交独立通过 CI
- 新增功能+对应测试可在同一提交
- 重构+功能变更必须拆开
- 格式调整+逻辑修改必须拆开
- 多个独立修复各自提交

## Pull Request 规范

标题格式：`<type>(<scope>): <subject>`

描述模板包含：变更内容、变更原因、测试方式、关联 issue、检查清单

规则：保持 PR 尽可能小（建议不超过400行），CI 通过后再请求审查，至少1人批准，用 Squash Merge 合并

## 版本号与标签

语义化版本：`v<主>.<次>.<修订>[-预发布]`

- 破坏性变更：主+1
- 向后兼容新功能：次+1
- 向后兼容修复：修订+1

标签格式：`v1.2.3`

## 禁止事项

- 禁止 force push main
- 禁止提交密钥/凭证/Token
- 禁止提交 IDE 配置/临时文件
- 禁止未格式化的代码
- 禁止无意义提交信息（"update"、"WIP"）
- 禁止一个提交包含多个不相关变更
