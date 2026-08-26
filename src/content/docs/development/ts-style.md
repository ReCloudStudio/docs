---
title: TypeScript 编码规范
description: TypeScript/JavaScript 编码规范
---

## 1. 编码风格

### 1.1 缩进

使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进：

```js
// bad
function foo() {
    let name;
}

// good
function foo() {
  let name;
}
```

### 1.2 分号

统一以分号结束语句，可以避免 JS 引擎自动分号插入机制的怪异行为，在语义上也更加明确。

```js
// bad - 导致 Uncaught ReferenceError 报错
const luke = {}
const leia = {}
[luke, leia].forEach((jedi) => {
  jedi.father = 'vader'
})

// good
const luke = {};
const leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father = 'vader';
});

// bad - 函数将返回 undefined 而不是换行后的值
function foo() {
  return
    'Result want to be returned'
}

// good
function foo() {
  return 'Result want to be returned';
}
```

### 1.3 逗号

对于逗号分隔的多行结构，不使用行首逗号，始终加上最后一个逗号（尾逗号）。这样可以使增删行更加容易，也会使 git diffs 更清晰。

```js
// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];

// bad
const hero = {
  firstName: 'Dana',
  lastName: 'Scully'
};

// good
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};

const heroes = [
  'Batman',
  'Superman',
];

function createHero(
  firstName,
  lastName,
  inventorOf,
) {
  // ...
}

// 需注意，使用扩展运算符的元素后面不能加逗号
function createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
) {
  // ...
}
```

### 1.4 块

始终使用大括号包裹代码块：

```js
// bad
if (foo)
  bar();
  baz(); // 这一行并不在 if 语句里

// good
if (foo) {
  bar();
  baz();
}
```

代码块只有一条语句时，可以省略大括号，并跟控制语句写在同一行。但出于一致性和可读性考虑，不推荐这样做：

```js
// bad
if (foo)
  return false;

// bad - 允许但不推荐
if (foo) return false;

// good
if (foo) {
  return false;
}
```

### 1.5 大括号换行风格

对于非空代码块，采用 Egyptian Brackets 风格：

- 左大括号 `{` 前面不换行，后面换行
- 右大括号 `}` 前面换行
- 如果 `}` 终结了整个语句，则需要换行
- 如果 `}` 后面存在 `else`、`catch`、`while` 等语句，或存在逗号、分号、右小括号（`)`），则不需要换行

```js
// bad - else 应与 if 的 } 放在同一行
if (foo) {
  thing1();
}
else
  thing2();
}

// good
if (foo) {
  thing1();
} else {
  thing2();
}
```

对于空代码块，且不在类似 `if..else..` 或 `try..catch..finally..` 的多块结构中时，可以立即将大括号闭合：

```js
// good
function doNothing() {}
```

但如果空代码块在多块结构中，仍建议按非空块的 Egyptian Brackets 风格换行：

```js
// bad
if (condition) {
  // ...
} else if (otherCondition) {} else {
  // ...
}

// good
if (condition) {
  // ...
} else if (otherCondition) {
} else {
  // ...
}
```

不要使用空代码块。如果必须使用空块，需在块内写明注释：

```js
// bad
if (condition) {
  thing1();
} else {
}

// good
if (condition) {
  thing1();
} else {
  // TODO I haven't determined what to do.
}
```

### 1.6 空格

合理并一致地使用空格有助于提升代码的可读性和可维护性。

块的左大括号 `{` 前有一个空格：

```js
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}
```

控制语句（`if`、`while` 等）的左小括号 `(` 前有一个空格：

```js
// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}
```

声明函数时，函数名和参数列表之间无空格：

```js
// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}
```

小括号、方括号内部两侧无空格；大括号内部两侧有空格：

```js
// bad
function bar( foo ) {
  return foo;
}
const foo = [ 1, 2, 3 ];
const obj = {clark: 'kent'};

// good
function bar(foo) {
  return foo;
}
const foo = [1, 2, 3];
const obj = { clark: 'kent' };
```

运算符两侧有空格，除了一元运算符：

```js
// bad
const x=y+5;
const isRight = result === 0? false: true;
const x = ! y;

// good
const x = y + 5;
const isRight = result === 0 ? false : true;
const x = !y;
```

定义对象字面量时，key, value 之间有且只有一个空格，不允许「水平对齐」：

```js
// bad
{
  a:            'short',
  looooongname: 'long',
}

// good
{
  a: 'short',
  looooongname: 'long',
}
```

### 1.7 空行

在文件末尾保留一行空行：

```js
// bad - 文件末尾未保留换行符
import { foo } from './Foo';
// ...
export default foo;

// good
import { foo } from './Foo';
// ...
export default foo;
```

块的开始和结束不能是空行：

