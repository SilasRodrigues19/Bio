import {
  getPageContent,
  onLinkNavigate,
  transitionHelper,
} from '../scripts/view-transition-utils';

const LINE_COUNT = 5;
const STAGGER_STEP = 150;
const STOPOVER = 200;
const WIPE_SPEED = 400;

onLinkNavigate(
  async ({ toPath, isBack }: { toPath: string; isBack: boolean }) => {
    const LINES: HTMLDivElement[] = [];
    const content = await getPageContent(toPath);
    const theme = localStorage.getItem('theme');

    // Create line elements for the transition
    for (let l = 0; l < LINE_COUNT; l++) {
      const LINE = Object.assign(document.createElement('div'), {
        style: `
        contain: paint;
        view-transition-name: line-${l};
        position: fixed;
        top: ${l * (100 / LINE_COUNT)}vh;
        left: 0;
        right: 0;
        height: ${100 / LINE_COUNT + 0}vh;
        background: ${theme === 'dark' ? '#f1f5f9' : '#020617'};
        transform-origin: 50% 50%;
      `,
      });
      LINES.push(LINE);
    }
    const transition = transitionHelper({
      async updateDOM() {
        document.body.innerHTML = content;
        for (const LINE of LINES) document.body.append(LINE);
      },
    });

    transition.finished.then(async () => {
      for (const LINE of LINES) LINE.remove();
    });
    transition.ready.then(async () => {
      const holdAnim = document.documentElement.animate(
        {},
        {
          duration: 60_000,
          pseudoElement: '::view-transition-group(root)',
        }
      );

      const WIPE_FRONT = [];
      for (let i = 0; i < LINE_COUNT; i++) {
        WIPE_FRONT.push(
          document.documentElement.animate(
            [
              {
                translate: `${isBack ? '' : '-'}100% 0`,
              },
              {
                translate: '0 0',
              },
            ],
            {
              delay: i * STAGGER_STEP,
              duration: WIPE_SPEED,
              fill: 'both',
              easing: 'ease-in',
              pseudoElement: `::view-transition-group(line-${i})`,
            }
          ).finished
        );
      }
      await Promise.all(WIPE_FRONT);
      const switcheroo = document.documentElement.animate(
        [
          {
            scale: 0,
          },
        ],
        {
          fill: 'both',
          easing: 'steps(1)',
          duration: STOPOVER,
          pseudoElement: '::view-transition-old(root)',
        }
      );
      await switcheroo.finished;

      const WIPE_BACK = [];
      for (let i = 0; i < LINE_COUNT; i++) {
        WIPE_BACK.push(
          document.documentElement.animate(
            [
              {
                translate: '0 0',
              },
              {
                translate: `${isBack ? '-' : ''}100% 0`,
              },
            ],
            {
              delay: i * STAGGER_STEP,
              duration: WIPE_SPEED,
              fill: 'both',
              easing: 'ease-in',
              pseudoElement: `::view-transition-group(line-${i})`,
            }
          ).finished
        );
      }
      await Promise.all(WIPE_BACK);
      holdAnim.finish();
      for (const LINE of LINES) LINE.remove();
    });
  }
);
