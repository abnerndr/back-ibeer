import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./Company";
@Entity('subscriptions')
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'uuid', nullable: true })
    public subscription_id?: string;

    @Column()
    public name: string;

    @Column()
    public email: string

    @Column()
    public amount: number;

    @Column()
    public status: string;

    @Column()
    public is_active: boolean;

    @Column({ type: 'simple-json' })
    public address: {
        street: string;
        neighborhood: string;
        street_number: string;
        state: string;
        city: string;
        country: string;
    }

    // @OneToOne(() => Company, (company: Company) => company.subscription)
    // public company: Company

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    public created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    public updated_at: Date;
}