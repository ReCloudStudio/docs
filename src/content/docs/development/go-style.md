---
title: Go 代码规范
description: Go 项目代码风格与最佳实践
---

## 1. 代码组织

### 1.1 包结构

- 包内代码应有单一明确职责，避免util/common/misc等杂项包
- 功能相近的类型和函数放同一包内
- 避免循环依赖，对内可见类型用internal/隔离
- 包内文件按职责拆分：service.go, repository.go, handler.go

### 1.2 文件组织

- 每个文件专注一个核心类型及其方法
- 导出类型放同名文件：user.go含User结构体及其方法
- 文件内顺序：package声明 → import → 常量 → 变量 → 类型定义 → 构造函数 → 公开方法 → 私有方法

### 1.3 包文档

- 每个包必须有包级注释，位于package声明前
- 以`Package <包名>`开头
- 示例：

```go
// Package user 提供用户相关的业务逻辑与数据访问。
package user
```

## 2. 命名规范

### 2.1 包命名

- 全小写，单数，简短无下划线，避免与标准库重名

### 2.2 接口命名

- 单方法接口用-er后缀：Reader, Writer, Closer
- 多方法接口用名词：UserStore, PaymentGateway
- 接口定义在使用方

### 2.3 Getter/Setter

- Getter不加Get前缀：Name() 而非 GetName()
- Setter用Set前缀：SetName(name string)

### 2.4 变量命名

- 短作用域可用短名(i, ctx, err)，长作用域需描述性名称
- 避免重复包名：user.User{} 而非 user.UserInfo{}
- 首字母缩写全大写或全小写：HTTPServer 或 httpServer，禁止 HttpServer

## 3. 导入规范

- 标准库 → 第三方库 → 内部包，组间空行分隔
- 禁止相对路径导入(./、../)
- 禁止点导入(.)除非测试文件
- 禁止导入未使用的包
- 匿名导入(_)必须加注释说明

## 4. 错误处理

### 4.1 基本原则

- 错误必须显式处理，禁止用_忽略
- 错误只处理一次：要么传播，要么记录日志后处理，不能两者都做

### 4.2 错误包装

- 向上传播用 fmt.Errorf("...: %w", err) 包装上下文
- 调用方用 errors.Is 和 errors.As 判断，禁止字符串比较

```go
func GetUser(id int) (*User, error) {
    user, err := repo.FindByID(id)
    if err != nil {
        return nil, fmt.Errorf("get user %d: %w", id, err)
    }
    return user, nil
}
```

### 4.3 自定义错误

- 哨兵错误：var ErrNotFound = errors.New("not found")
- 复杂错误类型实现 Error() 方法，建议同时实现 Unwrap()

### 4.4 Panic使用

- 仅用于不可恢复的初始化失败
- 禁止在库代码中使用panic
- recover仅用于程序顶层或明确需要保护的goroutine

## 5. 并发规范

### 5.1 Goroutine管理

- 每个goroutine必须明确退出条件
- 使用sync.WaitGroup或errgroup等待
- 禁止在goroutine中直接修改外部循环变量（必须传递副本）

```go
for _, item := range items {
    go func(item Item) {
        process(item)
    }(item)
}
```

### 5.2 Channel使用

- Channel所有者负责关闭，消费者不应关闭
- 优先使用select配合context.Done()实现超时和取消
- Channel容量必须有明确依据

### 5.3 同步原语

- 优先sync.Mutex而非channel做简单互斥
- sync.Map仅在特定场景使用
- 禁止复制sync.Mutex等同步原语（用指针传递）

## 6. Context使用

### 6.1 传播规则

- context.Context作函数第一个参数，命名为ctx
- 禁止存储在结构体中（请求范围中间件除外）
- 禁止创建全局context变量

### 6.2 取消与超时

- 每个请求链路必须有超时控制
- 使用context.WithTimeout或WithDeadline
- goroutine必须通过context控制生命周期

### 6.3 值传递

- context仅用于传递请求范围的值(trace ID, user ID)，禁止传业务参数
- 使用自定义类型作context key，禁止用string

## 7. 接口设计

- 接口尽可能小，优先1-3个方法
- 遵循接口隔离原则
- 接口在使用方定义，返回具体类型，接受接口类型

```go
func SaveUser(store UserStore, user User) error { ... }

type UserStore interface {
    Save(User) error
    FindByID(int) (*User, error)
}
```

## 8. 测试规范

- 使用Go标准测试框架
- 测试文件：*_test.go，同目录
- 优先表驱动测试(table-driven tests)
- 测试辅助函数用t.Helper()标记
- Mock优先使用接口
- 禁止用time.Sleep等待异步结果
- 独立测试用例用t.Parallel()
- 新增代码必须覆盖核心路径
- 回归修复必须补充测试用例
- 使用go test -race ./...检测数据竞争

## 9. 依赖管理

- go.mod使用明确Go版本
- 依赖版本精确固定
- 禁止手工编辑go.sum
- 废弃依赖及时清理
- 大型项目可用monorepo配合多个go.mod
- 内部共享代码用internal/

## 10. 性能规范

- 已知大小的slice和map用make预分配容量
- 避免热路径上频繁创建小对象
- 使用sync.Pool复用临时对象
- 大量字符串拼接用strings.Builder
- 格式化避免在循环中使用fmt.Sprintf
- 性能敏感代码必须附带benchmark

## 11. 禁止事项

- 禁止panic替代错误返回
- 禁止忽略错误（_吞错）
- 禁止goroutine中捕获循环变量
- 禁止相对路径和点导入
- 禁止导出不需要对外暴露的类型和函数
- 禁止硬编码密钥/凭证
- 禁止init()做除注册外的副作用
- 禁止context传递业务参数
- 禁止拷贝含sync.Mutex的结构体
- 禁止生产代码中使用reflect和unsafe（明确优化且评审通过除外）
