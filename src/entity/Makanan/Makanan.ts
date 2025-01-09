import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class Makanan{
    @PrimaryColumn({type: 'varchar', length: 25, unique: true})
    @Field(() => ID)
    code: string

    @Field(() => String)
    @Column({type: 'varchar', length: 50})
    nama: string

    @Field(() => Number)
    @Column({type: 'integer'})
    harga: number
}