```js
// bad
function bar() {

  console.log(foo);

}

// good
function bar() {
  console.log(foo);
}
```

在块末和新语句间插入一个空行：

```js
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;
```

### 1.8 单行最大字符数和文件最大行数

单行代码最多不要超过 100 个字符，除了字符串、模板字符串和正则表达式：

```js
// bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

// good
const foo = jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.quux
  && jsonData.foo.bar.baz.quux.xyzzy;
```

文件最大行数不超过 1000 行，过长的文件不易阅读和维护，最好对其进行拆分。

函数最大行数不超过 80 行。

## 2. 变量声明

### 2.1 使用 const 和 let，禁止 var

从 ES6 开始，可以使用 `let` 和 `const` 关键字在块级作用域下声明变量。不要使用 `var`：

```js
// bad
var foo = 'foo';
var bar;

// good
const foo = 'foo';
let bar;
```

不要什么都不用（这将产生全局变量，从而污染全局命名空间）：

```js
// bad
foo = 'foo';

// good
const foo = 'foo';
```

### 2.2 优先 const，仅重新赋值时用 let

声明变量时，应优先使用 `const`，只有当变量会被重新赋值时才使用 `let`：

```js
// bad - 声明后未发生重新赋值，应使用 const
let flag = true;
if (flag) {
  console.log(flag);
}

// good - 声明后发生重新赋值，let 使用正确
let flag = true;
if (flag) {
  flag = false;
}
```

需注意，数组和对象是一个引用，对数组某项和对象某属性的修改并不是重新赋值，因此多数情况下应用 `const` 声明：

```js
// bad
let arr = [];
let obj = {};
arr[0] = 'foo';
obj.name = 'bar';

// good
const arr = [];
const obj = {};
arr.push('foo');
obj.name = 'bar';
```

### 2.3 一条声明语句只声明一个变量

这样做更易于追加新的声明语句，也更易于进行单步调试：

```js
// bad
const foo = 1,
      bar = 2;

// good
const foo = 1;
const bar = 2;
```

### 2.4 声明的变量必须被使用

声明而未使用的变量、表达式可能带来潜在的问题，也会给维护者造成困扰，应将它们删除：

```js
// bad - 未使用变量 foo
const foo = 1;

// good
const foo = 1;
doSomethingWith(foo);
```

### 2.5 禁止声明前使用变量

在 ES6 中，`const` 和 `let` 没有声明提升作用，如果在声明前就使用变量，会直接报错：

```js
// bad
console.log(foo); // => Uncaught ReferenceError: foo is not defined
const foo = 'foo';

// good
const foo = 'foo';
console.log(foo); // => foo
```

### 2.6 变量不要与外层作用域已存在的变量同名

如果变量与外层已存在变量同名，会降低可读性，也会导致内层作用域无法读取外层作用域的同名变量：

```js
// bad
const foo = 1;
if (someCondition) {
  const foo = 2;
  console.log(foo); // => 2
}

// good
const foo = 1;
if (someCondition) {
  const bar = 2;
  console.log(bar); // => 2
  console.log(foo); // => 1
}
```

### 2.7 禁止连续赋值

变量的连续赋值让人难以阅读和理解，并且可能导致意想不到的结果（如产生全局变量）：

```js
// bad - 本例的结果是 let 仅对 a 起到了预想效果，b 和 c 都成了全局变量
(function test() {
  let a = b = c = 1; // 相当于 let a = (b = (c = 1));
})();

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function test() {
  let a = 1;
  let b = a;
  let c = a;
})();
```

### 2.8 将 let 和 const 分别归类

将 `let` 和 `const` 归类写在一起，可以提高代码整洁性：

```js
// bad
let a;
const b = 2;
let c;
const d = 4;
let e;

// good
const b = 2;
const d = 4;
let a;
let c;
let e;
```

## 3. 类型系统

### 3.1 优先使用 interface 而非 type 定义对象类型

interface 支持 extend/implement/union 等类型能力，同时也可以用于描述普通对象：

```ts
// bad
type T = { x: number };

// good
type T = string;
type Foo = string | {};
interface T {
  x: number;
}
```

### 3.2 简单数组用 T[]，复杂数组用 Array\<T\>

简单类型（数字、字符串、布尔等）使用 `T[]` 或 `readonly T[]`，其他复杂类型（联合、交叉、对象、函数等）使用 `Array<T>` 或 `ReadonlyArray<T>`：

```ts
// bad
const a: (string | number)[] = ['a', 1];
const b: { prop: string }[] = [{ prop: 'a' }];
const c: (() => void)[] = [() => {}];
const d: Array<MyType> = ['a', 'b'];
const e: Array<string> = ['a', 'b'];
const f: ReadonlyArray<string> = ['a', 'b'];

// good
const a: Array<string | number> = ['a', 1];
const b: Array<{ prop: string }> = [{ prop: 'a' }];
const c: Array<() => void> = [() => {}];
const d: MyType[] = ['a', 'b'];
const e: string[] = ['a', 'b'];
const f: readonly string[] = ['a', 'b'];
```

