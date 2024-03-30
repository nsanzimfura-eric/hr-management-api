import { AppDataSource } from "../data-source";
import { Job } from "../entity/job.entity";

class JobsServices {
  private JobsRepository: any;

  constructor() {
    this.JobsRepository = AppDataSource.getRepository(Job);
  }

  async createJob(title: string, description: string, deadline: string) {
    try {
      const newJob = await this.JobsRepository.save({
        title,
        description,
        deadline,
      });

      return newJob;
    } catch (error) {
      throw error;
    }
  }
}

export default JobsServices;
