import { Delivery } from 'src/modules/delivery/entities/delivery.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Review')
export class Review {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'OrderId' })
    OrderId: number;

    @Column('int', { name: 'userId' })
    userId: number;

    @Column('int', { name: 'DeliveryId' })
    DeliveryId: number;

    @Column('varchar', { name: 'title' })
    title: string;

    @Column('varchar', { name: 'content' })
    content: string;

    @ManyToOne(() => User, (user) => user.Review, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    User: User;

    @ManyToOne(() => Order, (order) => order.Review, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'OrderId', referencedColumnName: 'id' }])
    Order: Order;

    @ManyToOne(() => Delivery, (delivery) => delivery.Review, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'DeliveryId', referencedColumnName: 'id' }])
    Delivery: Delivery;
}