### 3.3 类型断言用 as Type，禁止 \<Type\>

类型断言统一使用 `as Type` 风格而非 `<Type>`，后者容易与 JSX 产生混淆。对象字面量禁止类型断言，断言成 any 除外：

```ts
// bad
const foo = <string>'bar';

// good
const foo = 'bar' as string;
```

```ts
// bad
const x = { ... } as T;
const y = { ... } as object;

// good
const x: T = { ... };
const y = { ... } as any;
const z = { ... } as unknown;
```

### 3.4 禁止使用 namespace，用 ES module 替代

自定义 TypeScript 模块（module）和命名空间（namespace）已经不再推荐使用，首选 ES2015 的模块语法来导入导出：

```ts
// bad
module foo {}
namespace foo {}

// good
declare module 'foo' {}
declare module foo {}
declare namespace foo {}
declare global {
  namespace foo {}
}
declare module foo {
  namespace foo {}
}
```

禁止使用 module 来定义命名空间（`declare module` 不做限制）：

```ts
// bad
module Foo {}

// good
declare module Foo {}
declare namespace Foo {}
```

### 3.5 interface 成员分隔符统一用分号

```ts
// bad: comma style(JSON style)
interface Foo {
  name: string,
  greet(): void,
}

type Bar = {
  name: string,
  greet(): void,
};

// bad: line break style
interface Foo {
  name: string
  greet(): void
}

// good
interface Foo {
  name: string;
  greet(): void;
}

type Bar = {
  name: string;
  greet(): void;
};
```

### 3.6 可推断类型时不需显式标注

对于容易类型推倒出的变量、参数，再次的显式声明类型会带来代码冗余：

```ts
// bad
const foo: number = 1;
const bar: string = '';
class Foo {
  prop: number = 5;
}
function fn(a: number = 5, b: boolean = true) {}

// good
const foo = 1;
const bar = '';
class Foo {
  prop = 5;
}
function fn(a = 5, b = true) {}
```

### 3.7 类型声明：冒号前无空格，冒号后一个空格

类型声明周围添加合适的间距可以有效地提升代码可读性：

- 冒号前无空格，冒号后保留一个空格
- 箭头前后都保留一个空格

```ts
// bad
let foo:string = 'bar';
let foo :string = 'bar';
let foo : string = 'bar';

function foo():string {}
function foo() :string {}
function foo() : string {}

class Foo {
  name:string;
}

class Foo {
  name :string;
}

class Foo {
  name : string;
}

type Foo = ()=> {};

// good
let foo: string = 'bar';

function foo(): string {}

class Foo {
  name: string;
}

type Foo = () => {};
```

### 3.8 禁止空 interface（extends 除外）

空的接口类型等效于空对象，若它只继承另一个接口类型，那么该类型与被继承的类型等效。在代码中应减少定义无意义的接口类型：

```ts
// bad
// an empty interface
interface Foo {}

// an interface with only one supertype (Bar === Foo)
interface Bar extends Foo {}

// an interface with an empty list of supertypes
interface Baz {}

// good
// an interface with any number of members
interface Foo {
  name: string;
}

// same as above
interface Bar {
  age: number;
}

// an interface with more than one supertype
// in this case the interface can be used as a replacement of a union type.
interface Baz extends Foo, Bar {}
```

### 3.9 接口方法使用属性方式定义

使用属性去定义接口中的方法，可以获得更严格的检查：

```ts
// bad
interface T1 {
  func(arg: string): number;
}
type T2 = {
  func(arg: boolean): void;
};
interface T3 {
  func(arg: number): void;
  func(arg: string): void;
  func(arg: boolean): void;
}

// good
interface T1 {
  func: (arg: string) => number;
}
type T2 = {
  func: (arg: boolean) => void;
};
// 属性方法实现重载
interface T3 {
  func: ((arg: number) => void) &
    ((arg: string) => void) &
    ((arg: boolean) => void);
}
```

### 3.10 重载函数必须写在一起

自然相关的项组合在一起将提高代码可读性和组织性：

```ts
// bad
declare namespace Foo {
  export function foo(s: string): void;
  export function foo(n: number): void;
  export function bar(): void;
  export function foo(sn: string | number): void;
}

// good
declare namespace Foo {
  export function foo(s: string): void;
  export function foo(n: number): void;
  export function foo(sn: string | number): void;
  export function bar(): void;
}
```

