import { PartialType } from '@nestjs/mapped-types';
import { CreatereviewDto } from './create-review.dto';

export class UpdatereviewDto extends PartialType(CreatereviewDto) {}
