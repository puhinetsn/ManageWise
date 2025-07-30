import { Skill } from './skill.model';

interface Employee {
  id: number;
  fullName: string;
  email: string;
  position: string;
  skills: Skill[];
  startDate: Date;
}
