import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/candidate.entity";

class CandidateService {
  private CandidateRepository: Repository<Candidate>;

  constructor() {
    this.CandidateRepository = AppDataSource.getRepository(Candidate);
  }

  async createCandidate(
    name: string,
    email: string,
    profile: string,
    phone: string
  ) {
    try {
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
