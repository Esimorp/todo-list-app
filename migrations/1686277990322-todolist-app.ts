import { MigrationInterface, QueryRunner } from 'typeorm';

export class TodolistApp1686277990322 implements MigrationInterface {
  name = 'TodolistApp1686277990322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`organization\`
                             (
                                 \`id\`         int         NOT NULL AUTO_INCREMENT,
                                 \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                                 \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                                 \`deleted_at\` datetime(6) NULL,
                                 \`name\`       varchar(36) NOT NULL,
                                 \`ownerId\`    int         NULL,
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`user\`
                             (
                                 \`id\`         int         NOT NULL AUTO_INCREMENT,
                                 \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                                 \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                                 \`deleted_at\` datetime(6) NULL,
                                 \`username\`   varchar(12) NOT NULL,
                                 \`password\`   varchar(60) NOT NULL,
                                 UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`),
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`todo_change_log\`
                             (
                                 \`id\`         int          NOT NULL AUTO_INCREMENT,
                                 \`created_at\` datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                                 \`updated_at\` datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                                 \`deleted_at\` datetime(6)  NULL,
                                 \`action\`     int          NOT NULL COMMENT '动作',
                                 \`payload\`    varchar(255) NULL COMMENT '载荷',
                                 \`todoId\`     int          NULL,
                                 \`operatorId\` int          NULL,
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`comment\`
                             (
                                 \`id\`         int         NOT NULL AUTO_INCREMENT,
                                 \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                                 \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                                 \`deleted_at\` datetime(6) NULL,
                                 \`content\`    text        NULL COMMENT '评论内容',
                                 \`authorId\`   int         NULL,
                                 \`todoId\`     int         NULL,
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`todo\`
                             (
                                 \`id\`             int          NOT NULL AUTO_INCREMENT,
                                 \`created_at\`     datetime(6)  NOT NULL                        DEFAULT CURRENT_TIMESTAMP(6),
                                 \`updated_at\`     datetime(6)  NOT NULL                        DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                                 \`deleted_at\`     datetime(6)  NULL,
                                 \`title\`          varchar(255) NOT NULL COMMENT '标题',
                                 \`deadline\`       datetime     NULL COMMENT '任截止日期',
                                 \`finished\`       tinyint      NOT NULL COMMENT '是否已经完成' DEFAULT 0,
                                 \`description\`    text         NULL COMMENT '任务描述',
                                 \`parentTodoId\`   int          NULL,
                                 \`ownerId\`        int          NULL,
                                 \`organizationId\` int          NULL,
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`mention\`
                             (
                                 \`id\`           int         NOT NULL AUTO_INCREMENT,
                                 \`created_at\`   datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                                 \`updated_at\`   datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                                 \`deleted_at\`   datetime(6) NULL,
                                 \`authorId\`     int         NULL,
                                 \`targetUserId\` int         NULL,
                                 \`todoId\`       int         NULL,
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`message_inbox\`
                             (
                                 \`id\`           int          NOT NULL AUTO_INCREMENT,
                                 \`created_at\`   datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                                 \`updated_at\`   datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                                 \`deleted_at\`   datetime(6)  NULL,
                                 \`type\`         int          NOT NULL,
                                 \`payload\`      varchar(255) NOT NULL,
                                 \`authorId\`     int          NULL,
                                 \`targetUserId\` int          NULL,
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`user_organizations_organization\`
                             (
                                 \`userId\`         int NOT NULL,
                                 \`organizationId\` int NOT NULL,
                                 INDEX \`IDX_7ad3d8541fbdb5a3d137c50fb4\` (\`userId\`),
                                 INDEX \`IDX_8d7c566d5a234be0a646101326\` (\`organizationId\`),
                                 PRIMARY KEY (\`userId\`, \`organizationId\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`CREATE TABLE \`todo_watchers_user\`
                             (
                                 \`todoId\` int NOT NULL,
                                 \`userId\` int NOT NULL,
                                 INDEX \`IDX_689c3ad36dc7341435ad362a94\` (\`todoId\`),
                                 INDEX \`IDX_3eebcccb6c2770e08a7e1de533\` (\`userId\`),
                                 PRIMARY KEY (\`todoId\`, \`userId\`)
                             ) ENGINE = InnoDB`);
    await queryRunner.query(`ALTER TABLE \`organization\`
        ADD CONSTRAINT \`FK_67c515257c7a4bc221bb1857a39\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`todo_change_log\`
        ADD CONSTRAINT \`FK_97ca4362f8ee78bf8bc55f85e48\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`todo_change_log\`
        ADD CONSTRAINT \`FK_243ec6a3c1986bd0457178fdcc8\` FOREIGN KEY (\`operatorId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`comment\`
        ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`comment\`
        ADD CONSTRAINT \`FK_f28138baab6c22e4b27f489d8be\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`todo\`
        ADD CONSTRAINT \`FK_756cc160014ce8bed2d6d565801\` FOREIGN KEY (\`parentTodoId\`) REFERENCES \`todo\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`todo\`
        ADD CONSTRAINT \`FK_05552e862619dc4ad7ec8fc9cb8\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`todo\`
        ADD CONSTRAINT \`FK_841cfbd9d8684eea5e408e5080b\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`mention\`
        ADD CONSTRAINT \`FK_d2f967c23ec5174f12c53ee6712\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`mention\`
        ADD CONSTRAINT \`FK_1c3bec0d33efef3ca18d56a79d1\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`mention\`
        ADD CONSTRAINT \`FK_6361c461b139b4e7294bdc23e8f\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`message_inbox\`
        ADD CONSTRAINT \`FK_90c75320baf1375b8cfbe759a45\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`message_inbox\`
        ADD CONSTRAINT \`FK_a57b536996e3ffbfd3143039fe0\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`user_organizations_organization\`
        ADD CONSTRAINT \`FK_7ad3d8541fbdb5a3d137c50fb40\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`user_organizations_organization\`
        ADD CONSTRAINT \`FK_8d7c566d5a234be0a6461013269\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`todo_watchers_user\`
        ADD CONSTRAINT \`FK_689c3ad36dc7341435ad362a940\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`todo_watchers_user\`
        ADD CONSTRAINT \`FK_3eebcccb6c2770e08a7e1de5337\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`todo_watchers_user\`
        DROP FOREIGN KEY \`FK_3eebcccb6c2770e08a7e1de5337\``);
    await queryRunner.query(`ALTER TABLE \`todo_watchers_user\`
        DROP FOREIGN KEY \`FK_689c3ad36dc7341435ad362a940\``);
    await queryRunner.query(`ALTER TABLE \`user_organizations_organization\`
        DROP FOREIGN KEY \`FK_8d7c566d5a234be0a6461013269\``);
    await queryRunner.query(`ALTER TABLE \`user_organizations_organization\`
        DROP FOREIGN KEY \`FK_7ad3d8541fbdb5a3d137c50fb40\``);
    await queryRunner.query(`ALTER TABLE \`message_inbox\`
        DROP FOREIGN KEY \`FK_a57b536996e3ffbfd3143039fe0\``);
    await queryRunner.query(`ALTER TABLE \`message_inbox\`
        DROP FOREIGN KEY \`FK_90c75320baf1375b8cfbe759a45\``);
    await queryRunner.query(`ALTER TABLE \`mention\`
        DROP FOREIGN KEY \`FK_6361c461b139b4e7294bdc23e8f\``);
    await queryRunner.query(`ALTER TABLE \`mention\`
        DROP FOREIGN KEY \`FK_1c3bec0d33efef3ca18d56a79d1\``);
    await queryRunner.query(`ALTER TABLE \`mention\`
        DROP FOREIGN KEY \`FK_d2f967c23ec5174f12c53ee6712\``);
    await queryRunner.query(`ALTER TABLE \`todo\`
        DROP FOREIGN KEY \`FK_841cfbd9d8684eea5e408e5080b\``);
    await queryRunner.query(`ALTER TABLE \`todo\`
        DROP FOREIGN KEY \`FK_05552e862619dc4ad7ec8fc9cb8\``);
    await queryRunner.query(`ALTER TABLE \`todo\`
        DROP FOREIGN KEY \`FK_756cc160014ce8bed2d6d565801\``);
    await queryRunner.query(`ALTER TABLE \`comment\`
        DROP FOREIGN KEY \`FK_f28138baab6c22e4b27f489d8be\``);
    await queryRunner.query(`ALTER TABLE \`comment\`
        DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
    await queryRunner.query(`ALTER TABLE \`todo_change_log\`
        DROP FOREIGN KEY \`FK_243ec6a3c1986bd0457178fdcc8\``);
    await queryRunner.query(`ALTER TABLE \`todo_change_log\`
        DROP FOREIGN KEY \`FK_97ca4362f8ee78bf8bc55f85e48\``);
    await queryRunner.query(`ALTER TABLE \`organization\`
        DROP FOREIGN KEY \`FK_67c515257c7a4bc221bb1857a39\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3eebcccb6c2770e08a7e1de533\` ON \`todo_watchers_user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_689c3ad36dc7341435ad362a94\` ON \`todo_watchers_user\``,
    );
    await queryRunner.query(`DROP TABLE \`todo_watchers_user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8d7c566d5a234be0a646101326\` ON \`user_organizations_organization\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7ad3d8541fbdb5a3d137c50fb4\` ON \`user_organizations_organization\``,
    );
    await queryRunner.query(`DROP TABLE \`user_organizations_organization\``);
    await queryRunner.query(`DROP TABLE \`message_inbox\``);
    await queryRunner.query(`DROP TABLE \`mention\``);
    await queryRunner.query(`DROP TABLE \`todo\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
    await queryRunner.query(`DROP TABLE \`todo_change_log\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`organization\``);
  }
}
