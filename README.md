# TodoListApp

## How to run

1. cd @database
2. run `docker-compose up -d`
3. cd @
4. run `docker build . -t todo-list-app` (remove `--registry https://registry.npm.taobao.org/` in dockerfile if npm
   install is slow)
5. cp `@working-dir/env/.env.example` to `~/todo-list-app/env/.env`(or other path you like)
6. run `sudo docker run -d -v ~/todo-list-app/:/var/opt/app/working-dir --network host todo-list-app`(you can
   change `~/todo-list-app/` to the path in prev step)
7. open `http://HOST:4009/doc` to view the api document(you can change the port in `~/todo-list-app/env/.env` file)

## Notice

文档中的测试Token的用户Id是1，要先调用注册接口注册一个用户才可以使用这个Token

## 项目结构简介

* /database 项目所使用的mysql的docker-compose文件以及volume文件夹
* migrations typeorm的迁移文件
* src 源码目录
    * common 通用类库
    * decorators 注解
    * filters 响应过滤器
    * guards 守卫
    * i18n 国际化配置文件
    * todo-list todo 模块
    * user 用户模块
* working-dir 日志以及env文件存放的目录，通过docker部署时可映射到HOST
* type-orm-cli.config.ts 执行typeorm迁移时所使用的配置文件
