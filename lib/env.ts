export const ENV_SLUGS = ['upsystems', 'teamtalent', 'replan', 'yourmerchandising'] as const;
export type EnvSlug = typeof ENV_SLUGS[number];

export function isValidEnvSlug(s: string | undefined | null): s is EnvSlug {
  return !!s && (ENV_SLUGS as readonly string[]).includes(s);
}
