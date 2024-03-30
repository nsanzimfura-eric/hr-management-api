import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/candidate.entity";
import { Job } from "../entity/job.entity";

class CandidateService {
  private CandidateRepository: Repository<Candidate>;
  private JobsRepository: Repository<Job>;

  constructor() {
    this.CandidateRepository = AppDataSource.getRepository(Candidate);
    this.JobsRepository = AppDataSource.getRepository(Job);
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
      const newCandidate = await this.CandidateRepository.save(candidate);

      // updateJob
      job.candidates.push(candidate);
      await this.JobsRepository.save(job);

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
      // we can get update data from applicant
      candidate.phone = phone;
      candidate.resume = resume;
      if (github) candidate.github = github;
      if (linkedin) candidate.linkedin = linkedin;
      if (web) candidate.web = web;

      const candidateUpdated = await this.CandidateRepository.save(candidate);

      // updateJob to replace the candidate
      job.candidates.map((user) => {
        let newCandid = user;
        if (newCandid.id === candidate.id) {
          newCandid = candidate;
        }
        return newCandid;
      });
      await this.JobsRepository.save(job);

      return candidateUpdated;
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
