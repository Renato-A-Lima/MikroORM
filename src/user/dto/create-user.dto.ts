import { PickType } from "@nestjs/mapped-types";
import { User } from '../entities/user.entity'

export class CreateUserDto extends PickType(User,['nome', 'email','nivel_acesso']){}
