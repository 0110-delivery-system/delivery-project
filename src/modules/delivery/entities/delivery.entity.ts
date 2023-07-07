import { Review } from 'src/modules/review/entities/review.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Delivery')
export class Delivery {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'UserId' })
    UserId: number;

    @Column('varchar', { name: 'status' })
    status: string;

    @Column('varchar', { name: 'address' })
    address: string;

    @ManyToOne(() => User, (user) => user.Delivery, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: User;

    @OneToMany(() => Review, (review) => review.Delivery)
    Review: Review[];
}
