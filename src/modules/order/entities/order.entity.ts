import { Review } from 'src/modules/review/entities/review.entity';
import { Store } from 'src/modules/store/entities/store.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'userId' })
    userId: number;

    @Column('varchar', { name: 'food' })
    food: string;

    @Column('varchar', { name: 'status' })
    status: string;

    @Column('int', { name: 'storeId' })
    storeId: number;

    @Column('int', { name: 'deliveryId' })
    deliveryId: number;

    @Column('int', { name: 'reviewId' })
    reviewId: number;

    @Column('varchar', { name: 'paymentId' })
    paymentId: string;

    @CreateDateColumn()
    createdAt: Date;
    @ManyToOne(() => Store, (store) => store.Order, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
    Store: Store;

    @ManyToOne(() => User, (user) => user.Order, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    User: User;

    @OneToMany(() => Delivery, (delivery) => delivery.Order)
    @JoinColumn({ name: 'deliveryId', referencedColumnName: 'id' })
    Delivery: Delivery;

    @OneToMany(() => Review, (review) => review.Order)
    @JoinColumn({ name: 'reviewId', referencedColumnName: 'id' })
    Review: Review;
}
