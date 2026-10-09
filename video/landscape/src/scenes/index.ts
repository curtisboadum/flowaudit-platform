import Narrative from './narrative/Scene';import Evidence from './evidence/Scene';import {defaults as n} from './narrative/schema';import {defaults as e} from './evidence/schema';
// <scaffold:imports>
import scene_12_decision_component from './12-decision/Scene';
import {defaults as scene_12_decision_defaults, durationInFrames as scene_12_decision_dur} from './12-decision/schema';
import scene_11_implementation_component from './11-implementation/Scene';
import {defaults as scene_11_implementation_defaults, durationInFrames as scene_11_implementation_dur} from './11-implementation/schema';
import scene_10_team_rules_component from './10-team-rules/Scene';
import {defaults as scene_10_team_rules_defaults, durationInFrames as scene_10_team_rules_dur} from './10-team-rules/schema';
import scene_09_question_component from './09-question/Scene';
import {defaults as scene_09_question_defaults, durationInFrames as scene_09_question_dur} from './09-question/schema';
import scene_08_other_paths_component from './08-other-paths/Scene';
import {defaults as scene_08_other_paths_defaults, durationInFrames as scene_08_other_paths_dur} from './08-other-paths/schema';
import scene_07_evidence_limits_component from './07-evidence-limits/Scene';
import {defaults as scene_07_evidence_limits_defaults, durationInFrames as scene_07_evidence_limits_dur} from './07-evidence-limits/schema';
import scene_06_routine_component from './06-routine/Scene';
import {defaults as scene_06_routine_defaults, durationInFrames as scene_06_routine_dur} from './06-routine/schema';
import scene_05_watch_component from './05-watch/Scene';
import {defaults as scene_05_watch_defaults, durationInFrames as scene_05_watch_dur} from './05-watch/schema';
import scene_04_value_component from './04-value/Scene';
import {defaults as scene_04_value_defaults, durationInFrames as scene_04_value_dur} from './04-value/schema';
import scene_03_opportunity_component from './03-opportunity/Scene';
import {defaults as scene_03_opportunity_defaults, durationInFrames as scene_03_opportunity_dur} from './03-opportunity/schema';
import scene_02_solution_component from './02-solution/Scene';
import {defaults as scene_02_solution_defaults, durationInFrames as scene_02_solution_dur} from './02-solution/schema';
import scene_01_call_component from './01-call/Scene';
import {defaults as scene_01_call_defaults, durationInFrames as scene_01_call_dur} from './01-call/schema';
export const scenes={narrative:{component:Narrative,defaults:n,durationInFrames:300},evidence:{component:Evidence,defaults:e,durationInFrames:300},
// <scaffold:entries>
  '12-decision': {component: scene_12_decision_component, defaults: scene_12_decision_defaults, durationInFrames: scene_12_decision_dur},
  '11-implementation': {component: scene_11_implementation_component, defaults: scene_11_implementation_defaults, durationInFrames: scene_11_implementation_dur},
  '10-team-rules': {component: scene_10_team_rules_component, defaults: scene_10_team_rules_defaults, durationInFrames: scene_10_team_rules_dur},
  '09-question': {component: scene_09_question_component, defaults: scene_09_question_defaults, durationInFrames: scene_09_question_dur},
  '08-other-paths': {component: scene_08_other_paths_component, defaults: scene_08_other_paths_defaults, durationInFrames: scene_08_other_paths_dur},
  '07-evidence-limits': {component: scene_07_evidence_limits_component, defaults: scene_07_evidence_limits_defaults, durationInFrames: scene_07_evidence_limits_dur},
  '06-routine': {component: scene_06_routine_component, defaults: scene_06_routine_defaults, durationInFrames: scene_06_routine_dur},
  '05-watch': {component: scene_05_watch_component, defaults: scene_05_watch_defaults, durationInFrames: scene_05_watch_dur},
  '04-value': {component: scene_04_value_component, defaults: scene_04_value_defaults, durationInFrames: scene_04_value_dur},
  '03-opportunity': {component: scene_03_opportunity_component, defaults: scene_03_opportunity_defaults, durationInFrames: scene_03_opportunity_dur},
  '02-solution': {component: scene_02_solution_component, defaults: scene_02_solution_defaults, durationInFrames: scene_02_solution_dur},
  '01-call': {component: scene_01_call_component, defaults: scene_01_call_defaults, durationInFrames: scene_01_call_dur},
};
