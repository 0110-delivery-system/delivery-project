import { Store } from 'src/modules/store/entities/store.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Bookmark')
export class Bookmark {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'UserId' })
    UserId: number;

    @Column('int', { name: 'StoreId' })
    StoreId: number;

    @ManyToOne(() => User, (user) => user.Bookmark, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: User;

    @ManyToOne(() => Store, (store) => store.Bookmark, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'StoreId', referencedColumnName: 'id' }])
    Store: Store;
}
