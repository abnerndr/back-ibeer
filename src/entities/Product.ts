import { Company } from './Company'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'uuid', nullable: true })
    public product_id?: string;

    @ManyToOne(() => Company, (company: Company) => company.products)
    @JoinColumn({ name: 'company_id' })
    public company: Company

    @Column({ type: "text" })
    public product_name: string;

    @Column({ type: "text" })
    public description?: string;

    @Column({ type: "text", nullable: true })
    public photo_url?: string;

    @Column({ type: "simple-array" })
    public categories: string[];

    @Column({ type: "int" })
    public price_in_cents: number;

    @Column({ type: "int" })
    public ibeer_taxe_in_cents: number;

    @Column({ type: "int" })
    public discount_in_percent: number;

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
