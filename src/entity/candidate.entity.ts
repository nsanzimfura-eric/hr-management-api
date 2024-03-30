import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;
  //use default candidate image for now
  @Column({
    default:
      "https://res.cloudinary.com/dubi7e8kf/image/upload/v1708117738/cld-sample.jpg",
  })
  profile!: string;

  @Column()
  phone!: string;

  @Column()
  resume!: string;

  @Column({ default: "https://nsanzimfura.web.app/" })
  web: string;

  @Column({ default: "https://github.com/nsanzimfura-eric" })
  github: string;

  @Column({ default: "https://www.linkedin.com/in/nsanzimfura-eric" })
  linkedin: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToMany(() => Job, (job) => job.candidates)
  @JoinTable({
    name: "jobs_candidates",
    joinColumn: { name: "candidate_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "job_id", referencedColumnName: "id" },
  })
  jobs!: Job[];
}
