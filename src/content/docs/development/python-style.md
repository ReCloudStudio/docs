---
title: Python 代码规范
description: Python 项目代码风格与工具链
---

本文档用于统一 Python 项目的代码风格、工具链和提交流程，降低协作成本并提升可维护性。

## 1. 代码组织

### 1.1 模块设计

- 每个模块单一职责，避免一个文件承载过多功能
- 按功能拆分包，避免 util/common/misc 等万能包
- 功能相近的类型和函数放同一模块内
- 避免循环导入，内部实现用 `_` 前缀标识私有

### 1.2 文件组织

- 文件内顺序：shebang → 编码声明 → 模块 docstring → import → 常量 → 变量 → 函数 → 类
- 一个文件专注一个核心类或功能组

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""用户服务模块，提供用户相关的业务逻辑与数据访问。"""

from __future__ import annotations

import logging
from datetime import datetime

from pydantic import BaseModel

from .repository import UserRepository

MAX_RETRY_COUNT = 3

logger = logging.getLogger(__name__)


class User(BaseModel):
    id: int
    name: str


def get_user(user_id: int) -> User | None:
    ...
```

## 2. 命名规范

### 2.1 基本规则

- 模块/包：全小写短名，可用下划线分隔 (`user_service.py`)
- 类：PascalCase (`UserService`, `OrderProcessor`)
- 函数/方法/变量：snake_case (`get_user`, `item_count`)
- 常量：UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_BASE_URL`)

### 2.2 私有成员

- 非公开属性使用单下划线前缀 (`_internal_method`, `_cache`)
- 避免双下划线前缀，除非确实需要 name mangling 来避免子类冲突

### 2.3 布尔变量

- 使用 `is_` / `has_` / `can_` 前缀表示布尔含义

```python
is_active: bool
has_permission: bool
can_edit: bool
```

## 3. 类型标注

### 3.1 基本要求

- 所有新增代码必须标注类型
- 公共接口必须提供完整函数签名标注
- Python 3.10+ 使用 `X | None` 替代 `Optional[X]`
- Python 3.9+ 使用内建泛型 `list[X]`、`dict[K, V]`，弃用 `typing.List`、`typing.Dict`

### 3.2 复杂类型

- 复杂结构优先使用 `TypedDict`、`Protocol`、`dataclass`
- 避免大量 `dict[str, Any]`，用结构化类型替代

```python
from dataclasses import dataclass
from typing import TypedDict


@dataclass(slots=True)
class User:
    id: int
    name: str


class UserDict(TypedDict):
    id: int
    name: str


def find_user_name(users: list[User], user_id: int) -> str | None:
    for user in users:
        if user.id == user_id:
            return user.name
    return None
```

### 3.3 类型检查

- 推荐使用 mypy `--strict` 模式

```bash
mypy --strict src/
```

## 4. 导入规范

### 4.1 导入顺序

- 标准库 → 第三方库 → 本地模块，组间空行分隔
- 每个导入独占一行

```python
import os
import sys
from pathlib import Path

from pydantic import BaseModel
from sqlalchemy import select

from .models import User
from .service import UserService
```

### 4.2 禁止事项

- 禁止 `from module import *`（`__all__` 明确声明的公开模块除外）
- 禁止循环导入
- 禁止相对路径导入 `..` 跨越包边界

## 5. 字符串与格式化

### 5.1 字符串使用

- 优先使用 f-string（Python 3.6+）
- 多行字符串用三引号
- 避免在循环中拼接字符串，使用 `"".join()` 或 `StringIO`

```python
name = "Alice"
msg = f"Hello, {name}!"

query = """
    SELECT id, name
    FROM users
    WHERE active = true