```ts
// bad
type Foo = {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void;
  foo(sn: string | number): void;
};

interface Foo {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void;
  foo(sn: string | number): void;
}

class Foo {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void {}
  foo(sn: string | number): void {}
}

// good
type Foo = {
  foo(s: string): void;
  foo(n: number): void;
  foo(sn: string | number): void;
  bar(): void;
};

interface Foo {
  foo(s: string): void;
  foo(n: number): void;
  foo(sn: string | number): void;
  bar(): void;
}

class Foo {
  foo(s: string): void;
  foo(n: number): void;
  foo(sn: string | number): void {}
  bar(): void {}
}
```

### 3.11 优先使用参数联合类型而非函数重载

```ts
// bad
function f(x: number): void;
function f(x: string): void;
f(): void;
f(...x: number[]): void;

// good
function f(x: number | string): void;
function f(x?: ...number[]): void;
```

### 3.12 禁止无意义类型转换（多余的 boolean 转换）

在 `if` 等条件语句中，将表达式的结果强制转换成布尔值是多余的：

```js
// bad
if (!!foo) {
  // ...
}

while (!!foo) {
  // ...
}

const a = !!flag ? b : c;

// good
if (foo) {
  // ...
}

while (foo) {
  // ...
}

const a = flag ? b : c;
```

### 3.13 type 定义时必须声明成员的类型

```ts
// bad
type Members = {
  member;
  otherMember;
};

// good
type Members = {
  member: boolean;
  otherMember: string;
};
```

## 4. 函数

### 4.1 使用箭头函数替代匿名函数

ES6 提供的箭头函数可以解决 `this` 指向的问题，而且语法更简洁：

```js
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

当函数体只包含一条 `return` 语句时，可以省略函数体大括号和 `return`：

```js
// good - 函数体包含多条语句时，始终加上大括号
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good - 函数体只包含一条 return 语句时，可以省略大括号和 return
[1, 2, 3].map(number => `A string containing the ${number + 1}.`);
```

当 `return` 的内容为对象或者有多行时，需要用小括号包裹：

```js
// bad - Uncaught SyntaxError: Unexpected token
[1, 2, 3].map((item) => {
  foo: item,
  bar: item + 1,
});

// good
[1, 2, 3].map((item) => ({
  foo: item,
  bar: item + 1,
}));
```

### 4.2 使用函数表达式替代函数声明

函数声明会被提升到当前作用域的顶部，因此函数可以在声明语句前就被调用，这会影响代码的可读性与可维护性：

```js
// bad
function foo() {
  // ...
}

// good
const foo = () => {
  // ...
};

const foo = function () {
  // ...
};
```

### 4.3 使用默认参数语法

ES6 中引入了默认参数语法，相比之前为参数赋默认值的方法更加简洁、可读性更好：

```js
// bad
const multiple = (a, b) => {
  a = a || 0;
  b = b || 0;
  return a * b;
}

// good
const multiple = (a = 0, b = 0) => {
  return a * b;
}
```

### 4.4 有默认值的参数放最后

否则你将无法享受到默认参数的便利，只能通过传 `undefined` 触发参数使用默认值：

```js
// bad
function multiply(a = 1, b) {
  return a * b;
}
const x = multiply(42); // => NaN
const y = multiply(undefined, 42); // => 42

// good
function multiply(a, b = 1) {
  return a * b;
}
const x = multiply(42); // => 42
```

### 4.5 不要修改函数参数

不要修改引用类型的参数，这可能导致作为入参的原变量发生变化。更不要给参数重新赋值，这可能导致意外的行为和内核优化问题：

```js
// bad
const f1 = function f1(obj) {
  obj.key = 1;
}
const originalObj = { key: 0 };
f1(originalObj);
console.log(originalObj); // => { key: 1 }

// good
const f2 = function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}
```

```js
// bad
function foo(bar, baz) {
  if (!baz) {
    bar = 1;
  }
}

// good
function foo(bar, baz) {
  let qux = bar;
  if (!baz) {
    qux = 1;
  }
}
```

### 4.6 用 ...rest 替代 arguments

ES6 提供了 rest 操作符 `...`，与 `arguments` 相比可以更清晰地聚合函数的剩余参数。此外，`...` 得到的是一个真正的数组，而 `arguments` 得到的则是类数组结构：

```js
// bad
function foo(a, b) {
  const args = Array.prototype.slice.call(arguments, foo.length);
  console.log(args);
}
foo(1, 2, 3, 4); // => [3, 4]

// good
function foo(a, b, ...args) {
  console.log(args);
}
foo(1, 2, 3, 4); // => [3, 4]
```

### 4.7 IIFE 用小括号包裹

IIFE 是一个独立的执行单元，将它用小括号包裹可以更清晰地体现这点：

```js
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());
```

### 4.8 函数复杂度不宜过高（圈复杂度 < 10）

过高的复杂度意味着代码难以维护和测试。函数的圈复杂度不超过 **10**，认知复杂度不超过 **15**。

### 4.9 函数参数不应过多

如果函数的参数过多，将不利于函数的维护和调用。如果必须使用过多的参数，可以考虑用对象代替参数列表：

```js
// bad
function doSomething(param1, param2, param3, param4, param5, param6, param7, param8) {
  // ...
}
doSomething(1, 2, 3, 4, 5, 6, 7, 8);

