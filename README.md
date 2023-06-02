# TodoListApp

## How to run

1. cd @database
2. run `docker-compose up -d`
3. cd @
4. run `docker build . -t todo-list-app` (remove `--registry https://registry.npm.taobao.org/` in dockerfile if npm
   install is slow)
5. cp `@working-dir/env/.env.example` to `~/todo-lisp-app/env/.env`(or other path you like)
6. run `sudo docker run -d -v ~/todo-lisp-app/:/var/opt/app/working-dir --network host todo-list-app`(you can
   change `~/todo-lisp-app/` to the path in prev step)