"""
```

### 5.2 Docstring

- 模块、类、公共函数必须有 docstring
- 使用三引号，首行简述，空行后补充详细说明
- 推荐 Google 或 NumPy 风格

```python
def get_user(user_id: int) -> User | None:
    """根据 ID 获取用户。

    Args:
        user_id: 用户唯一标识符。

    Returns:
        匹配的 User 对象，未找到时返回 None。

    Raises:
        ValueError: user_id 为非正整数时抛出。
    """
    if user_id <= 0:
        raise ValueError("user_id must be positive")
    ...
```

## 6. 错误处理

### 6.1 基本原则

- 捕获具体异常，禁止裸 `except:` 或 `except Exception:`
- 自定义异常继承自 `Exception`，提供有意义的错误信息
- 禁止在 except 块中静默吞掉异常

### 6.2 异常设计

```python
class UserNotFoundError(Exception):
    """用户不存在异常。"""

    def __init__(self, user_id: int):
        self.user_id = user_id
        super().__init__(f"User {user_id} not found")


class ValidationError(Exception):
    """数据校验异常。"""
    ...
```

### 6.3 资源管理

- 使用上下文管理器 (`with`) 管理文件、连接等资源
- 自定义资源实现 `__enter__` 和 `__exit__`

```python
with open("data.txt") as f:
    content = f.read()
```

## 7. 函数与方法

### 7.1 函数设计

- 函数尽量小，推荐不超过 50 行
- 一个函数只做一件事
- 参数过多时考虑使用 dataclass 或 TypedDict 封装

### 7.2 默认参数

- 参数默认值使用不可变类型，禁止 `def f(x=[])` 或 `def f(x={})`

```python
# 正确
def append_item(item: str, items: list[str] | None = None) -> list[str]:
    if items is None:
        items = []
    items.append(item)
    return items

# 错误
def append_item(item: str, items: list[str] = []) -> list[str]:
    items.append(item)
    return items
```

### 7.3 函数风格

- 使用关键字参数提高可读性
- 优先使用 `def` 定义函数，禁止将 lambda 赋值给变量

```python
# 正确
def is_active(user: User) -> bool:
    return user.status == "active"

# 错误
is_active = lambda user: user.status == "active"
```

## 8. 类设计

### 8.1 设计原则

- 使用 `@property` 而非 Java 风格的 getter/setter
- 使用 `@dataclass` 简化数据类
- 优先组合而非继承
- 多重继承时确保 MRO 清晰可理解

### 8.2 特殊方法

- `__str__` 面向用户，返回可读性高的描述
- `__repr__` 面向开发者，尽量返回可重建对象的表达式

```python
from dataclasses import dataclass


@dataclass(slots=True)
class User:
    id: int
    name: str
    email: str

    @property
    def display_name(self) -> str:
        return self.name or self.email

    def __str__(self) -> str:
        return f"User({self.display_name})"

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, email={self.email!r})"
```

## 9. 并发与异步

### 9.1 异步编程

- IO 密集型任务优先使用 `async` / `await`
- 使用 `asyncio.gather` 并发执行多个协程
- 使用 `asyncio.to_thread` 包装同步阻塞调用

```python
import asyncio


async def fetch_all(urls: list[str]) -> list[str]:
    async def fetch(url: str) -> str:
        ...
        return ""

    return await asyncio.gather(*(fetch(url) for url in urls))
```

### 9.2 线程安全

- 多线程场景使用 `threading.Lock` 保护共享状态
- 使用 `queue.Queue` 实现线程间通信
- 禁止在异步代码中使用 `time.sleep`，使用 `await asyncio.sleep`

## 10. 测试规范

### 10.1 框架与组织

- 测试框架使用 `pytest`
- 测试文件命名：`test_*.py`，测试函数以 `test_` 开头
- 一个测试只验证一个主要行为
- 回归修复必须补充测试用例

### 10.2 测试实践

- 使用 fixtures 替代 setUp/tearDown
- 使用 `pytest.mark.parametrize` 做参数化测试
- Mock 外部依赖，使用 `unittest.mock` 或 `pytest-mock`

```python
import pytest
from unittest.mock import Mock

from .service import UserService


@pytest.fixture
def user_service() -> UserService:
    repo = Mock()
    return UserService(repo)


def test_get_user_returns_none_when_not_found(user_service: UserService) -> None:
    user_service.repo.find_by_id.return_value = None
    assert user_service.get_user(1) is None


@pytest.mark.parametrize(
    ("user_id", "expected"),
    [(0, False), (-1, False), (1, True)],
)
def test_valid_user_id(user_id: int, expected: bool) -> None:
    assert is_valid_user_id(user_id) == expected
```

## 11. 工具与格式化

### 11.1 推荐工具链

- Python：`3.13+`
- 包管理：`uv`
- 格式化与检查：`ruff`
- 类型检查：`ty` 或 `mypy`
- 测试：`pytest`
- 提交前钩子：`pre-commit`

### 11.2 常用命令

```bash
ruff format
ruff check
ruff check --fix
ty check
pytest
```

- `ruff format` 负责代码格式化
- `ruff check` 负责风格与常见问题检查
- `--fix` 可自动修复部分问题
- CI 中必须通过所有检查

## 12. 禁止事项

- 禁止裸 `except:` 或 `except Exception:`
- 禁止使用可变默认参数 (`def f(x=[])`)
- 禁止在函数中修改全局变量
- 禁止硬编码密钥、凭证等敏感信息
- 禁止使用 `assert` 做业务逻辑校验
- 禁止 `from module import *`
- 禁止循环导入
- 禁止将 lambda 赋值给变量
- 禁止静默吞掉异常
- 禁止在异步代码中使用 `time.sleep`
