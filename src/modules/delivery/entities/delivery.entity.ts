import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Order } from 'src/modules/order/entities/order.entity';
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

    @OneToOne(() => Order, (order) => order.Delivery)
    @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
    Order: Order;
}
