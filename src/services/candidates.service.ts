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
    neededResume: string,
    doesJobExists: Job
  ) {
    try {
      const candidate = new Candidate();
      candidate.name = name;
      candidate.email = email;
      candidate.phone = phone;
      candidate.github = github;
      candidate.linkedin = linkedin;
      candidate.web = web;
      candidate.resume = neededResume;
      candidate.jobs = doesJobExists;

      const newCandidate = await this.CandidateRepository.save({
        name,
        email,
        profile,
        phone,
      });

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
    neededResume: string,
    job: Job
  ) {
    try {
      candidate.phone = phone;
      candidate.resume = neededResume;
      if (github) candidate.github = github;
      if (linkedin) candidate.linkedin = linkedin;
      if (web) candidate.web = web;

      const jobAlreadyExists = candidate.jobs.some(
        (candidateJob) => candidateJob.id === job.id
      );
      // update job
      if (!jobAlreadyExists) {
        // If not, add this job to the candidate's list of jobs
        candidate.jobs = [...candidate.jobs, job];
        const candidateAlreadyExists = job.candidates.some(
          (jobCandidate) => jobCandidate.id === candidate.id
        );

        if (!candidateAlreadyExists) {
          // If not, add this candidate to the job's list of candidates
          job.candidates = [...job.candidates, candidate];
          // Save the job entity if needed
          await this.JobRepository.save(job);
        }
      }

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
