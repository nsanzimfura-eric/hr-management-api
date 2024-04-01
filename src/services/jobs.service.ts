import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Job } from "../entity/job.entity";
import { User } from "../entity/user.entity";

class JobsServices {
  private JobsRepository: Repository<Job>;

  constructor() {
    this.JobsRepository = AppDataSource.getRepository(Job);
  }

  async createJob(
    title: string,
    description: string,
    deadline: string,
    creator_id: string
  ) {
    try {
      const job = new Job();
      job.title = title;
      job.description = description;
      job.deadline = new Date(deadline);
      job.creator_id = creator_id;

      return await this.JobsRepository.save(job);
    } catch (error) {
      throw error;
    }
  }

  async fetchJobs(): Promise<Job[]> {
    try {
      return await this.JobsRepository.find({
        relations: { candidates: true },
      });
    } catch (error) {
      throw error;
    }
  }
  // Assuming you want to fetch job creator information alongside each job
  async fetchJobsByCreator(creator_id: string): Promise<Job[]> {
    try {
      return await this.JobsRepository.find({
        relations: { candidates: true },
        where: { creator_id },
      });
    } catch (error) {
      throw error;
    }
  }
  async findJobById(id: string): Promise<Job | null> {
    try {
      const job = await this.JobsRepository.createQueryBuilder("job")
        .leftJoinAndSelect("job.candidates", "candidate")
        .where("job.id = :id", { id })
        .getOne();

      // const job = await this.JobsRepository.findOneBy({
      //   id,
      // });
      if (!job) return null;

      return job;
    } catch (error) {
      throw error;
    }
  }
  //delete job
  async deleteJob(id: string): Promise<void> {
    try {
      await this.JobsRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default JobsServices;
