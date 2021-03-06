## 设计模式

```sh
yarn
```

### 一、 工厂模式
#### 实现一个模态框
+ 三个状态
  1. 成功 - green
  2. 告警 - orange
  3. 失败 - red
+ 三个按钮
  1. 切换至成功
  2. 切换至告警
  3. 切换至失败

```sh
npm run factory
```


### 二、 外观模式
#### 外观模式的定义与特点
外观（Facade）模式又叫作门面模式，是一种通过为多个复杂的子系统提供一个一致的接口，而使这些子系统更加容易被访问的模式。该模式对外有一个统一接口，外部应用程序不用关心内部子系统的具体细节，这样会大大降低应用程序的复杂度，提高了程序的可维护性。

在日常编码工作中，我们都在有意无意的大量使用外观模式。只要是高层模块需要调度多个子系统（2个以上的类对象），我们都会自觉地创建一个新的类封装这些子系统，提供精简的接口，让高层模块可以更加容易地间接调用这些子系统的功能。尤其是现阶段各种第三方SDK、开源类库，很大概率都会使用外观模式。

外观（Facade）模式是“迪米特法则（最少知道原则）”的典型应用，它有以下主要优点。
降低了子系统与客户端之间的耦合度，使得子系统的变化不会影响调用它的客户类。
对客户屏蔽了子系统组件，减少了客户处理的对象数目，并使得子系统使用起来更加容易。
降低了大型软件系统中的编译依赖性，简化了系统在不同平台之间的移植过程，因为编译一个子系统不会影响其他的子系统，也不会影响外观对象。

外观（Facade）模式的主要缺点如下。
不能很好地限制客户使用子系统类，很容易带来未知风险。
增加新的子系统可能需要修改外观类或客户端的源代码，违背了“开闭原则（对扩展开放对修改关闭）”。
#### 实现一个 TodoList
TodoList -> Component

index.html -> TodoList + Header + Footer + Carousel

TodoList -> Input + List

index.html -> index <- TodoList
<div id="app"></div>

index入口文件 <- TodoList
index: data, ElementWrapper

TodoList -> todo-list <- input + list
todolist -> todo-list -> ElementWrapper

TodoList 组件 = Input + List 组件
外观 -> index 组件接口

TodoList 中介 -> Input + List视图 + 功能集中管理 -> index

```sh
npm run facade
```

### 三、 观察者模式
实现 TodoList
```sh
npm run observer
```

### 四、 装饰器模式
实现 TodoList

#### 数据操作
1. todoData []
2. 方法 -> 操作数据
   增加数据 -> addTodo(todo) { id, content. completed }
   删除数据 -> removeTodo(id) -> todoData -> { id }
   改变状态 -> changeCompltetd(id) -> todoData -> { id } -> completed

#### DOM操作
1. 方法 -> 操作DOM
   增加项 -> todo模板 -> todo -> todoItem -> oTodoList
   删除项 -> id -> todoItems {id} -> item -> remove
   改变状态 -> id -> todoItems {id} -> item -> content -> 加上中横线

#### 设计方式
@装饰器 -> DOM操作 -> app.ys -> 执行DOM操作方法 -> 实现功能

```sh
npm run decorator
```