// good
function doSomething({ param1, param2, param3, param4, param5, param6, param7, param8 }) {
  // ...
}
doSomething({ param1: 1, param2: 2, param3: 3, param4: 4, param5: 5, param6: 6, param7: 7, param8: 8 });
```

### 4.10 不要在块中使用函数声明

在非函数块（如 `if`、`while` 等）中，不要使用函数声明：

```js
// bad - 函数声明不是块作用域而是函数作用域，因此在块外也能使用函数，容易引起误解
if (true) {
  function test() {
    console.log('test');
  }
}
test(); // => test

// good - 函数表达式可以清晰地说明函数能否在块外使用
if (true) {
  const test = function () {
    console.log('test');
  };
}
test(); // => Uncaught ReferenceError: test is not defined
```

### 4.11 优先使用高阶函数进行迭代运算

需要迭代运算时，应优先使用 JS 提供的高阶函数，减少直接使用 for 循环：

```js
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});

// best
const sum = numbers.reduce((total, num) => total + num, 0);

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best
const increasedByOne = numbers.map(num => num + 1);
```

## 5. 数组与对象

### 5.1 用字面量创建数组和对象

不要使用 `new Array()` 和 `Array()` 创建数组，除非为了构造某一长度的空数组：

```js
// bad
const a = new Array(1, 2, 3);
const b = Array(1, 2, 3);

// good
const a = [1, 2, 3];
const b = new Array(500); // 构造长度为 500 的空数组
```

```js
// bad
const obj = new Object();

// good
const obj = {};
```

### 5.2 使用扩展运算符 ... 操作数组和对象

数组复制：

```js
// bad
const array1 = [];
for (let i = 0; i < array.length; i += 1) {
  array1[i] = array[i];
}

// good
const array1 = [...array];
```

数组拼接：

```js
// bad
const array1 = [1, 2].concat(array);

// good
const array1 = [1, 2, ...array]
```

用 `...` 替代 `apply`：

```js
// bad
const args = [1, 2, 3, 4];
Math.max.apply(Math, args);

// good
const args = [1, 2, 3, 4];
Math.max(...args);
```

替代 `Object.assign` 进行对象的浅拷贝：

```js
// very bad - original 会被影响
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 });
delete copy.a;

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 });

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 };
```

获取排除某些属性的新对象：

```js
// good
const copy = { a: 1, b: 2, c: 3 };
const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

### 5.3 使用解构获取属性

使用 ES6 提供的解构方法获取数组元素：

```js
// bad
const arr = [1, 2, 3, 4];
const first = arr[0];
const second = arr[1];

// good
const arr = [1, 2, 3, 4];
const [first, second] = arr;
```

获取对象的同名属性、多个属性时，使用解构让代码更简洁：

```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

### 5.4 优先用 . 访问对象属性

`[]` 仅应在访问动态属性名或包含特殊字符的属性名时被使用：

```js
const obj = {
  active: true,
  [getDynamicKey()]: 'foo',
  'data-bar': 'bar',
};

// bad
const isActive = obj['active'];

// good
const isActive = obj.active;
const foo = obj[getDynamicKey()];
const bar = obj['data-bar'];
```

### 5.5 map/filter/reduce 等必须有 return 语句

以下数组方法的回调函数中必须包含 `return` 语句：`map`、`filter`、`every`、`find`、`findIndex`、`reduce`、`reduceRight`、`some`、`sort`：

```js
// bad - map 应用于构建一个新数组，单纯想遍历数组应使用 forEach
myArray.map((item, index) => {
  myObj[item] = index;
});

// good
myArray.forEach((item, index) => {
  myObj[item] = index;
});
```

```js
// bad => Uncaught TypeError: Cannot set property 'b' of undefined
const myObj = myArray.reduce((memo, item, index) => {
  memo[item] = index;
}, {});

// good
const myObj = myArray.reduce((memo, item, index) => {
  memo[item] = index;
  return memo;
}, {});
```

### 5.6 使用对象属性和方法的简写语法

ES6 提供了对象属性和方法的简写语法，可以使代码更加简洁：

```js
const value = 'foo';

// bad
const atom = {
  value: value,
  addValue: function (value) {
    return value + ' added';
  },
};

// good
const atom = {
  value,
  addValue(value) {
    return value + ' added';
  },
};
```

将简写的属性写在一起，置于对象的起始或末尾：

```js
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

