import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/candidate.entity";

class CandidateService {
  private CandidateRepository: any;

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
}

export default CandidateService;
