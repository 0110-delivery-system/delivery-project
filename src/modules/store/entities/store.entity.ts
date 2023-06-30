import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { Menu } from 'src/modules/menu/entities/menu.entity';
import { Owner } from 'src/modules/owner/entities/owner.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Store')
export class Store {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'OwnerId' })
    OwnerId: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('varchar', { name: 'address' })
    address: string;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.Store)
    Bookmark: Bookmark;

    @ManyToOne(() => Owner, (owner) => owner.Store, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
    Owner: Owner;

    @OneToMany(() => Menu, (menu) => menu.Store)
    Menu: Menu;
}
