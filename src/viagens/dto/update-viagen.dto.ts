import { PartialType } from '@nestjs/mapped-types';
import { CreateViagenDto } from './create-viagen.dto';

export class UpdateViagenDto extends PartialType(CreateViagenDto) {}
