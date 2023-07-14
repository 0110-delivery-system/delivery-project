import { Review } from 'src/modules/review/entities/review.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'UserId' })
    UserId: number;

    @Column('varchar', { name: 'food' })
    food: string;

    @Column('varchar', { name: 'status' })
    status: string;

    @Column('varchar', { name: 'paymentId' })
    paymentId: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.Order, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'StoreId', referencedColumnName: 'id' }])
    StoreId: number;

    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: User;

    @OneToMany(() => Review, (review) => review.Order)
    Review: Review[];
}
