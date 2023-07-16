import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Review')
export class Review {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'orderId' })
    orderId: number;

    @Column('int', { name: 'userId' })
    userId: number;

    @Column('int', { name: 'deliveryId' })
    deliveryId: number;

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
    @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
    Order: Order;
}
