---
title: 命名规范
description: 标识符命名约定
---

> 本规范适用于所有项目的标识符命名，涵盖文件、变量、常量、函数、类、组件、类型、接口等。语言/框架有强制约定时（如环境变量、特定文件名），优先遵循其约定。

---

## 1. 核心原则

所有命名遵循三级体系，按标识符的单词数量和语义角色选择对应格式：

| 类别                           | 格式              | 示例                            |
| ------------------------------ | ----------------- | ------------------------------- |
| 单一单词（文件/文件夹/模块名） | 全小写            | `utils`、`types`、`index`       |
| 多单词函数/方法/变量           | 小驼峰 camelCase  | `getPackageInfo`、`handleClick` |
| 多单词类/组件/类型/接口        | 大驼峰 PascalCase | `UserProfile`、`ApiResponse`    |

### 1.1 单一单词规则

- 文件、文件夹、模块、包名等单一单词标识符统一使用全小写
- 示例：`utils/`、`types/`、`index.ts`、`auth.ts`

### 1.2 多单词规则

- 函数、方法、变量：camelCase
- 类、组件、类型、接口、枚举：PascalCase
- 常量：UPPER_SNAKE_CASE

---

## 2. 文件与目录命名

### 2.1 通用约定

| 文件类型              | 格式       | 示例                               |
| --------------------- | ---------- | ---------------------------------- |
| 单一单词目录/模块     | 全小写     | `utils/`、`types/`、`index.ts`     |
| 多单词非组件文件      | kebab-case | `date-utils.ts`、`http-request.ts` |
| 组件文件（Vue/React） | PascalCase | `UserList.vue`、`OrderDetail.vue`  |
| 类型文件              | kebab-case | `user-types.ts`、`order-types.ts`  |
| Store 文件            | kebab-case | `user-store.ts`、`cart-store.ts`   |
| 组合式函数文件        | kebab-case | `use-user-list.ts`                 |
| 样式文件              | kebab-case | `user-card.scss`                   |

### 2.2 约束规则

- 禁止使用空格、中文、特殊字符作为文件名
- 禁止文件名与目录名同名（如 `user/user.ts`）
- 目录名必须为有意义的名词，禁止使用 `temp`、`test1` 等无意义名称

---

## 3. 变量命名

### 3.1 一般变量

- 使用 camelCase
- 示例：

```typescript
const userName = 'Alice'
const itemCount = 42
const isActive = true
```

### 3.2 布尔变量

- 必须使用 `is`、`has`、`should`、`can` 等前缀
- 示例：

```typescript
const isLoading = true
const hasPermission = false
const shouldUpdate = true
const canEdit = false
```

### 3.3 集合变量

- 数组、Map、Set 等使用复数形式
- 示例：

```typescript
const users: User[] = []
const userIdMap = new Map<number, User>()
const activeIdSet = new Set<string>()
```

---

## 4. 常量命名

### 4.1 模块级常量

- 使用 UPPER_SNAKE_CASE
- 示例：

```typescript
const MAX_RETRY_COUNT = 3
const DEFAULT_PAGE_SIZE = 10
const API_BASE_URL = 'https://api.example.com'
```

### 4.2 枚举成员

- 使用 PascalCase 或 UPPER_SNAKE_CASE，项目内统一
- 示例：

```typescript
enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed'
}
```

---

## 5. 函数与方法命名

### 5.1 一般函数

- 使用 camelCase
- 以动词或动词短语开头
- 推荐动词前缀：

| 前缀                    | 含义        | 示例                              |
| ----------------------- | ----------- | --------------------------------- |
| `get` / `fetch`         | 获取数据    | `getUserInfo`、`fetchUserList`    |
| `set` / `update`        | 设置/更新   | `setUserName`、`updateProfile`    |
| `create` / `add`        | 创建/添加   | `createOrder`、`addItem`          |
| `delete` / `remove`     | 删除/移除   | `deleteUser`、`removeItem`        |
| `handle`                | 事件处理    | `handleSubmit`、`handleCancel`    |
| `validate` / `check`    | 校验/检查   | `validateForm`、`checkPermission` |
| `format` / `parse`      | 格式化/解析 | `formatDate`、`parseJson`         |
| `compute` / `calculate` | 计算        | `computeTotal`、`calculateAge`    |

### 5.2 事件处理函数

