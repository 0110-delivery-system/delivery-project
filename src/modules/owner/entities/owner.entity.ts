import { Store } from 'src/modules/store/entities/store.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Owner')
export class Owner {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'eamil' })
    email: string;

    @Column('varchar', { name: 'password' })
    password: string;

    @Column('varchar', { name: 'name' })
    name: string;

    @OneToMany(() => Store, (store) => store.Owner)
    Store: Store[];
}
