import { PartialType } from '@nestjs/mapped-types';
import { CreateGreviewDto } from './create-greview.dto';

export class UpdateGreviewDto extends PartialType(CreateGreviewDto) {}