- 使用 `handle` 或 `on` 前缀
- `handle` 用于方法内部定义的处理函数
- `on` 用于回调属性名（props 中的事件回调）
- 示例：

```typescript
const handleSubmit = () => {}
const handleCancel = () => {}

// 回调属性
interface Props {
  onClick?: () => void
  onChange?: (value: string) => void
}
```

### 5.3 异步函数

- 无额外命名要求，遵循一般函数规则
- 返回 Promise 的函数名无需加 `Async` 后缀

---

## 6. 类与组件命名

### 6.1 类命名

- 使用 PascalCase
- 使用名词或名词短语
- 示例：

```typescript
class UserService {}
class OrderController {}
class PaymentGateway {}
```

### 6.2 组件命名

- 使用 PascalCase
- 必须由多个单词组成，避免与 HTML 原生元素冲突
- 示例：

```typescript
// 正确
export default defineComponent({
  name: 'UserList'
})

// 错误
export default defineComponent({
  name: 'List'      // 过于简单，可能冲突
})

// 错误
export default defineComponent({
  name: 'userList'  // 应使用 PascalCase
})
```

### 6.3 组合式函数命名

- 使用 camelCase，以 `use` 开头
- 示例：`useUserList`、`useFormValidation`、`useDarkMode`

### 6.4 Store 命名

- Store ID 使用 camelCase
- Store 函数使用 `use` 前缀 + PascalCase store 名
- 示例：`useUserStore`、`useCartStore`、`useAppStore`

---

## 7. 类型与接口命名

### 7.1 接口命名

- 使用 PascalCase
- 使用名词或名词短语
- 可选 `I` 前缀（项目内统一选择一种）
- 示例：

```typescript
interface User {
  id: number
  name: string
}

// 或使用 I 前缀
interface IUser {
  id: number
  name: string
}
```

### 7.2 类型别名

- 使用 PascalCase
- 联合类型、交叉类型等复杂类型推荐使用 `Type` 后缀
- 示例：

```typescript
type UserStatus = 'active' | 'inactive' | 'banned'
type ApiResponse<T> = { code: number; data: T }
type SortDirectionType = 'asc' | 'desc'
```

### 7.3 专用类型后缀

| 类型用途     | 后缀              | 示例                              |
| ------------ | ----------------- | --------------------------------- |
| 组件 Props   | Props             | `UserCardProps`、`SearchBarProps` |
| 组件 Emits   | Emits             | `UserFormEmits`、`ModalEmits`     |
| 数据传输对象 | DTO               | `UserCreateDTO`、`OrderUpdateDTO` |
| 视图对象     | VO                | `UserDetailVO`、`OrderSummaryVO`  |
| 请求参数     | Query / Params    | `UserQuery`、`SearchParams`       |
| 响应类型     | Response / Result | `UserListResponse`、`LoginResult` |

### 7.4 泛型参数

- 单字母大写推荐：`T`、`K`、`V`
- 有明确语义时使用描述性名称：`TData`、`TItem`
- 示例：

```typescript
type ApiResponse<TData> = { code: number; data: TData }
type Nullable<T> = T | null
```

---

## 8. CSS 类命名

### 8.1 命名规范

- 使用 BEM 命名规范
- Block（块）`__` Element（元素）`--` Modifier（修饰符）
- Block 和 Element 使用 kebab-case
- 示例：

```css
.user-card {}
.user-card__header {}
.user-card__title {}
.user-card__content {}
.user-card--active {}
.user-card--disabled {}
```

### 8.2 约束规则

- 禁止使用 ID 选择器做样式
- 禁止使用驼峰命名 CSS 类
- 公共工具类使用单连字符前缀（如 `is-`、`has-`）

---

## 9. 环境变量命名

- 使用 UPPER_SNAKE_CASE
- 框架前缀 + 描述
- 示例：

```text
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My App
NEXT_PUBLIC_GA_ID=UA-123456
```

---

## 10. 禁止事项

- 禁止使用拼音命名
- 禁止使用无意义缩写（`btn` 除外，`act`、`cnt`、`usr` 等禁止）
- 禁止使用单字母变量（`for` 循环的 `i`、`j`、`k` 除外）
- 禁止使用 `temp`、`data`、`info` 等无信息量的名称
- 禁止在同一作用域使用仅大小写不同的两个标识符
- 禁止使用 `_` 开头或结尾命名（框架约定除外，如 `_props`、`_internal`）
- 禁止使用保留字作为标识符
