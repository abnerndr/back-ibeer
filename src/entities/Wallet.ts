import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";

@Entity('wallet')
export class Wallet {

    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column({ type: 'uuid', nullable: true })
    public wallet_id?: string;

    @Column()
    public account_value_in_cents: number;

    @Column()
    public account_value_pending: number;

    @Column()
    public withdrawn_amount: number;

    // @OneToOne(() => Company, (company: Company) => company.wallet)
    // public company: Company

}