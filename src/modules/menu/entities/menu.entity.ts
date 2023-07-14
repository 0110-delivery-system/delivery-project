import { Store } from 'src/modules/store/entities/store.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Menu')
export class Menu {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'storeId' })
    storeId: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('int', { name: 'price' })
    price: number;

    @ManyToOne(() => Store, (store) => store.Menu, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
    Store: Store;
}