### 5.7 对象的属性名不要用引号包裹（除非包含特殊字符）

```js
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
  'one two': 12,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
  'one two': 12,
};
```

## 6. 类

### 6.1 使用 class 语句声明类

`class` 语句是 ES6 中引入的用于声明类的语法糖，更加简洁易维护：

```js
// bad
function Person() {
  this.age = 1;
}
Person.prototype.growOld = function () {
  this.age += 1;
}

// good
class Person {
  constructor() {
    this.age = 1;
  }
  growOld() {
    this.age += 1;
  }
}
```

### 6.2 使用 extends 继承

`extends` 是用于原型继承的内建方法，不会破坏 `instanceof`：

```js
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

### 6.3 避免不必要的 constructor

ES6 class 会提供一个默认的 `constructor`，空 `constructor` 或者只调用父类的 `constructor` 是不必要的：

```js
// bad - 以下两种 constructor 可以省略
class Parent {
  constructor() {
  }

  method() {
    // ...
  }
}

class Child extends Parent {
  constructor (value) {
    super(value);
  }

  method() {
    // ...
  }
}

// good
class Parent {
  method() {
    // ...
  }
}

class Child extends Parent {
  method() {
    // ...
  }
}
```

### 6.4 正确使用 super

- 子类的 `constructor` 中必须使用 `super()`，且必须在 `this` 和 `super` 关键词前调用
- 非子类的 `constructor` 中不能使用 `super()`

```js
// bad - 非子类不能使用 super
class Parent {
  constructor() {
    super();
    this.name = 'parent';
  }
}

// good
class Parent {
  constructor() {
    this.name = 'parent';
  }
}

// bad - 子类必须使用 super
class Child extends Parent {
  constructor() {
    this.name = 'child';
  }
}

// bad - this 必须在调用 super 后使用
class Child extends Parent {
  constructor() {
    this.name = 'foo';
    super();
  }
}

// good
class Child extends Parent {
  constructor (value) {
    super(value);
    this.name = 'foo';
  }
}
```

### 6.5 设置成员可访问性（public/protected/private）

将非公开成员的可访问性设置为「私有」，可以增强代码可理解性，同时也能避免一些非法调用，公开的成员可省略 `public` 修饰符：

```ts
// bad
class Foo {
  static foo = 'foo';
  static getFoo() {
    return Foo.foo;
  }
  constructor() {}
  bar = 'bar';
  getBar() {}
  get baz() {
    return 'baz';
  }
  set baz(value) {
    console.log(value);
  }
}

// good
class Foo {
  private static foo = 'foo';
  public static getFoo() {
    return Foo.foo;
  }
  public constructor() {}
  protected bar = 'bar';
  public getBar() {}
  public get baz() {
    return 'baz';
  }
  public set baz(value) {
    console.log(value);
  }
}
```

### 6.6 成员排序：static -> instance，field -> constructor -> method，public -> protected -> private

1. 类的静态方法 / 属性（static）优先于实例的方法 / 属性（instance）
2. 属性（field）优先于构造函数（constructor），优先于方法（method）
3. 公开的成员（public）优先于受保护的成员（protected），优先于私有的成员（private）

```ts
// good
class Foo {
  public static foo1 = 'foo1';
  protected static foo2 = 'foo2';
  private static foo3 = 'foo3';
  public static getFoo1() {}
  protected static getFoo2() {}
  private static getFoo3() {
    return Foo.foo3;
  }
  public bar1 = 'bar1';
  protected bar2 = 'bar2';
  private bar3 = 'bar3';
  public constructor() {
    console.log(Foo.getFoo3());
    console.log(this.getBar3());
  }
  public getBar1() {}
  protected getBar2() {}
  private getBar3() {
    return this.bar3;
  }
}
```

### 6.7 类的字面量属性使用 readonly 而非 getter

类上所有返回「字面量」的 getter 方法，都推荐使用 readonly 修饰符来代替，字面量包含字符串、模板字符串、数字、bigint、正则和 null：

```ts
// bad
class Mx {
  public static get myField1() {
    return 1;
  }
  private get ['myField2']() {
    return 'hello world';
  }
}

// good
class Mx {
  public readonly myField1 = 1;
  public readonly myField2 = [1, 2, 3]; // 非字面量
  private readonly ['myField3'] = 'hello world';
  public get myField4() {
    return `hello from ${window.location.href}`;
  }
}
```

## 7. 模块

### 7.1 使用 ES6 import/export 替代 require

使用 ES6 modules (`import`/`export`)，而不是其他非标准的模块系统，如 CommonJS、AMD、CMD：

```js
// bad
const React = require('react');
module.exports = React.Component;

// good
import React, { Component } from 'react';
export default Component;
```

```ts
// bad
const fs = require('fs');

