import { Store } from 'src/modules/store/entities/store.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Bookmark')
export class Bookmark {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'userId' })
    userId: number;

    @Column('int', { name: 'storeId' })
    storeId: number;

    @ManyToOne(() => User, (user) => user.Bookmark, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    User: User;

    @ManyToOne(() => Store, (store) => store.Bookmark, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
    Store: Store;
}
