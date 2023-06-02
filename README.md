# TodoListApp

## How to run

1. cd @database
2. run `docker-compose up -d`
3. cd @
4. run `docker build . -t todo-list-app`
5. cp `@working-dir/env/.env.example` to `~/todo-lisp-app/env/.env`(or other path you like)
6. run `sudo docker run -it -v /var/opt/run:/var/opt/app/working-dir --network host todo-list-app`