// good
import * as fs from 'fs';
```

### 7.2 不要用多个 import 引入同一模块

多条 `import` 语句引入了同一模块会降低可维护性，你需要将它们合成一条语句：

```js
// bad
import React from 'react';
import { Component }  from 'react';

// good
import React, { Component } from 'react';
```

### 7.3 import 语句放文件最上方

由于 `import` 语句会被声明提升，将它们放到模块的最上方以防止异常行为：

```js
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';
bar.init();

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
bar.init();
```

### 7.4 导入顺序：第三方 -> 内部模块

`import` 语句按以下规则排序：

- 先 `import` 第三方模块，再 `import` 自己工程里的模块
- 先 `import` 绝对路径，再 `import` 相对路径

```js
// bad
import foo from 'components/foo';
import './index.scss';
import React from 'react';

// good
import React from 'react';
import foo from 'components/foo';
import './index.scss';
```

### 7.5 禁止三斜杠导入语法

三斜杠语法已经被废弃，声明文件（d.ts）以外禁止使用：

```ts
// bad
/// <reference path="./my-module" />

// good
import myModule from './my-module';
```

### 7.6 在模块导入之后保留一个空行

```js
// bad
import foo from './foo.js';
const FOO = 'FOO'

// good
import foo from './foo.js';

const FOO = 'FOO'
```

### 7.7 禁止引用自身和循环引用

禁止模块引用自身，禁止模块之间形成循环引用。

## 8. 类型注释与指令

### 8.1 @ts-expect-error/@ts-ignore 需附带说明原因

TS 提供了一些指令注释，可用于忽略 TypeScript 编译器在编译阶段的错误。允许在代码中使用指令注释，但需要跟随一定长度的描述说明：

```ts
// bad
// @ts-expect-error
console.log('my code');

// @ts-ignore
console.log('my code');

// good
// @ts-expect-error: Unreachable code here
console.log('my code');

// @ts-ignore: It's ok to ignore this compile error
console.log('my code');
```

### 8.2 禁止 tslint 注释

tslint 已经被废弃，对应的指令注释也不应再出现：

```ts
// bad
/* tslint:disable */
/* tslint:enable */
/* tslint:disable:rule1 rule2 rule3... */
/* tslint:enable:rule1 rule2 rule3... */
// tslint:disable-next-line
someCode(); // tslint:disable-line
// tslint:disable-next-line:rule1 rule2 rule3...
```

## 9. 注意事项

### 9.1 禁止无意义的 void 类型（除返回类型外）

禁止在返回类型或泛型类型参数之外使用 void 类型，而且在返回类型中不应再与其他类型做联合或交叉。void 类型代表「无」或函数「不返回任何值」：

```ts
// bad
type PossibleValues = string | number | void;
type MorePossibleValues = string | ((number & any) | (string | void));
function logSomething(thing: void) {}
function printArg<T = void>(arg: T) {}
logAndReturn<void>(undefined);
interface Interface {
  lambda: () => void;
  prop: void;
}
class MyClass {
  private readonly propName: void;
}

// good
type NoOp = () => void;
function noop(): void {}
let trulyUndefined = void 0;
async function promiseMeSomething(): Promise<void> {}
type stillVoid = void | never;
```

### 9.2 禁止 optional chaining 后使用 non-null 断言

`optional chaining` 被设计为返回 `undefined`，在之后使用非空断言是错误的，会引入严重的类型安全问题：

```ts
// bad
foo?.bar!;
foo?.bar!.baz;
foo?.bar()!;
foo?.bar!();
foo?.bar!().baz;

// good
foo?.bar;
(foo?.bar).baz;
foo?.bar();
foo?.bar();
foo?.bar().baz;
```

### 9.3 禁止容易混淆的非空断言

在相等比较运算符（`==` 或 `===`）前使用非空断言（`!`）很容易和不等运算符（`!=` 或 `!==`）混淆，不建议使用：

```ts
interface Foo {
  bar?: string;
  num?: number;
}

// bad
const foo: Foo = getFoo();
const isEqualsBar = foo.bar! == 'hello';
const isEqualsNum = 1 + foo.num! == 2;

// good
const foo: Foo = getFoo();
const isEqualsBar = foo.bar == 'hello';
const isEqualsNum = (1 + foo.num!) == 2;
```

### 9.4 值等于类型声明时优先用 as const

```ts
// bad
let bar: 2 = 2;
let foo = <'bar'>'bar';
let foo = { bar: 'baz' as 'baz' };

// good
let foo = 'bar';
let foo = 'bar' as const;
let foo: 'bar' = 'bar' as const;
let bar = 'bar' as string;
let foo = <string>'bar';
let foo = { bar: 'baz' };
```

### 9.5 字符串字面量使用单引号

```ts
// bad
const foo = "bar";

