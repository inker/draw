import { sumBy } from 'lodash';

import makeOpponentCap from './opponentCap';
import { type Rule, type RuleContext, type RuleSpec } from './types';

export type { Rule, RuleContext, RuleSpec } from './types';

const makeRule = (spec: RuleSpec, context: RuleContext): Rule => {
  switch (spec.kind) {
    case 'opponentCap':
      return makeOpponentCap(spec, context);
    default: {
      // a compile error here means a new kind has no case yet
      const unknownKind: never = spec.kind;
      throw new Error(`Unknown rule kind ${String(unknownKind)}`);
    }
  }
};

/**
 * One rule that holds when all of them do,
 * so the solver's hot paths make a single call
 */
export const combineRules = (rules: readonly Rule[]): Rule => {
  if (rules.length === 1) {
    return rules[0];
  }
  return {
    allows: (h, a) => rules.every(rule => rule.allows(h, a)),
    apply: (h, a) => {
      for (const rule of rules) {
        rule.apply(h, a);
      }
    },
    undo: (h, a) => {
      for (const rule of rules) {
        rule.undo(h, a);
      }
    },
    isDeadEnd: () => rules.some(rule => rule.isDeadEnd()),
    getOpponentPriority: team =>
      sumBy(rules, rule => rule.getOpponentPriority(team)),
  };
};

export default (specs: readonly RuleSpec[], context: RuleContext): Rule =>
  combineRules(specs.map(spec => makeRule(spec, context)));
