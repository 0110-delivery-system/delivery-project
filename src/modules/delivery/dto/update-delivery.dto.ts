import { PartialType } from '@nestjs/mapped-types';
import { createDeliveryDto } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(createDeliveryDto) {}
