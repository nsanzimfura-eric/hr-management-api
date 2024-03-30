import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
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
  creator_id!: string;

  @Column()
  deadline!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  //relations ----

  // @ManyToMany(() => Candidate, (candidate) => candidate.jobs, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  //   eager: false,
  // })
  // @JoinTable({
  //   name: "jobs_candidates",
  //   joinColumn: { name: "job_id", referencedColumnName: "id" },
  //   inverseJoinColumn: { name: "candidate_id", referencedColumnName: "id" },
  // })
  // candidates: Candidate[];

  //by simple demo, no joinTable or bi-directional relationship
  @ManyToMany(() => Candidate)
  @JoinTable()
  candidates: Candidate[];

  @ManyToOne(() => User, (user) => user.jobs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "creator_id" })
  creator: User;
}
