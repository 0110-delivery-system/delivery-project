import { Review } from 'src/modules/review/entities/review.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Delivery')
export class Delivery {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'userId' })
    userId: number;

    @Column('varchar', { name: 'status' })
    status: string;

    @Column('int', { name: 'orderId' })
    orderId: number;

    @Column('varchar', { name: 'receiver' })
    receiver: string;

    @Column('varchar', { name: 'address' })
    address: string;
}
