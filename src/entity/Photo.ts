import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 50})
    name: string

    @Column({type: 'varchar', length: 50})
    description: string

    @Column({type: 'varchar', length: 50})
    filename: string

    @Column({type: 'integer', default: 0})
    views: number

    @Column({type: 'boolean', default: false})
    isPublished: boolean
}