// good
const foo = 'bar';
```

```js
// bad
const name = "tod";
const name = `tod`; // 模板字符串中应包含变量或换行，否则需用单引号

// good
const name = 'tod';
```

### 9.6 使用模板字符串替代字符串拼接

模板字符串让代码更简洁，可读性更强：

```js
// bad
function getDisplayName({ nickName, realName }) {
  return nickName + ' (' + realName + ')';
}

// good
function getDisplayName({ nickName, realName }) {
  return `${nickName} (${realName})`;
}
```

### 9.7 加号 + 两侧同为数字或同为字符串

数字与字符串的连接往往会导致一些预期外的问题：

```ts
// bad
var foo = '5.5' + 5;
var foo = 1n + 1;

// good
var foo = parseInt('5.5', 10) + 10;
var foo = 1n + 1n;
```

### 9.8 使用严格相等运算符

非严格相等运算符（`==` 和 `!=`）会在比较前将被比较值转换为相同类型，对于不熟悉 JS 语言特性的人来说，这可能造成不小的隐患。一般情况下我们应该使用严格比较运算符（`===` 和 `!==`）进行比较：

```js
const id = '83949';

// bad - 为了兼容 id 可能是字符串的情况，而有意使用 == 与数字比较
if (id == 83949) {
  // do something
}

// good - 如果 id 可能是字符串，应该先将其进行类型转换，再使用 === 进行比较
if (Number(id) === 83949) {
  // do something
}
```

### 9.9 不要使用一元自增自减运算符

`++` 和 `--` 会带来值是否会提前变化带来的理解成本，也可能因为自动添加分号机制导致一些错误，推荐使用 `num += 1` 来代替 `num++`。但出于习惯，在 `for` 循环的条件中依然可以使用自增自减运算符：

```js
let num = 1;

// bad
num++;
--num;

// good
num += 1;
num -= 1;
```

### 9.10 switch 语句的 case 需要以 break 结尾

```js
// bad
switch(foo) {
  case 1:
    doSomething();
  case 2:
    doSomethingElse();
  default:
    doSomething();
}

// good
switch(foo) {
  case 1:
    doSomething();
    break;
  case 2:
    doSomethingElse();
    break;
  default:
    doSomething();
}
```

switch 语句需要始终包含 default 分支。如果有意省略 default，在 `switch` 语句末尾用 `// no default` 注释指明。

### 9.11 控制语句的嵌套层级不要超过 4 级

```js
// bad
if (condition1) {
  // depth = 1
  if (condition2) {
    // depth = 2
    for (let i = 0; i < 10; i++) {
      // depth = 3
      if (condition4) {
        // depth = 4
        if (condition5) {
          // bad - depth = 5
        }
        return;
      }
    }
  }
}
```

### 9.12 如果一个 if 语句的结果总是返回一个 return 语句，那么最后的 else 是不必要的

```js
// bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// good
function foo() {
  if (x) {
    return x;
  }

  return y;
}
```

### 9.13 禁止不必要的转义字符

转义字符会大大降低代码的可读性，因此尽量不要滥用它们：

```js
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `'this' is "quoted"`;
```

### 9.14 不要直接使用 Object.prototypes 上的方法

不要直接在对象上调用 `Object.prototypes` 上的方法，例如 `hasOwnProperty`、`propertyIsEnumerable`、`isPrototypeOf`。这些方法可能会被对象上的属性覆盖，导致错误：

```js
const obj = {
  foo: 'foo',
  hasOwnProperty: false,
};
const objNull = Object.create(null);

// bad => Uncaught TypeError: obj.hasOwnProperty is not a function
console.log(obj.hasOwnProperty('foo'));
console.log(objNull.hasOwnProperty('foo'));

// good
console.log(Object.prototype.hasOwnProperty.call(obj, 'foo'));
console.log(Object.prototype.hasOwnProperty.call(objNull, 'foo'));
```

## 10. 禁止事项

- 禁止使用 var，使用 const 和 let 替代
- 禁止使用 any（需要显式标注的场景必须注释说明）
- 禁止使用 namespace（使用 ES module 替代）
- 禁止使用 require()（使用 import 替代）
- 禁止三斜杠导入 /// （使用 import 替代）
- 禁止空 interface（extends 除外）
- 禁止重复类成员
- 禁止模块级副作用（副作用应隔离在入口文件）
- 禁止使用 eval
- 禁止使用 debugger
- 禁止对原生对象或只读的全局对象进行赋值
- 禁止使用 Function 构造函数创建函数
- 禁止使用 new Number/String/Boolean
- 禁止不要将 this 赋值给其他变量（使用箭头函数保留函数作用域）
- 禁止使用 void 运算符
- 禁止嵌套的三元表达式
- 禁止不必要的三元表达式
- 禁止混合使用多种操作符时不加小括号分组
