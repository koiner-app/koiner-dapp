import { date } from 'quasar';

export function timeAgo(timestamp: number): string {
  const now = new Date();
  const ts = new Date(timestamp);

  const diffs: Array<{
    type: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years';
    translationKey: string;
    threshold: number;
  }> = [
    {
      type: 'seconds',
      translationKey: 'secs',
      threshold: 60,
    },
    {
      type: 'minutes',
      translationKey: 'mins',
      threshold: 60,
    },
    {
      type: 'hours',
      translationKey: 'hours',
      threshold: 60,
    },
    {
      type: 'days',
      translationKey: 'days',
      threshold: 999,
    },
  ];

  for (let i = 0; i < diffs.length; i++) {
    const diffResult = date.getDateDiff(now, ts, diffs[i].type);

    if (diffResult < diffs[i].threshold) {
      return `${diffResult.toString()} ${diffs[i].translationKey} ago`;
    }
  }

  return '...';
}
