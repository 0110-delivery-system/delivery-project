import { PartialType } from '@nestjs/mapped-types';
import { CreateDeilveryDto } from './create-deilvery.dto';

export class UpdateDeilveryDto extends PartialType(CreateDeilveryDto) {}
