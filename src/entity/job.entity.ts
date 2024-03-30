import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Candidate } from "./candidate.entity";
import { User } from "./user.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  deadline!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToMany(() => Candidate, (candidate) => candidate.jobs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: false,
  })
  @JoinTable({
    name: "jobs_candidates",
    joinColumn: { name: "job_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "candidate_id", referencedColumnName: "id" },
  })
  candidates: Candidate[];

  @ManyToOne(() => User, (user) => user.jobs)
  creator: User;
}
