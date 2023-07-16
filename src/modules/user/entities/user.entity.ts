import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Review } from 'src/modules/review/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'email' })
    email: string;

    @Column('varchar', { name: 'password' })
    password: string;

    @Column('varchar', { name: 'name' })
    name: string;

    @OneToMany(() => Delivery, (delivery) => delivery.User)
    Delivery: Delivery[];

    @OneToMany(() => Review, (review) => review.User)
    Review: Review;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.User)
    Bookmark: Bookmark;

    @OneToMany(() => Order, (order) => order.User)
    Order: Order;
}
