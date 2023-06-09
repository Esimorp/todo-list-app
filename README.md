# TodoListApp

## How to run

1. cd @database
2. run `docker-compose up -d`
3. cd @
4. run `docker build . -t todo-list-app` (remove `--registry https://registry.npm.taobao.org/` in dockerfile if npm
   install is slow)
5. cp `@working-dir/env/.env.example` to `~/todo-list-app/env/.env`(or other path you like)
6. run `sudo docker run -d -v ~/todo-lisp-app/:/var/opt/app/working-dir --network host todo-list-app`(you can
   change `~/todo-list-app/` to the path in prev step)
7. open `http://HOST:3009/doc` to view the api document(you can change the port in `~/todo-lisp-app/env/.env` file)
8. call `GET /init-user` in doc before any request 

