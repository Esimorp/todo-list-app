import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { UserRepo } from '../repositories/user.repo';
import { UserRegisterLoginDto } from '../dto/user-register-login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { APP_SECRET } from '../../common';
import Hashids from 'hashids';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { OrganizationService } from '../organization/organization.service';
import { DataSource } from 'typeorm';
import { Organization } from '../entities/organization.entity';

const BCRYPT_GEN_SALTS_ROUND = 7;

@Injectable()
export class UserService {
  private hashids: Hashids;

  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private userRepository: UserRepo,
    private configService: ConfigService,
    private organizationService: OrganizationService,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {
    const secret = this.configService.getOrThrow(APP_SECRET);
    this.hashids = new Hashids(secret);
  }

  async signUserJwtToken(user: User, expiresIn = '7d'): Promise<string> {
    const uid = this.hashids.encode(user.id);
    return await this.jwtService.signAsync(
      { uid },
      {
        secret: this.configService.getOrThrow(APP_SECRET),
        expiresIn,
      },
    );
  }

  async registerUser(userRegisterDto: UserRegisterLoginDto): Promise<User> {
    const { username, password } = userRegisterDto;
    const existedUser = await this.userRepository.findOneBy({ username });
    if (existedUser) {
      throw new BadRequestException(
        await this.i18n.t('errors.USERNAME_ALREADY_EXISTED'),
      );
    }
    const salt = bcrypt.genSaltSync(BCRYPT_GEN_SALTS_ROUND);
    const passwordHash = await bcrypt.hash(password, salt);
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const userObject = {
        username,
        password: passwordHash,
      };
      const user = await queryRunner.manager.save(User, userObject);
      const organizationObject =
        this.organizationService.createUserDefaultOrganizationObject(user);
      await queryRunner.manager.save(Organization, organizationObject);
      await queryRunner.commitTransaction();
      return user;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async loginUser(userRegisterLoginDto: UserRegisterLoginDto): Promise<User> {
    const { username, password } = userRegisterLoginDto;
    const user = await this.userRepository.findOneBy({
      username: username,
    });
    if (user) {
      const compareResult = await bcrypt.compare(password, user.password);
      if (compareResult) return user;
    }
    throw new UnauthorizedException(
      await this.i18n.t('errors.WRONG_USERNAME_OR_PASSWORD'),
    );
  }

  async verifyUserToken(payload) {
    const { uid } = payload;
    //TODO do other check
    const id = this.hashids.decode(uid)[0] as number;
    console.log(id);
    return this.userRepository.findOneBy({ id });
  }
}
