import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DiagramId } from '../../data/models';

interface Marble {
  label: string;
  at: number;
  /** Shown faded with a strike — value that was cancelled or ignored. */
  dropped?: boolean;
}

/**
 * Small HTML/CSS diagrams that explain a concept visually. They use the theme
 * tokens, so they work in light and dark mode and scale to phone width.
 */
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Diagram {
  readonly id = input.required<DiagramId>();

  /** Literal braces cannot be written in a template, so the sample lives here. */
  protected readonly interpolationExample = '{{ title }}';

  /** Source emits a, b, c; each inner request takes 30% of the timeline. */
  protected readonly lanes: { name: string; note: string; marbles: Marble[] }[] = [
    {
      name: 'source',
      note: 'user clicks / types a, b, c',
      marbles: [
        { label: 'a', at: 8 },
        { label: 'b', at: 33 },
        { label: 'c', at: 58 },
      ],
    },
    {
      name: 'mergeMap',
      note: 'all run in parallel',
      marbles: [
        { label: 'A', at: 38 },
        { label: 'B', at: 63 },
        { label: 'C', at: 88 },
      ],
    },
    {
      name: 'switchMap',
      note: 'new value cancels the old one',
      marbles: [
        { label: 'A', at: 38, dropped: true },
        { label: 'B', at: 63, dropped: true },
        { label: 'C', at: 88 },
      ],
    },
    {
      name: 'concatMap',
      note: 'one after another, in order',
      marbles: [
        { label: 'A', at: 38 },
        { label: 'B', at: 68 },
        { label: 'C', at: 96 },
      ],
    },
    {
      name: 'exhaustMap',
      note: 'ignores new values while busy',
      marbles: [
        { label: 'A', at: 38 },
        { label: 'b', at: 33, dropped: true },
        { label: 'C', at: 88 },
      ],
    },
  ];
}
