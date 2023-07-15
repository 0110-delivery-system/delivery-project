import { Review } from 'src/modules/review/entities/review.entity';
import { Store } from 'src/modules/store/entities/store.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Order')
export class Order {
    @PrimaryColumn({ type: 'uuid', name: 'id' })
    id: number;

    @Column('int', { name: 'userId' })
    userId: number;

    @Column('varchar', { name: 'food' })
    food: string;

    @Column('varchar', { name: 'status' })
    status: string;

    @Column('int', { name: 'storeId' })
    storeId: number;

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

    @OneToMany(() => Review, (review) => review.Order)
    Review: Review[];
}
