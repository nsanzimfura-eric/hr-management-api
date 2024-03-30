import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/candidate.entity";
import { Job } from "../entity/job.entity";

class CandidateService {
  private CandidateRepository: Repository<Candidate>;

  constructor() {
    this.CandidateRepository = AppDataSource.getRepository(Candidate);
  }

  async createCandidate(
    name: string,
    email: string,
    phone: string,
    github: string,
    linkedin: string,
    web: string,
    resume: string,
    job: Job
  ) {
    try {
      const candidate = new Candidate();
      candidate.name = name;
      candidate.email = email;
      candidate.phone = phone;
      if (github) candidate.github = github;
      if (linkedin) candidate.linkedin = linkedin;
      if (web) candidate.web = web;
      candidate.resume = resume;
      candidate.jobs = [...candidate.jobs, job];

      const newCandidate = await this.CandidateRepository.save(candidate);

      return newCandidate;
    } catch (error) {
      throw error;
    }
  }
  async updateCandidate(
    candidate: Candidate,
    phone: string,
    github: string,
    linkedin: string,
    web: string,
    resume: string,
    job: Job
  ) {
    try {
      candidate.phone = phone;
      candidate.resume = resume;
      if (github) candidate.github = github;
      if (linkedin) candidate.linkedin = linkedin;
      if (web) candidate.web = web;
      //update job;
      candidate.jobs.map((singleJob) => {
        let jobNeeded = singleJob;
        if (jobNeeded.id === job.id) {
          jobNeeded = job;
        }
        return jobNeeded;
      });

      return await this.CandidateRepository.save(candidate);
    } catch (error) {
      throw error;
    }
  }
  async findCandidateByEmail(email: string): Promise<Candidate | null> {
    try {
      const candidate = await this.CandidateRepository.findOneBy({ email });

      if (!candidate) {
        return null;
      }
      return candidate;
    } catch (error) {
      return error;
    }
  }
}

export default CandidateService;
