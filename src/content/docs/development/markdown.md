---
title: Markdown 格式规范
description: 文档排版与 Prettier/markdownlint 工具链配置
---

> 本规范适用于仓库内所有 Markdown 文档（`.md`），涵盖站点文档、README、Issue 与 PR 描述。团队使用 [Prettier](https://prettier.io/) 负责格式化排版、[markdownlint](https://github.com/DavidAnson/markdownlint) 负责规则校验，二者配置已相互对齐（见第 12 节），先格式化后校验不会冲突。

---

## 1. 通用原则

- 标题统一使用 ATX 风格（`#`），不使用 Setext（下划线）风格。
- 使用空格缩进，禁止使用制表符（Tab）。
- 行尾不留多余空格，文件末尾保留且仅保留一个换行符。
- 标题、段落、列表、代码块、表格等块级元素之间用一个空行分隔。
- 连续空行不超过一行。

## 2. 标题

### 2.1 层级

每个文档只有一个一级标题（`#`），作为文档标题置于开头。标题层级逐级递增，不得跳级：

```markdown
<!-- bad — 从 H2 跳到 H4 -->

## 概述

#### 细节

<!-- good -->

## 概述

### 细节
```

### 2.2 格式

`#` 与标题文字之间加一个空格，标题前后各留一个空行，末尾不加标点：

```markdown
<!-- bad — 缺少空格、结尾带标点 -->

##概述：

<!-- good -->

## 概述
```

## 3. 段落与换行

段落之间用一个空行分隔。避免使用行尾两个空格实现硬换行；需要分行时另起段落或改用列表：

```markdown
<!-- bad — 行尾空格换行（不可见、易丢失） -->
第一行␠␠
第二行

<!-- good -->
第一行

第二行
```

## 4. 列表

### 4.1 无序列表

统一使用连字符 `-` 作为项目符号，不混用 `*` 或 `+`：

```markdown
<!-- bad -->
* 第一项
+ 第二项

<!-- good -->
- 第一项
- 第二项
```

### 4.2 有序列表

推荐使用递增序号 `1.`、`2.`、`3.`。序号会由 Prettier 自动规范，无需手动维护：

```markdown
<!-- good -->

1. 第一步
2. 第二步
3. 第三步
```

### 4.3 嵌套与缩进

嵌套列表的缩进交由 Prettier 统一处理（无序列表下缩进 2 空格，有序列表下缩进 3 空格），因此 markdownlint 不再校验缩进宽度（`MD007` 关闭）。列表与前后正文之间留一个空行：

```markdown
<!-- good -->

- 第一项
  - 子项 A
  - 子项 B
- 第二项
```

## 5. 强调

加粗使用 `**`，斜体使用 `_`（与 Prettier 输出保持一致）。不要用强调代替标题：

```markdown
<!-- bad — 用加粗充当标题 -->
**配置说明**

<!-- bad — 斜体用星号、加粗用下划线 -->
这是 *斜体* 与 __加粗__。

<!-- good -->
这是 _斜体_ 与 **加粗**。
```

## 6. 代码

### 6.1 行内代码

函数名、变量名、文件名、命令、配置值等技术内容用反引号包裹：

```markdown
<!-- good -->
运行 `bun dev` 启动开发服务器，将 `debug` 设为 `true`。
```

### 6.2 围栏代码块

使用反引号围栏（```），不使用波浪线 `~~~`。必须标注语言，无合适语言时使用 `text`：

````markdown
<!-- bad — 未标注语言 -->

```
bun install
```

<!-- good -->

```bash
bun install
```
````

## 7. 链接与图片

- 使用行内链接 `[文字](url)`，站内相对链接省略 `.md` 后缀（Starlight 路由下省略即可）。
- 图片必须提供有意义的 alt 文本。

```markdown
<!-- bad — 站内链接带 .md、图片缺少 alt -->
参见 [命名规范](./naming.md)。
![](/logo.svg)

<!-- good -->
参见 [命名规范](./naming)。
![SiiWay 标志](/logo.svg)
```

## 8. 表格

使用竖线表格，包含表头分隔行，单元格内容首尾各留一个空格：

```markdown
<!-- good -->

| 分支    | 用途     |
| ------- | -------- |
| main    | 长期分支 |
| feature | 功能分支 |
```

表格无需逐列对齐字符宽度，markdownlint 不强制列宽，但要求结构完整。

## 9. 引用块与分隔线

- 引用块使用 `>`，与正文之间留空行。
- 分隔线统一使用三个连字符 `---`，前后各留一个空行。

```markdown
<!-- good -->

> 提示：本步骤需要管理员权限。

---
```

## 10. 内联 HTML 与 GitHub 扩展语法

- 允许在必要时使用内联 HTML 与 Astro 组件，markdownlint 已放行（`MD033` 关闭）。
- Markdown 示例中的说明性注释使用 HTML 注释（`<!-- -->`），避免渲染到页面正文。
- 优先使用 GitHub Alerts 表达提示，而非 Starlight 自定义容器（`<Aside>`）或手写 HTML：

```markdown
<!-- good -->
> [!NOTE]
> 推荐使用 bun 作为包管理器。

> [!WARNING]
> force push main 分支被禁止。
```

- Frontmatter 置于文件最顶部，使用 `---` 成对包裹：

```markdown
---
title: 页面标题
---

# 页面标题
```

## 11. 与标点规范的关系

Markdown 语法结构（链接、代码、列表符号等）一律使用半角字符；正文中文内容的标点遵循 [标点符号使用规范](./punctuation)。

## 12. 工具链：Prettier 与 markdownlint

团队使用两款工具协作，职责分明、互不冲突：

- **Prettier**：负责“格式化”——列表符号、斜体/加粗字符、缩进、表格对齐、空行、行尾换行等排版细节，配置见 `.prettierrc`。
- **markdownlint**：负责“规则校验”——标题层级、代码块语言、重复标题等语义规则，配置见 `.markdownlint.jsonc`。

相关配置文件（位于仓库根目录）：

- `.markdownlint.jsonc`：Markdown 规则配置。
- `.prettierrc.json`：Prettier 格式化配置。

### 12.1 冲突规避

Prettier 会主动改写部分排版，因此 markdownlint 中所有可能与之冲突的规则，均已对齐 Prettier 的默认输出或直接关闭：

| 规则  | 配置             | 说明                                           |
| ----- | ---------------- | ---------------------------------------------- |
| MD013 | `false`          | 不限制行长度（Prettier `proseWrap: preserve`） |
| MD024 | `siblings_only`  | 仅禁止同级重复标题                             |
| MD033 | `false`          | 允许内联 HTML / Astro 组件                     |
| MD034 | `false`          | 允许正文中出现邮箱等裸链接                     |
| MD041 | `false`          | 允许 frontmatter / 组件作为首行                |
| MD060 | `false`          | 表格列样式交由 Prettier 处理                   |

其余规则（如 MD003 `atx`、MD004 `dash`、MD007、MD029、MD035 `---`、MD046 `fenced`、MD048 `backtick`、MD049 `_`、MD050 `**`）沿用 markdownlint 默认值，均与 Prettier 的默认输出一致，无需额外配置。

忽略规则分别在 `.prettierignore` 与 `.markdownlint.jsonc` 的 `ignores` 中配置，已排除 `node_modules` 与构建产物等目录。

### 12.2 本地格式化与检查

推荐先格式化、再校验：

```bash
# 1. Prettier 格式化（自动修正排版）
bun run format

# 2. markdownlint 校验（检查语义规则）
bun run lint:md
```

编辑器建议安装 Prettier 与 markdownlint 插件（如 VS Code 的 `esbenp.prettier-vscode` 与 `DavidAnson.vscode-markdownlint`），二者会分别读取 `.prettierrc` 与 `.markdownlint.jsonc` 实时生效。
